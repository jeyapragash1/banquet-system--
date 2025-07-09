<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventInquiry;
use App\Models\InventoryItem;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->query('year', date('Y')); // Use selected year or current year

        $totalBookings = EventInquiry::count();
        $upcomingEvents = EventInquiry::where('event_date', '>=', today())->count();
        
        // --- UPDATED: These stats now reflect the selected year ---
        $totalRevenue = EventInquiry::where('status', 'Confirmed')
            ->whereYear('event_date', $year)
            ->sum(DB::raw('agreed_amount - discount_amount'));

        $totalExpenses = Expense::whereYear('date', $year)->sum('amount');
        
        $inventoryAlertsCount = InventoryItem::where('quantity', '<', 20)->count();
        $recentInquiries = EventInquiry::with('customer:id,name')->latest()->take(5)->get();
        $lowStockItems = InventoryItem::where('quantity', '<', 20)->orderBy('quantity', 'asc')->take(5)->get();

        // Get a list of all years that have data, for the dropdown
        $revenueYears = EventInquiry::select(DB::raw('YEAR(event_date) as year'))->distinct()->pluck('year');
        $expenseYears = Expense::select(DB::raw('YEAR(date) as year'))->distinct()->pluck('year');
        $availableYears = $revenueYears->merge($expenseYears)->unique()->sortDesc()->values();


        return response()->json([
            'stats' => [
                'totalBookings' => $totalBookings,
                'upcomingEvents' => $upcomingEvents,
                'totalRevenue' => number_format($totalRevenue, 2),
                'totalExpenses' => number_format($totalExpenses, 2),
                'inventoryAlerts' => $inventoryAlertsCount,
            ],
            'recentInquiries' => $recentInquiries,
            'lowStockItems' => $lowStockItems,
            'availableYears' => $availableYears, // Send available years to the frontend
            'activeYear' => (int)$year,
        ]);
    }

    public function chartData(Request $request)
    {
        $year = $request->query('year', date('Y')); // Use selected year or current year

        $revenueData = EventInquiry::select(
                DB::raw('MONTH(event_date) as month'),
                DB::raw('SUM(agreed_amount - discount_amount) as total')
            )
            ->where('status', 'Confirmed')
            ->whereYear('event_date', $year)
            ->groupBy('month')
            ->pluck('total', 'month');
            
        $expenseData = Expense::select(
                DB::raw('MONTH(date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('date', $year)
            ->groupBy('month')
            ->pluck('total', 'month');

        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $chartData = [];

        for ($i = 1; $i <= 12; $i++) {
            $chartData[] = [
                'name' => $months[$i - 1],
                'Revenue' => (float)($revenueData[$i] ?? 0),
                'Expenses' => (float)($expenseData[$i] ?? 0),
            ];
        }

        return response()->json([
            'year' => (int)$year,
            'data' => $chartData,
        ]);
    }
}