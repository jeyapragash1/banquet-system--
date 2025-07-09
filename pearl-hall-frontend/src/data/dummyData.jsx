import { LuUsers, LuCalendarCheck2, LuDollarSign, LuTrendingUp } from 'react-icons/lu';

// For Dashboard
export const dashboardStats = [
  { title: "Total Bookings", value: "134", icon: <LuCalendarCheck2 className="w-8 h-8 text-secondary" />, change: "+15%", changeType: "positive", timeframe: "vs Last Month" },
  { title: "Monthly Revenue", value: "24,145", icon: <LuDollarSign className="w-8 h-8 text-primary" />, change: "+42%", changeType: "positive", timeframe: "vs Last Month" },
  { title: "Total Customers", value: "89", icon: <LuUsers className="w-8 h-8 text-warning" />, change: "+5", changeType: "positive", timeframe: "this month" },
  { title: "Monthly Expenses", value: "3,580", icon: <LuTrendingUp className="w-8 h-8 text-danger" />, change: "-8%", changeType: "negative", timeframe: "vs Last Month" }
];

export const monthlyRevenueData = [
  { name: 'Jan', Revenue: 4000, Expenses: 2400 }, { name: 'Feb', Revenue: 3000, Expenses: 1398 }, { name: 'Mar', Revenue: 9800, Expenses: 2000 }, { name: 'Apr', Revenue: 3908, Expenses: 2780 }, { name: 'May', Revenue: 4800, Expenses: 1890 }, { name: 'Jun', Revenue: 3800, Expenses: 2390 }, { name: 'Jul', Revenue: 4300, Expenses: 3490 },
];

// For Customers Page
export const customers = [
  { id: 1, name: 'John Doe', contact: '555-0101', pax: 150, community: 'Christian', events: 2, totalSpent: 8500 },
  { id: 2, name: 'Jane Smith', contact: '555-0102', pax: 200, community: 'Hindu', events: 1, totalSpent: 12000 },
  { id: 3, name: 'Sam Wilson', contact: '555-0103', pax: 80, community: 'Muslim', events: 3, totalSpent: 6200 },
  { id: 4, name: 'Aisha Khan', contact: '555-0104', pax: 300, community: 'Muslim', events: 1, totalSpent: 15000 },
  { id: 5, name: 'Carlos Garcia', contact: '555-0105', pax: 120, community: 'Christian', events: 1, totalSpent: 5500 },
];

// For Event Inquiries Page
export const eventInquiries = [
    { id: '#EVT1024', customerName: 'Andrea Pitter', eventType: 'Wedding', eventDate: '24 May 2025', agreedAmount: 4560, balance: 560, takenBy: 'Alice', confirmedBy: 'Admin', status: 'Confirmed' },
    { id: '#EVT1023', customerName: 'Timothy Sands', eventType: 'Reception', eventDate: '23 May 2025', agreedAmount: 3569, balance: 0, takenBy: 'Bob', confirmedBy: 'Admin', status: 'Confirmed' },
    { id: '#EVT1022', customerName: 'Bonnie Rodrigues', eventType: 'Birthday', eventDate: '22 May 2025', agreedAmount: 2659, balance: 2659, takenBy: 'Alice', confirmedBy: 'N/A', status: 'Pending' },
    { id: '#EVT1021', customerName: 'Randy McRae', eventType: 'Corporate', eventDate: '21 May 2025', agreedAmount: 2155, balance: 0, takenBy: 'Charlie', confirmedBy: 'Admin', status: 'Confirmed' },
];

// For Inventory Page
export const inventoryItems = [
    { id: 1, name: 'Dinner Plates', category: 'Crockery', quantity: 21, status: 'Low Stock' },
    { id: 2, name: 'Champagne Flutes', category: 'Glassware', quantity: 8, status: 'Low Stock' },
    { id: 3, name: 'Table Linens (White)', category: 'Linens', quantity: 15, status: 'Low Stock' },
    { id: 4, name: 'Fairy Lights (10m)', category: 'Decor', quantity: 10, status: 'Low Stock' },
    { id: 5, name: 'Round Tables (10-seater)', category: 'Furniture', quantity: 50, status: 'In Stock' },
    { id: 6, name: 'Chiavari Chairs (Gold)', category: 'Furniture', quantity: 450, status: 'In Stock' },
];

// For Packages Page
export const eventPackages = [
    { name: 'Silver Wedding Package', price: 500000, services: ['Basic Decor', 'Catering for 100 pax', 'Standard Sound System'], isPopular: true },
    { name: 'Gold Wedding Package', price: 720000, services: ['Premium Decor', 'Catering for 150 pax', 'DJ Services', 'Stage/Throne'], isPopular: true },
    { name: 'Platinum Corporate Event', price: 850000, services: ['Projector & Screen', 'Catering for 200 pax', 'Podium', 'Wi-Fi'], isPopular: true },
];

// For Rooms Page
export const rooms = [
    { id: 1, name: 'Bridal Suite', status: 'Available', price: 250 },
    { id: 2, name: 'Groom\'s Quarters', status: 'Booked', price: 200, assignedTo: '#EVT1024' },
    { id: 3, 'name': 'Guest Room', status: 'Available', price: 150 },
];

// For Expenses Page
export const expenses = [
    { date: '2025-07-01', category: 'Utilities', description: 'Electricity Bill', amount: 850.00 },
    { date: '2025-07-05', category: 'Maintenance', description: 'AC Repair', amount: 300.00 },
    { date: '2025-07-10', category: 'Cleaning', description: 'Monthly Cleaning Supplies', amount: 150.00 },
    { date: '2025-07-15', category: 'Staff', description: 'Part-time staff payment', amount: 1200.00 },
];

// For Staff Page
export const staff = [
    { id: 'S001', name: 'Brian Villalobos', role: 'System Admin', department: 'IT', img: 'https://i.pravatar.cc/150?u=brian' },
    { id: 'S002', name: 'Stephen Perait', role: 'Harvey Admin', department: 'Management', img: 'https://i.pravatar.cc/150?u=stephen' },
    { id: 'S003', name: 'Connie Waters', role: 'Event Manager', department: 'Sales', img: 'https://i.pravatar.cc/150?u=connie' },
    { id: 'S004', name: 'Linda Ray', role: 'Data Entry Staff', department: 'Operations', img: 'https://i.pravatar.cc/150?u=linda' },
];