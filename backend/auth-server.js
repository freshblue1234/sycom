import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import Flutterwave from 'flutterwave-node-v3';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const SESSION_EXPIRY = '24h';

// Initialize Supabase
const supabase = createClient(
  'https://qjtakzpspgpkndeiabre.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdGFrenBzcGdwa25kZWlhYnJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzE4MjQxMSwiZXhwIjoyMDgyNzU4NDExfQ.hJSeqJQwTwLAqXlwOPy2_KOWiEtR2A_GJUWvikH_FZg'
);

// Initialize Flutterwave
// const flw = new Flutterwave(
//   process.env.FLUTTERWAVE_PUBLIC_KEY,
//   process.env.FLUTTERWAVE_SECRET_KEY
// );

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // TEMPORARY BYPASS FOR TESTING - Remove this after database setup
    if (decoded.id === 'temp-admin-id') {
      req.admin = {
        id: 'temp-admin-id',
        username: 'admin',
        email: 'admin@sycomindustry.com',
        full_name: 'System Administrator',
        role: 'super_admin'
      };
      return next();
    }
    
    // Check if session exists and is valid
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .select('*, admin_users(*)')
      .eq('session_token', token)
      .eq('is_active', true)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (sessionError || !session) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired session.' 
      });
    }

    req.admin = session.admin_users;
    req.session = session;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

// Validation schemas
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});

const registrationSchema = Joi.object({
  full_name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(10),
  address: Joi.string().required().min(5),
  national_id: Joi.string().required().min(8),
  field: Joi.string().required().valid('Software', 'Networking', 'Data Science', 'Cybersecurity', 'Web Development', 'Mobile Development'),
  mode: Joi.string().required().valid('Online', 'Physical')
});

const paymentSchema = Joi.object({
  registration_id: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  amount: Joi.number().required().min(1)
});

const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required().max(254),
  message: Joi.string().required().min(5).max(5000)
});

// Helper functions
function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function sendVerificationEmail(email, fullName, field, verificationCode) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Sycom Industry - Internship Registration Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Welcome to Sycom Industry Internship Program!</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for registering for our <strong>${field}</strong> internship program.</p>
        <p>Your registration has been confirmed and payment has been processed successfully.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Your Verification Code</h3>
          <p style="font-size: 24px; font-weight: bold; color: #1e40af; letter-spacing: 2px;">${verificationCode}</p>
        </div>
        <p><strong>Important:</strong> Please keep this verification code safe. You will need it when your internship begins.</p>
        <p>If you have any questions, please contact us at sycomindustry@gmail.com or call +250 784 090 113.</p>
        <br>
        <p>Best regards,<br>The Sycom Industry Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// CONTACT ROUTE

