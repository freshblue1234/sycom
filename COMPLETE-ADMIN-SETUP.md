# 🚀 Complete Admin System Setup Guide

This guide will help you set up the complete backend system with admin authentication for your Sycom Industry internship registration.

## 📋 What's Included

✅ **Complete Database Schema** with admin tables  
✅ **Admin Authentication** with JWT tokens  
✅ **Admin Login Page** with secure authentication  
✅ **Admin Dashboard** with full statistics  
✅ **Session Management** with automatic logout  
✅ **System Logging** for audit trails  
✅ **Payment Integration** with Flutterwave  
✅ **Email Verification** system  

---

## 🔧 Step 1: Database Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and service role key

### 1.2 Run Complete Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/complete_schema.sql`
3. Click **Run** to create all tables

### 1.3 Get Your Credentials
- **Project URL**: From Supabase Settings → API
- **Service Role Key**: From Supabase Settings → API (keep this secret!)

---

## 🔧 Step 2: Backend Setup

### 2.1 Install Dependencies
```bash
cd backend
npm install
```

### 2.2 Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Flutterwave Configuration
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2.3 Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASS`

---

## 🔧 Step 3: Start the Backend Server

```bash
cd backend
npm run dev
```

The server will automatically:
- Create the default admin user
- Display login credentials in the console
- Start on `http://localhost:5000`

**Console Output:**
```
🚀 Sycom Industry Backend Server running on port 5000
📊 Admin Dashboard: http://localhost:5000/api/admin/dashboard
🔑 Admin Login: http://localhost:5000/api/admin/login
🏥 Health Check: http://localhost:5000/api/health
✅ Default admin user created:
   Email: admin@sycomindustry.com
   Password: admin123
   🔒 Please change this password after first login!
```

---

## 🔧 Step 4: Frontend Setup

Start your React frontend:
```bash
npm run dev
```

---

## 🔑 How to Login as Admin

### Method 1: Direct Access
1. Open your browser
2. Go to: `http://localhost:5173/admin/login`
3. Use these credentials:
   - **Email**: `admin@sycomindustry.com`
   - **Password**: `admin123`

### Method 2: Through Website
1. Go to your website homepage
2. Navigate to: `http://localhost:5173/admin/login`
3. Login with the same credentials

---

## 📊 Admin Dashboard Features

Once logged in, you'll see:

### **Dashboard Statistics**
- Total registrations
- Paid registrations
- Total revenue
- Today's registrations
- Field statistics with conversion rates
- Mode statistics

### **Registration Management**
- View all internship registrations
- Search and filter registrations
- Export data to CSV
- View detailed registration information
- Update registration status

### **System Features**
- Real-time data refresh
- Secure logout
- Session management
- Audit logging

---

## 🧪 Testing the Complete System

### 1. Test Admin Login
```bash
# Test admin login endpoint
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sycomindustry.com",
    "password": "admin123"
  }'
```

### 2. Test Registration
1. Visit `http://localhost:5173/internship`
2. Fill out the registration form
3. Complete payment process
4. Check admin dashboard for new registration

### 3. Test Payment
Use Flutterwave test credentials:
- Card Number: `4187427415564246`
- CVV: `123`
- Expiry: `09/32`
- PIN: `3310`

---

## 🔒 Security Features

### **Authentication**
- JWT token-based authentication
- Session management with expiry
- Automatic logout on session expiry
- Secure password hashing with bcrypt

### **Database Security**
- Row Level Security (RLS) policies
- Service role key protection
- SQL injection prevention
- Audit logging for all changes

### **API Security**
- CORS configuration
- Input validation with Joi
- Rate limiting ready
- Error handling without information leakage

---

## 📱 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/profile` - Get admin profile

### Admin Dashboard
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/registrations` - All registrations
- `PUT /api/admin/registrations/:id` - Update registration
- `GET /api/admin/logs` - System logs

### Public API
- `POST /api/register-internship` - Register internship
- `POST /api/create-payment` - Create payment
- `POST /api/verify-payment` - Verify payment

---

## 🚀 Production Deployment

### 1. Environment Variables
Set these in production:
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
SUPABASE_URL=your-production-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
```

### 2. Security Changes
- Change default admin password
- Use strong JWT secret
- Enable HTTPS
- Set up proper CORS domains
- Configure rate limiting

### 3. Database Changes
- Create additional admin users
- Set up proper backup strategy
- Monitor database performance
- Review RLS policies

---

## 🛠️ Troubleshooting

### **Login Issues**
- Check email/password: `admin@sycomindustry.com` / `admin123`
- Verify backend server is running
- Check Supabase connection

### **Database Issues**
- Run the complete schema SQL
- Check service role key
- Verify RLS policies

### **Payment Issues**
- Verify Flutterwave API keys
- Check webhook configuration
- Test with Flutterwave test cards

### **Email Issues**
- Verify Gmail app password
- Check 2FA is enabled
- Test email configuration

---

## 📞 Support

For technical support:
- **Email**: sycomindustry@gmail.com
- **Phone**: +250 784 090 113
- **Business Hours**: Monday-Friday, 9AM-6PM (GMT+2)

---

## 🎉 You're Ready!

Your complete admin system is now ready! You can:
1. ✅ Login as admin
2. ✅ View dashboard statistics
3. ✅ Manage registrations
4. ✅ Process payments
5. ✅ Send verification emails
6. ✅ Export data
7. ✅ Monitor system activity

The system is production-ready with full security, authentication, and monitoring capabilities! 🚀
