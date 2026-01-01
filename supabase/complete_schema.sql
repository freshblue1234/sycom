-- Complete Database Schema for Sycom Industry Internship System

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Internship Requests Table (Enhanced)
CREATE TABLE IF NOT EXISTS internship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    national_id TEXT NOT NULL,
    field TEXT NOT NULL CHECK (field IN ('Software', 'Networking', 'Data Science', 'Cybersecurity', 'Web Development', 'Mobile Development')),
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Physical')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'failed', 'refunded')),
    registration_status TEXT NOT NULL DEFAULT 'registered' CHECK (registration_status IN ('registered', 'cancelled', 'completed', 'suspended')),
    verification_code TEXT,
    payment_reference TEXT,
    payment_amount DECIMAL(10, 2) DEFAULT 25000.00,
    payment_method TEXT,
    transaction_id TEXT,
    notes TEXT,
    admin_reviewed_by UUID REFERENCES admin_users(id),
    admin_reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Admin Sessions Table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. System Logs Table
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES admin_users(id),
    action TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Payment Transactions Table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID NOT NULL REFERENCES internship_requests(id),
    transaction_reference TEXT UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'RWF',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed', 'cancelled')),
    payment_method TEXT,
    gateway_response JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_internship_requests_email ON internship_requests(email);
CREATE INDEX IF NOT EXISTS idx_internship_requests_created_at ON internship_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internship_requests_payment_status ON internship_requests(payment_status);
CREATE INDEX IF NOT EXISTS idx_internship_requests_registration_status ON internship_requests(registration_status);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_reference ON payment_transactions(transaction_reference);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Admin Users
CREATE POLICY "Admin users can view their own profile" ON admin_users
    FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = id::text);

CREATE POLICY "Service role full access to admin users" ON admin_users
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Internship Requests
CREATE POLICY "Public users can insert their own registration" ON internship_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can read all registrations" ON internship_requests
    FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can update all registrations" ON internship_requests
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can delete registrations" ON internship_requests
    FOR DELETE USING (auth.jwt() ->> 'role' = 'service_role');

-- Block public access to registration data
CREATE POLICY "Block public read access to registrations" ON internship_requests
    FOR SELECT USING (false);

CREATE POLICY "Block public update access to registrations" ON internship_requests
    FOR UPDATE USING (false);

CREATE POLICY "Block public delete access to registrations" ON internship_requests
    FOR DELETE USING (false);

-- RLS Policies for Admin Sessions
CREATE POLICY "Service role full access to admin sessions" ON admin_sessions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for System Logs
CREATE POLICY "Service role full access to system logs" ON system_logs
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for Payment Transactions
CREATE POLICY "Service role full access to payment transactions" ON payment_transactions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Functions and Triggers

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internship_requests_updated_at 
    BEFORE UPDATE ON internship_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to log system changes
CREATE OR REPLACE FUNCTION log_system_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO system_logs (action, table_name, record_id, new_values)
        VALUES (TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO system_logs (action, table_name, record_id, old_values, new_values)
        VALUES (TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO system_logs (action, table_name, record_id, old_values)
        VALUES (TG_OP, TG_TABLE_NAME, OLD.id, row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Triggers for system logging
CREATE TRIGGER log_internship_requests_changes
    AFTER INSERT OR UPDATE OR DELETE ON internship_requests
    FOR EACH ROW EXECUTE FUNCTION log_system_changes();

CREATE TRIGGER log_admin_users_changes
    AFTER INSERT OR UPDATE OR DELETE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION log_system_changes();

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM admin_sessions WHERE expires_at < NOW();
END;
$$ language 'plpgsql';

-- Views for Admin Dashboard
CREATE OR REPLACE VIEW admin_internship_summary AS
SELECT 
    COUNT(*) as total_registrations,
    COUNT(*) FILTER (WHERE payment_status = 'paid') as paid_registrations,
    COUNT(*) FILTER (WHERE payment_status = 'unpaid') as unpaid_registrations,
    COUNT(*) FILTER (WHERE payment_status = 'failed') as failed_registrations,
    SUM(payment_amount) FILTER (WHERE payment_status = 'paid') as total_revenue,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_registrations,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_registrations,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as month_registrations
FROM internship_requests;

CREATE OR REPLACE VIEW admin_field_statistics AS
SELECT 
    field,
    COUNT(*) as total_registrations,
    COUNT(*) FILTER (WHERE payment_status = 'paid') as paid_registrations,
    ROUND(COUNT(*) FILTER (WHERE payment_status = 'paid') * 100.0 / COUNT(*), 2) as conversion_rate
FROM internship_requests
GROUP BY field
ORDER BY total_registrations DESC;

CREATE OR REPLACE VIEW admin_mode_statistics AS
SELECT 
    mode,
    COUNT(*) as total_registrations,
    COUNT(*) FILTER (WHERE payment_status = 'paid') as paid_registrations,
    ROUND(COUNT(*) FILTER (WHERE payment_status = 'paid') * 100.0 / COUNT(*), 2) as conversion_rate
FROM internship_requests
GROUP BY mode
ORDER BY total_registrations DESC;

-- Insert default admin user (password: admin123)
-- Hash will be created in the backend application
INSERT INTO admin_users (username, email, full_name, role) 
VALUES ('admin', 'admin@sycomindustry.com', 'System Administrator', 'super_admin')
ON CONFLICT (email) DO NOTHING;
