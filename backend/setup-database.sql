-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create internship_registrations table
CREATE TABLE IF NOT EXISTS internship_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  national_id VARCHAR(100) NOT NULL,
  field VARCHAR(100) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'unpaid' NOT NULL,
  registration_status VARCHAR(20) DEFAULT 'pending' NOT NULL,
  verification_code VARCHAR(100),
  payment_reference VARCHAR(100),
  amount_paid DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can view all admin users" ON admin_users
  FOR SELECT USING (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Admin users can update admin users" ON admin_users
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'super_admin');

-- Create policies for internship_registrations
CREATE POLICY "Admin users can view all registrations" ON internship_registrations
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

CREATE POLICY "Admin users can update registrations" ON internship_registrations
  FOR UPDATE USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

CREATE POLICY "Admin users can insert registrations" ON internship_registrations
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_internship_registrations_email ON internship_registrations(email);
CREATE INDEX IF NOT EXISTS idx_internship_registrations_payment_status ON internship_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_internship_registrations_created_at ON internship_registrations(created_at);

-- Update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internship_registrations_updated_at BEFORE UPDATE ON internship_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
