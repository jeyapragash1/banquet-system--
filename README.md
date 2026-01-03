# 🏛️ Pearl Hall Banquet Management System

A comprehensive full-stack web application for managing banquet hall operations, including event bookings, customer management, inventory tracking, financial reporting, and more.

![Laravel](https://img.shields.io/badge/Laravel-12.0-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![PHP](https://img.shields.io/badge/PHP-8.2+-purple?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan?style=flat-square&logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🌐 Customer-Facing Website
- **Beautiful Landing Page** - Animated hero sections with gradient effects
- **Event Packages** - Browse available banquet packages
- **Online Booking** - Submit event inquiries without registration
- **Contact Form** - Direct communication with the management
- **Responsive Design** - Mobile-friendly interface

### 🎛️ Admin Panel
- **Dashboard Analytics** - Real-time statistics and charts
  - Total bookings and upcoming events
  - Revenue vs expense tracking
  - Year-based filtering
  - Monthly performance charts
- **Customer Management** - Full CRUD operations for customer records
- **Event Booking System** - Manage inquiries and confirmations
- **Inventory Management** - Track stock levels with low-stock alerts
- **Package Builder** - Create and manage event packages
- **Room Management** - Hall availability and pricing
- **Expense Tracking** - Record and categorize expenses
- **Staff Management** - User accounts with role-based access
- **Financial Reports** - Generate PDF reports
- **Tax Settings** - Configure system-wide tax rates

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 12.0
- **Language:** PHP 8.2+
- **Database:** MySQL
- **Authentication:** Laravel Sanctum (Token-based)
- **Testing:** PestPHP 3.8
- **API:** RESTful Architecture

### Frontend
- **Framework:** React 19.1.0
- **Build Tool:** Vite 7.0
- **Routing:** React Router DOM 7.6.3
- **Styling:** Tailwind CSS 4.1.11
- **HTTP Client:** Axios 1.10.0
- **Forms:** React Hook Form 7.60.0
- **Charts:** Recharts 3.0.2
- **Icons:** React Icons 5.5.0
- **PDF Generation:** jsPDF + jsPDF-AutoTable

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                     │
│  ┌──────────────────┐    ┌──────────────────┐       │
│  │ Customer Website │    │   Admin Panel    │       │
│  │  - Home Page     │    │  - Dashboard     │       │
│  │  - Packages      │    │  - Bookings      │       │
│  │  - Booking       │    │  - Customers     │       │
│  │  - Contact       │    │  - Inventory     │       │
│  └──────────────────┘    └──────────────────┘       │
└─────────────────────────────────────────────────────┘
                         ↕ HTTP/JSON
┌─────────────────────────────────────────────────────┐
│              Laravel Backend API                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Controllers → Models → Database             │   │
│  │  - AuthController                            │   │
│  │  - DashboardController                       │   │
│  │  - EventInquiryController                    │   │
│  │  - CustomerController                        │   │
│  │  - InventoryItemController                   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│                  MySQL Database                      │
│  - users, customers, event_inquiries                 │
│  - inventory_items, expenses, rooms                  │
│  - event_packages                                    │
└─────────────────────────────────────────────────────┘
```

---

## 📥 Installation

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18.x
- MySQL >= 8.0
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/jeyapragash1/banquet-system--.git
cd banquet-system--
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd pearl-hall-backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create MySQL database
# Create a database named 'pearl_hall_backend1' in MySQL

# Configure database in .env file
# DB_DATABASE=pearl_hall_backend1
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# (Optional) Seed database with sample data
php artisan db:seed

# Start Laravel development server
php artisan serve
```

The backend will be available at `http://127.0.0.1:8000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd pearl-hall-frontend

# Install NPM dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### Backend Configuration

Edit `pearl-hall-backend/.env`:

```env
APP_NAME="Pearl Hall"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pearl_hall_backend1
DB_USERNAME=root
DB_PASSWORD=

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
```

### Frontend Configuration

Edit `pearl-hall-frontend/src/api.js`:

```javascript
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Backend API URL
  headers: { 
    'Accept': 'application/json',
  }
});
```

---

## 🚀 Usage

### Accessing the Application

1. **Customer Website:** `http://localhost:5173`
   - Browse packages
   - Submit booking inquiries
   - Contact the management

2. **Admin Panel:** `http://localhost:5173/#/admin/login`
   - Default credentials (create via `php artisan tinker`):
   ```php
   User::create([
       'name' => 'Admin',
       'email' => 'admin@pearlhall.com',
       'password' => bcrypt('password'),
       'role' => 'admin'
   ]);
   ```

### Common Commands

```bash
# Backend
cd pearl-hall-backend
php artisan serve              # Start development server
php artisan migrate            # Run migrations
php artisan migrate:fresh      # Fresh migration (drops all tables)
php artisan test               # Run tests

# Frontend
cd pearl-hall-frontend
npm run dev                    # Start development server
npm run build                  # Build for production
npm run preview                # Preview production build
npm run lint                   # Run ESLint
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/login` | User login | ❌ |
| POST | `/api/logout` | User logout | ✅ |
| GET | `/api/user` | Get authenticated user | ✅ |
| POST | `/api/register` | Register new staff (admin only) | ✅ |

### Public Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/public-inquiry` | Submit booking inquiry | ❌ |
| POST | `/api/v1/contact` | Submit contact form | ❌ |

### Admin Endpoints (Protected)

#### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard?year=2024` | Get dashboard statistics |
| GET | `/api/v1/dashboard/chart-data?year=2024` | Get revenue/expense chart data |

