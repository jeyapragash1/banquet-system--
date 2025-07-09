import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

// Admin Pages
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import EventInquiries from './pages/EventInquiries';
import Inventory from './pages/Inventory';
import PackageBuilder from './pages/PackageBuilder';
import RoomManagement from './pages/RoomManagement';
import Expenses from './pages/Expenses';
import StaffManagement from './pages/StaffManagement';
import Finance from './pages/Finance';
import AddEditEventInquiry from './pages/AddEditEventInquiry';
import AddEditCustomer from './pages/AddEditCustomer';
import AddEditInventory from './pages/AddEditInventory';
import AddEditPackage from './pages/AddEditPackage';
import AddEditExpense from './pages/AddEditExpense';
import AddEditStaff from './pages/AddEditStaff'; // <-- Import the new page
import DetailedReport from './pages/DetailedReport';
import LoginPage from './pages/LoginPage';

// Customer Pages
import HomePage from './pages/HomePage';
import PublicPackages from './pages/PublicPackages';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer-Facing Website Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PublicPackages />} />
          <Route path="/book-now" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Panel Routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />

                <Route path="dashboard" element={<Dashboard />} />
                <Route path="customers" element={<CustomerManagement />} />
                <Route path="customers/new" element={<AddEditCustomer />} />
                <Route path="customers/edit/:id" element={<AddEditCustomer />} />
                <Route path="inquiries" element={<EventInquiries />} />
                <Route path="inquiries/new" element={<AddEditEventInquiry />} />
                <Route path="inquiries/edit/:id" element={<AddEditEventInquiry />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="inventory/new" element={<AddEditInventory />} />
                <Route path="inventory/edit/:id" element={<AddEditInventory />} />
                <Route path="packages" element={<PackageBuilder />} />
                <Route path="packages/new" element={<AddEditPackage />} />
                <Route path="packages/edit/:id" element={<AddEditPackage />} />
                <Route path="rooms" element={<RoomManagement />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="expenses/new" element={<AddEditExpense />} />
                <Route path="expenses/edit/:id" element={<AddEditExpense />} />
                
                {/* --- THIS IS THE CORRECTED SECTION --- */}
                <Route path="staff" element={<StaffManagement />} />
                <Route path="staff/new" element={<AddEditStaff />} />
                <Route path="staff/edit/:id" element={<AddEditStaff />} />
                
                <Route path="finance" element={<Finance />} />
                <Route path="reports/:type" element={<DetailedReport />} />
            </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;