app.post('/api/contact', async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;
    if (!receiverEmail) {
      return res.status(500).json({
        success: false,
        message: 'Contact email receiver is not configured'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      replyTo: value.email,
      subject: `Sycom Industry - New Contact Message from ${value.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New message from the Contact form</h2>
          <p><strong>Name:</strong> ${value.name}</p>
          <p><strong>Email:</strong> ${value.email}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${value.message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// AUTHENTICATION ROUTES

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { email, password } = value;

    // TEMPORARY BYPASS FOR TESTING - Remove this after database setup
    if (email === 'admin@sycomindustry.com' && password === 'admin123') {
      const token = jwt.sign(
        { 
          id: 'temp-admin-id', 
          email: 'admin@sycomindustry.com', 
          role: 'super_admin' 
        },
        JWT_SECRET,
        { expiresIn: SESSION_EXPIRY }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: {
            id: 'temp-admin-id',
            username: 'admin',
            email: 'admin@sycomindustry.com',
            full_name: 'System Administrator',
            role: 'super_admin'
          }
        }
      });
    }

    // Get admin user
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password (assuming you have password_hash stored)
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin.id, 
        email: admin.email, 
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: SESSION_EXPIRY }
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .insert([{
        admin_user_id: admin.id,
        session_token: token,
        expires_at: expiresAt.toISOString(),
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      }])
      .select()
      .single();

    if (sessionError) {
      console.error('Session creation error:', sessionError);
      return res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.'
      });
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Log the login
    await supabase
      .from('system_logs')
      .insert([{
        admin_user_id: admin.id,
        action: 'LOGIN',
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      }]);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          full_name: admin.full_name,
          role: admin.role,
          last_login: admin.last_login
        },
        expires_at: expiresAt
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin Logout
app.post('/api/admin/logout', authenticateAdmin, async (req, res) => {
  try {
    // Deactivate session
    await supabase
      .from('admin_sessions')
      .update({ is_active: false })
      .eq('id', req.session.id);

    // Log the logout
    await supabase
      .from('system_logs')
      .insert([{
        admin_user_id: req.admin.id,
        action: 'LOGOUT',
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      }]);

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get Current Admin Profile
app.get('/api/admin/profile', authenticateAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.admin.id,
        username: req.admin.username,
        email: req.admin.email,
        full_name: req.admin.full_name,
        role: req.admin.role,
        last_login: req.admin.last_login,
        created_at: req.admin.created_at
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// INTERNSHIP REGISTRATION ROUTES

// Register internship
app.post('/api/register-internship', async (req, res) => {
  try {
    const { error, value } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { full_name, email, phone, address, national_id, field, mode } = value;

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('internship_requests')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered for internship'
      });
    }

    // Insert registration
    const { data, error: insertError } = await supabase
      .from('internship_requests')
      .insert([{
        id: uuidv4(),
        full_name,
        email,
        phone,
        address,
        national_id,
        field,
        mode,
        payment_status: 'unpaid',
        registration_status: 'registered'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please proceed to payment.',
      data: {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        field: data.field,
        mode: data.mode,
        payment_status: data.payment_status
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create payment
app.post('/api/create-payment', async (req, res) => {
  try {
    const { error, value } = paymentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { registration_id, email, amount } = value;

    // Get registration details
    const { data: registration, error: fetchError } = await supabase
      .from('internship_requests')
      .select('*')
      .eq('id', registration_id)
      .single();

    if (fetchError || !registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    if (registration.payment_status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed'
      });
    }

    // Create Flutterwave payment link
    const paymentData = {
      tx_ref: `SYCOM-${registration_id}-${Date.now()}`,
      amount: amount,
      currency: 'RWF',
      email: email,
      phone_number: registration.phone,
      fullname: registration.full_name,
      customer: {
        email: email,
        phone_number: registration.phone,
        name: registration.full_name
      },
      customizations: {
        title: 'Sycom Industry Internship Fee',
        description: `Payment for ${registration.field} internship - ${registration.mode} mode`,
        logo: 'https://your-logo-url.com/logo.png'
      },
      redirect_url: `${process.env.FRONTEND_URL}/payment-success`,
      payment_options: 'card,banktransfer,ussd,mobilemoneyrwanda'
    };

    const response = await flw.Charge.charge(paymentData);

    if (response.status === 'success') {
      // Update registration with payment reference
      await supabase
        .from('internship_requests')
        .update({
          payment_reference: response.data.tx_ref,
          payment_amount: amount
        })
        .eq('id', registration_id);

      res.json({
        success: true,
        message: 'Payment initiated successfully',
        payment_link: response.meta.authorization.redirect,
        transaction_ref: response.data.tx_ref
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment initiation failed',
        error: response.message
      });
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { transaction_id, registration_id } = req.body;

    if (!transaction_id || !registration_id) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID and Registration ID are required'
      });
    }

    // Verify transaction with Flutterwave
    const response = await flw.Transaction.verify({ id: transaction_id });

    if (response.data.status === 'successful' && response.data.currency === 'RWF') {
      // Generate verification code
      const verificationCode = generateVerificationCode();

      // Update registration in database
      const { data: registration, error: updateError } = await supabase
        .from('internship_requests')
        .update({
          payment_status: 'paid',
          verification_code: verificationCode,
          transaction_id: transaction_id,
          payment_method: response.data.payment_type,
          updated_at: new Date().toISOString()
        })
        .eq('id', registration_id)
        .select()
        .single();

      if (updateError) {
        console.error('Database update error:', updateError);
        return res.status(500).json({
          success: false,
          message: 'Payment verified but failed to update records'
        });
      }

      // Record payment transaction
      await supabase
        .from('payment_transactions')
        .insert([{
          registration_id: registration_id,
          transaction_reference: response.data.tx_ref,
          amount: response.data.amount,
          currency: response.data.currency,
          status: 'successful',
          payment_method: response.data.payment_type,
          gateway_response: response.data,
          processed_at: new Date().toISOString()
        }]);

      // Send verification email
      try {
        await sendVerificationEmail(
          registration.email,
          registration.full_name,
          registration.field,
          verificationCode
        );
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }

      res.json({
        success: true,
        message: 'Payment verified successfully! Verification code sent to your email.',
        data: {
          payment_status: 'paid',
          verification_code_sent: true
        }
      });

    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ADMIN DASHBOARD ROUTES (Protected)

// Get dashboard statistics
app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // TEMPORARY MOCK DATA - Remove this after database setup
    const mockData = {
      summary: {
        total_registrations: 45,
        paid_registrations: 32,
        unpaid_registrations: 13,
        total_revenue: 3200000,
        today_registrations: 5
      },
      fieldStatistics: [
        { field: 'Software Development', total_registrations: 15, paid_registrations: 12, conversion_rate: 80 },
        { field: 'Data Science', total_registrations: 12, paid_registrations: 8, conversion_rate: 67 },
        { field: 'Web Development', total_registrations: 10, paid_registrations: 7, conversion_rate: 70 },
        { field: 'Mobile Development', total_registrations: 8, paid_registrations: 5, conversion_rate: 63 }
      ],
      modeStatistics: [
        { mode: 'Online', total_registrations: 25, paid_registrations: 18 },
        { mode: 'On-site', total_registrations: 20, paid_registrations: 14 }
      ],
      recentRegistrations: [
        {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com',
          phone: '+250788123456',
          field: 'Software Development',
          mode: 'Online',
          payment_status: 'paid',
          registration_status: 'confirmed',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          full_name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+250787654321',
          field: 'Data Science',
          mode: 'On-site',
          payment_status: 'unpaid',
          registration_status: 'pending',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    };

    res.json({
      success: true,
      data: mockData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// Get all registrations (Admin endpoint)
app.get('/api/admin/registrations', authenticateAdmin, async (req, res) => {
  try {
    // TEMPORARY MOCK DATA - Remove this after database setup
    const mockRegistrations = [
      {
        id: '1',
        full_name: 'John Doe',
        email: 'john@example.com',
        phone: '+250788123456',
        address: 'Kigali, Rwanda',
        national_id: '119908000000123456',
        field: 'Software Development',
        mode: 'Online',
        payment_status: 'paid',
        registration_status: 'confirmed',
        verification_code: 'VER-123456',
        payment_reference: 'FLW-PAY-123456',
        amount_paid: 100000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+250787654321',
        address: 'Kigali, Rwanda',
        national_id: '119908000000654321',
        field: 'Data Science',
        mode: 'On-site',
        payment_status: 'unpaid',
        registration_status: 'pending',
        verification_code: null,
        payment_reference: null,
        amount_paid: 0,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        full_name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+250789987654',
        address: 'Kigali, Rwanda',
        national_id: '119908000000789012',
        field: 'Web Development',
        mode: 'Online',
        payment_status: 'paid',
        registration_status: 'confirmed',
        verification_code: 'VER-789012',
        payment_reference: 'FLW-PAY-789012',
        amount_paid: 100000,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    res.json({
      success: true,
      data: mockRegistrations,
      pagination: {
        page: 1,
        limit: 50,
        total: mockRegistrations.length,
        totalPages: 1
      }
    });

  } catch (error) {
    console.error('Registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
});

// Internship Registration
app.post('/api/internship/register', async (req, res) => {
  try {
    console.log('Request headers:', req.headers);
    console.log('Request body raw:', req.body);
    
    const {
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      studentCard,
      internshipField,
      educationLevel,
      institution,
      experience,
      motivation,
      startDate,
      address,
      price,
      paymentStatus
    } = req.body;
    
    console.log('Parsed data:', {
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      studentCard,
      internshipField,
      educationLevel,
      institution,
      experience,
      motivation,
      startDate,
      address,
      price,
      paymentStatus
    });
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || (!nationalId && !studentCard) || !internshipField || !educationLevel || !institution || !motivation || !startDate || !address) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Create registration record
    const registration = {
      id: Date.now().toString(),
      full_name: `${firstName} ${lastName}`,
      email,
      phone,
      national_id: nationalId || studentCard,
      internship_field: internshipField,
      education_level: educationLevel,
      institution,
      experience,
      motivation,
      start_date: startDate,
      address,
      price: price || 25000,
      payment_status: paymentStatus || 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // For now, just return success (in production, save to database)
    console.log('New internship registration:', registration);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please proceed to payment.',
      data: registration
    });

  } catch (error) {
    console.error('Internship registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Update registration status
app.put('/api/admin/registrations/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status, registration_status, notes } = req.body;

    const updateData = {
      admin_reviewed_by: req.admin.id,
      admin_reviewed_at: new Date().toISOString()
    };

    if (payment_status) updateData.payment_status = payment_status;
    if (registration_status) updateData.registration_status = registration_status;
    if (notes) updateData.notes = notes;

    const { data, error } = await supabase
      .from('internship_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update registration'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get system logs
app.get('/api/admin/logs', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('system_logs')
      .select('*, admin_users(full_name, email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Logs error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch logs'
      });
    }

    res.json({
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sycom Industry Backend Server running on port ${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`🔑 Admin Login: http://localhost:${PORT}/api/admin/login`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  
  // Create default admin user if not exists
  createDefaultAdmin();
});

// Create default admin user
async function createDefaultAdmin() {
  try {
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', 'admin@sycomindustry.com')
      .single();

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          username: 'admin',
          email: 'admin@sycomindustry.com',
          password_hash: hashedPassword,
          full_name: 'System Administrator',
          role: 'super_admin'
        }])
        .select()
        .single();

      if (!error && data) {
        console.log('✅ Default admin user created:');
        console.log('   Email: admin@sycomindustry.com');
        console.log('   Password: admin123');
        console.log('   🔒 Please change this password after first login!');
      }
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}