#### Resource Endpoints
All resource endpoints support standard CRUD operations:

| Resource | Endpoint | Operations |
|----------|----------|------------|
| Customers | `/api/v1/customers` | index, store, show, update, destroy |
| Event Inquiries | `/api/v1/event-inquiries` | index, store, show, update, destroy |
| Inventory Items | `/api/v1/inventory-items` | index, store, show, update, destroy |
| Expenses | `/api/v1/expenses` | index, store, show, update, destroy |
| Event Packages | `/api/v1/event-packages` | index, store, show, update, destroy |
| Rooms | `/api/v1/rooms` | index, store, show, update, destroy |
| Users | `/api/v1/users` | index, store, show, update, destroy |

#### Additional Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/settings/tax` | Get tax settings |
| POST | `/api/v1/settings/tax` | Update tax settings |
| POST | `/api/v1/reports/generate` | Generate PDF reports |

### Request Examples

**Login:**
```json
POST /api/login
{
  "email": "admin@pearlhall.com",
  "password": "password"
}
```

**Create Event Inquiry:**
```json
POST /api/v1/event-inquiries
Authorization: Bearer {token}
{
  "customer_id": 1,
  "inquiry_date": "2024-01-15",
  "event_type": "Wedding",
  "event_date": "2024-06-20",
  "agreed_amount": 150000,
  "discount_amount": 5000,
  "advance_payment": 50000,
  "status": "Confirmed",
  "stage_throne_option": "Included",
  "stage_throne_amount": 10000,
  "event_taken_by": "Admin"
}
```

---

## 📁 Project Structure

```
banquet-system--/
├── pearl-hall-backend/          # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       ├── Api/
│   │   │       │   ├── AuthController.php
│   │   │       │   └── V1/
│   │   │       │       ├── CustomerController.php
│   │   │       │       ├── DashboardController.php
│   │   │       │       ├── EventInquiryController.php
│   │   │       │       ├── ExpenseController.php
│   │   │       │       ├── InventoryItemController.php
│   │   │       │       ├── EventPackageController.php
│   │   │       │       ├── RoomController.php
│   │   │       │       ├── ReportController.php
│   │   │       │       ├── SettingsController.php
│   │   │       │       ├── UserController.php
│   │   │       │       └── ContactController.php
│   │   ├── Models/
│   │   │   ├── Customer.php
│   │   │   ├── EventInquiry.php
│   │   │   ├── EventPackage.php
│   │   │   ├── Expense.php
│   │   │   ├── InventoryItem.php
│   │   │   ├── Room.php
│   │   │   └── User.php
│   │   └── Mail/
│   │       └── ContactFormSubmitted.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── config/
│   └── tests/
│
├── pearl-hall-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   └── StatCard.jsx
│   │   ├── layouts/             # Layout components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── CustomerLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CustomerManagement.jsx
│   │   │   ├── EventInquiries.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── PackageBuilder.jsx
│   │   │   ├── RoomManagement.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── StaffManagement.jsx
│   │   │   ├── Finance.jsx
│   │   │   ├── DetailedReport.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── PublicPackages.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── public_components/   # Public website components
│   │   │   ├── PublicHeader.jsx
│   │   │   └── PublicFooter.jsx
│   │   ├── api.js               # Axios configuration
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md                    # This file
```

---

## 📊 Database Schema

### Main Tables

**users**
- id, name, email, password, role, timestamps

**customers**
- id, name, email, contact_number, address, alternate_contact, pax_sawan, religion_community, timestamps

**event_inquiries**
- id, customer_id (FK), inquiry_date, event_type, event_date, pax_sawan, agreed_amount, discount_amount, advance_payment, receipt_number, status, stage_throne_option, stage_throne_amount, event_taken_by, event_confirmed_by, timestamps

**event_packages**
- id, name, price, services (JSON), is_popular, timestamps

**rooms**
- id, name, status, price, event_inquiry_id (FK), timestamps

**inventory_items**
- id, name, category, quantity, timestamps

**expenses**
- id, date, category, description, amount, timestamps

---

## 📸 Screenshots

### Customer Website
- Modern landing page with gradient animations
- Event package showcase
- Online booking form

### Admin Panel
- Dark theme dashboard
- Interactive revenue charts
- Data tables with CRUD operations
- Real-time inventory alerts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PSR-12 coding standards for PHP
- Use ESLint and Prettier for JavaScript
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 🧪 Testing

### Backend Tests
```bash
cd pearl-hall-backend
php artisan test
# or
vendor/bin/pest
```

### Frontend Tests
```bash
cd pearl-hall-frontend
npm run test
```

---

## 🔒 Security

- Laravel Sanctum token-based authentication
- CORS protection configured
- Mass assignment protection on models
- SQL injection prevention via Eloquent ORM
- XSS protection with React's built-in escaping
- Password hashing with bcrypt

### Reporting Vulnerabilities

Please report security vulnerabilities to: [your-email@example.com]

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Jeyapragash**
- GitHub: [@jeyapragash1](https://github.com/jeyapragash1)

---

## 🙏 Acknowledgments

- Laravel Framework
- React Team
- Tailwind CSS
- All open-source contributors

---

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

## 🗺️ Roadmap

### Planned Features
- [ ] Email notifications for bookings
- [ ] SMS integration for confirmations
- [ ] Image upload for events and packages
- [ ] Calendar view for event bookings
- [ ] Advanced reporting with filters
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Customer portal for tracking bookings
- [ ] Role-based permission system
- [ ] Mobile app (React Native)

---

## 📈 Project Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** January 3, 2026

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for efficient banquet hall management

</div>
