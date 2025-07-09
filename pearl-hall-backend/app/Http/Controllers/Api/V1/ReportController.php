<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventInquiry;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB; // <-- THIS IS THE CRITICAL FIX

class ReportController extends Controller
{
    public function generateReport(Request $request)
    {
        $request->validate([
            'type' => 'required|in:daily,monthly',
            'date' => 'required_if:type,daily|date',
            'month' => 'required_if:type,monthly|date_format:Y-m',
        ]);

        $type = $request->input('type');

        if ($type === 'daily') {
            $date = Carbon::parse($request->input('date'));
            
            $income = EventInquiry::where('status', 'Confirmed')
                        ->whereDate('event_date', $date)
                        ->sum(DB::raw('agreed_amount - discount_amount'));

            $expenses = Expense::whereDate('date', $date)->sum('amount');
            $period = $date->format('F j, Y');

        } else { // monthly
            $date = Carbon::parse($request->input('month'));
            
            $income = EventInquiry::where('status', 'Confirmed')
                        ->whereMonth('event_date', $date->month)
                        ->whereYear('event_date', $date->year)
                        ->sum(DB::raw('agreed_amount - discount_amount'));

            $expenses = Expense::whereMonth('date', $date->month)
                        ->whereYear('date', $date->year)
                        ->sum('amount');
                        
            $period = $date->format('F Y');
        }

        $netProfit = $income - $expenses;

        return response()->json([
            'period' => $period,
            'totalIncome' => (float)$income,
            'totalExpenses' => (float)$expenses,
            'netProfit' => (float)$netProfit,
        ]);
    }
}