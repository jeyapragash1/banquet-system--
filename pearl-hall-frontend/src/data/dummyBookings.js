import { LuUsers, LuCalendarCheck2, LuDollarSign, LuTrendingUp } from 'react-icons/lu';

export const dashboardStats = [
  {
    title: "Total Bookings",
    value: "134",
    icon: <LuCalendarCheck2 className="w-8 h-8 text-secondary" />,
    change: "+15%",
    changeType: "positive",
    timeframe: "vs Last Month"
  },
  {
    title: "Monthly Revenue",
    value: "24,145",
    icon: <LuDollarSign className="w-8 h-8 text-primary" />,
    change: "+42%",
    changeType: "positive",
    timeframe: "vs Last Month"
  },
  {
    title: "Total Customers",
    value: "89",
    icon: <LuUsers className="w-8 h-8 text-warning" />,
    change: "+5",
    changeType: "positive",
    timeframe: "this month"
  },
  {
    title: "Monthly Expenses",
    value: "3,580",
    icon: <LuTrendingUp className="w-8 h-8 text-danger" />,
    change: "-8%",
    changeType: "negative",
    timeframe: "vs Last Month"
  }
];

export const monthlyRevenueData = [
  { name: 'Jan', Revenue: 4000, Expenses: 2400 },
  { name: 'Feb', Revenue: 3000, Expenses: 1398 },
  { name: 'Mar', Revenue: 9800, Expenses: 2000 },
  { name: 'Apr', Revenue: 3908, Expenses: 2780 },
  { name: 'May', Revenue: 4800, Expenses: 1890 },
  { name: 'Jun', Revenue: 3800, Expenses: 2390 },
  { name: 'Jul', Revenue: 4300, Expenses: 3490 },
];

export const upcomingEvents = [
    { id: '#EVT1024', customerName: 'Andrea Pitter', eventType: 'Wedding', date: '24 May 2025', status: 'Confirmed', amount: '4560' },
    { id: '#EVT1023', customerName: 'Timothy Sands', eventType: 'Reception', date: '23 May 2025', status: 'Confirmed', amount: '3569' },
    { id: '#EVT1022', customerName: 'Bonnie Rodrigues', eventType: 'Birthday', date: '22 May 2025', status: 'Pending', amount: '2659' },
    { id: '#EVT1021', customerName: 'Randy McRae', eventType: 'Corporate', date: '21 May 2025', status: 'Confirmed', amount: '2155' },
];

export const lowStockItems = [
    { name: 'Dinner Plates', currentStock: 21, category: 'Crockery' },
    { name: 'Champagne Flutes', currentStock: 8, category: 'Glassware' },
    { name: 'Table Linens (White)', currentStock: 15, category: 'Linens' },
    { name: 'Fairy Lights (10m)', currentStock: 10, category: 'Decor' },
]