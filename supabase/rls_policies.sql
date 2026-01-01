-- Row Level Security Policies for internship_requests table

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own registration" ON internship_requests;
DROP POLICY IF EXISTS "Service role can read all registrations" ON internship_requests;
DROP POLICY IF EXISTS "Service role can update all registrations" ON internship_requests;

-- Create new policies

-- 1. Public users can insert their own registration (no authentication required for registration)
CREATE POLICY "Users can insert their own registration" ON internship_requests
    FOR INSERT WITH CHECK (true);

-- 2. Service role can read all registrations (for backend and admin dashboard)
CREATE POLICY "Service role can read all registrations" ON internship_requests
    FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

-- 3. Service role can update all registrations (for payment status updates)
CREATE POLICY "Service role can update all registrations" ON internship_requests
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

-- 4. Service role can delete registrations (if needed for admin)
CREATE POLICY "Service role can delete registrations" ON internship_requests
    FOR DELETE USING (auth.jwt() ->> 'role' = 'service_role');

-- Additional security: Prevent public users from reading any data
CREATE POLICY "Block public read access" ON internship_requests
    FOR SELECT USING (false);

-- Additional security: Prevent public users from updating data
CREATE POLICY "Block public update access" ON internship_requests
    FOR UPDATE USING (false);

-- Additional security: Prevent public users from deleting data
CREATE POLICY "Block public delete access" ON internship_requests
    FOR DELETE USING (false);
