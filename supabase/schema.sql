-- Create internship_requests table
CREATE TABLE IF NOT EXISTS internship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    national_id TEXT NOT NULL,
    field TEXT NOT NULL CHECK (field IN ('Software', 'Networking', 'Data Science', 'Cybersecurity', 'Web Development', 'Mobile Development')),
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Physical')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'failed')),
    registration_status TEXT NOT NULL DEFAULT 'registered' CHECK (registration_status IN ('registered', 'cancelled', 'completed')),
    verification_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_internship_requests_email ON internship_requests(email);
CREATE INDEX IF NOT EXISTS idx_internship_requests_created_at ON internship_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internship_requests_payment_status ON internship_requests(payment_status);

-- Enable Row Level Security
ALTER TABLE internship_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public users can insert their own registration
CREATE POLICY "Users can insert their own registration" ON internship_requests
    FOR INSERT WITH CHECK (true);

-- Service role can read all data (for backend and admin)
CREATE POLICY "Service role can read all registrations" ON internship_requests
    FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

-- Service role can update all data (for backend updates)
CREATE POLICY "Service role can update all registrations" ON internship_requests
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_internship_requests_updated_at 
    BEFORE UPDATE ON internship_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for admin dashboard (read-only)
CREATE OR REPLACE VIEW admin_internship_view AS
SELECT 
    id,
    full_name,
    email,
    phone,
    field,
    mode,
    payment_status,
    registration_status,
    verification_code,
    created_at,
    updated_at
FROM internship_requests
ORDER BY created_at DESC;
