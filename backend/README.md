# Sycom Industry Backend Server

Backend server for Sycom Industry internship registration system with Supabase integration and Flutterwave payment processing.

## 🚀 Features

- **Internship Registration**: Complete form validation and data storage
- **Payment Processing**: Flutterwave integration for 25,000 RWF payments
- **Email Verification**: Automatic verification code generation and email delivery
- **Admin Dashboard**: View and manage all registrations
- **Security**: Row Level Security (RLS) and environment variable protection

## 📋 API Endpoints

### Registration & Payment
- `POST /api/register-internship` - Register new internship applicant
- `POST /api/create-payment` - Initiate Flutterwave payment
- `POST /api/verify-payment` - Verify payment completion and send verification code

### Admin
- `GET /api/admin/registrations` - View all registrations (admin access)

### System
- `GET /api/health` - Health check endpoint

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `FLUTTERWAVE_PUBLIC_KEY` - Flutterwave public key
- `FLUTTERWAVE_SECRET_KEY` - Flutterwave secret key
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password

### 3. Start Server
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Server runs on `http://localhost:5000` by default.

## 📊 Database Schema

The `internship_requests` table includes:
- Personal information (name, email, phone, address, national_id)
- Internship details (field, mode)
- Payment status (unpaid/paid/failed)
- Verification code (generated after payment)
- Timestamps (created_at, updated_at)

## 🔒 Security Features

- Row Level Security (RLS) on Supabase tables
- Environment variable protection
- Input validation with Joi
- CORS configuration
- SQL injection prevention through Supabase client

## 📧 Email Configuration

Uses Gmail SMTP for sending verification codes:
- Requires 2-factor authentication on Gmail
- Uses App Passwords for secure authentication
- Sends professional HTML emails with verification codes

## 💳 Payment Integration

Flutterwave integration supports:
- Mobile Money (Rwanda)
- Card payments
- Bank transfers
- USSD payments
- Automatic payment verification
- Webhook support for production

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/register-internship \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+250784090113",
    "address": "Kigali, Rwanda",
    "national_id": "1199080012345678",
    "field": "Software",
    "mode": "Online"
  }'
```

### Test Payment
Use Flutterwave test credentials:
- Card: 4187427415564246
- CVV: 123
- Expiry: 09/32
- PIN: 3310

## 🚨 Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "details": "Additional error details (if applicable)"
}
```

## 📈 Monitoring

Monitor:
- API response times
- Payment success rates
- Email delivery rates
- Database connection health
- Error rates and types

## 🔄 Deployment

### Environment Variables
Set these in your deployment platform:
- All variables from `.env.example`
- `NODE_ENV=production`
- `FRONTEND_URL=https://your-domain.com`

### Recommended Platforms
- Vercel (serverless functions)
- Railway (container-based)
- DigitalOcean App Platform
- Heroku

## 📞 Support

For technical issues:
- Email: sycomindustry@gmail.com
- Phone: +250 784 090 113
- Business Hours: Monday-Friday, 9AM-6PM (GMT+2)
