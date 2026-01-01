# Sycom Industry Internship Registration System Setup Guide

This guide will help you set up the complete backend system for your internship registration using Supabase, Node.js, and Flutterwave payment integration.

## 🚀 Quick Setup Overview

1. **Supabase Setup** - Database and authentication
2. **Backend Setup** - Node.js Express server
3. **Frontend Integration** - Connect to your existing website
4. **Payment Setup** - Flutterwave configuration
5. **Email Setup** - Gmail SMTP configuration

---

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account (free tier is sufficient)
- Flutterwave account
- Gmail account (for email sending)

---

## 🗄️ Step 1: Supabase Database Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 1.2 Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click **Run** to create the table and policies

### 1.3 Get Service Role Key
1. Go to **Settings** → **API**
2. Copy the **service_role** key (keep this secret!)

---

## 🔧 Step 2: Backend Setup

### 2.1 Install Dependencies
```bash
cd backend
npm install
```

### 2.2 Environment Configuration
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

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

## 💳 Step 3: Flutterwave Payment Setup

### 3.1 Create Flutterwave Account
1. Sign up at [flutterwave.com](https://flutterwave.com)
2. Complete your business verification
3. Go to **Settings** → **API Keys**

### 3.2 Get API Keys
1. Copy your **Public Key**
2. Copy your **Secret Key**
3. Copy your **Encryption Key**
4. Add these to your `.env` file

### 3.3 Configure Webhook (Optional)
For production, set up webhook in Flutterwave dashboard:
- Webhook URL: `https://your-domain.com/api/payment-webhook`

---

## 🚀 Step 4: Start the Backend Server

### 4.1 Development Mode
```bash
cd backend
npm run dev
```

### 4.2 Production Mode
```bash
cd backend
npm start
```

Your backend will be running at `http://localhost:5000`

---

## 🌐 Step 5: Frontend Integration

The frontend components are already created and integrated into your React app:

### 5.1 Components Added:
- `InternshipRegistration.jsx` - Main registration form
- `AdminDashboard.jsx` - Admin view (optional)
- `InternshipSuccess.jsx` - Payment success page

### 5.2 Navigation Update
The registration form is automatically added to your main App.jsx between Team and Contact sections.

### 5.3 Start Frontend
```bash
npm run dev
```

Your website will be running at `http://localhost:5173`

---

## 🔒 Security Configuration

### Row Level Security (RLS)
The database schema includes RLS policies:
- Public users can INSERT registrations only
- Service role can READ/UPDATE all data
- No public READ access to registration data

### Environment Variables
Never commit `.env` file to version control. Add to `.gitignore`:
```gitignore
.env
node_modules/
```

---

## 📊 API Endpoints

### Registration Endpoints
- `POST /api/register-internship` - Register new internship
- `POST /api/create-payment` - Initiate payment
- `POST /api/verify-payment` - Verify payment completion

### Admin Endpoints
- `GET /api/admin/registrations` - View all registrations
- `GET /api/health` - Health check

---

## 🧪 Testing the System

### 1. Test Registration
1. Visit your website
2. Navigate to the Internship Registration section
3. Fill out the form with test data
4. Submit the form

### 2. Test Payment
1. After registration, click "Pay 25,000 RWF"
2. Use Flutterwave test cards:
   - Card Number: `4187427415564246`
   - CVV: `123`
   - Expiry: `09/32`
   - PIN: `3310`

### 3. Test Email
1. Check your email for the verification code
2. Verify the code format and content

### 4. Test Admin Dashboard
1. Navigate to admin dashboard (if implemented)
2. View registration statistics
3. Export data to CSV

---

## 🚀 Deployment

### Backend Deployment
1. Deploy to Vercel, Railway, or DigitalOcean
2. Set environment variables in deployment platform
3. Update `FRONTEND_URL` to your production domain

### Frontend Deployment
1. Build your React app: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API URLs in production

---

## 🔧 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure `FRONTEND_URL` matches your frontend URL
- Check that CORS is properly configured in server.js

**Email Not Sending:**
- Verify Gmail app password is correct
- Check that 2FA is enabled on Gmail
- Ensure email and password have no special characters

**Payment Issues:**
- Verify Flutterwave API keys are correct
- Check that payment amount is in RWF
- Ensure webhook URL is accessible (if configured)

**Database Connection:**
- Verify Supabase URL and service role key
- Check that RLS policies are applied correctly
- Ensure table exists with correct schema

---

## 📞 Support

For technical support:
- Email: sycomindustry@gmail.com
- Phone: +250 784 090 113
- Business Hours: Monday to Friday, 9:00 AM to 6:00 PM (GMT+2)

---

## 🔄 Maintenance

### Regular Tasks
1. Monitor payment success rates
2. Check email delivery rates
3. Review registration data quality
4. Update Flutterwave credentials if needed

### Backup Strategy
- Supabase automatically backs up your data
- Consider regular exports of registration data
- Monitor storage usage in Supabase

---

## 📈 Scaling

When scaling up:
1. Consider upgrading Supabase plan
2. Implement rate limiting on API endpoints
3. Add monitoring and logging
4. Consider CDN for static assets
5. Implement caching for admin dashboard

---

## 🎯 Success Metrics

Track these metrics:
- Registration completion rate
- Payment success rate
- Email delivery rate
- Time to verification code delivery
- User satisfaction scores

Your internship registration system is now ready! 🎉
