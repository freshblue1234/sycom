import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import Flutterwave from 'flutterwave-node-v3';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Flutterwave
const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

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

// Validation schemas
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

// Generate verification code
function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Send verification email
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

// Routes

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

// Get all registrations (Admin endpoint)
app.get('/api/admin/registrations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('internship_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch registrations'
      });
    }

    res.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Admin fetch error:', error);
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
    timestamp: new Date().toISOString()
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
