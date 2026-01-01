import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

const supabase = createClient(
  'https://qjtakzpspgpkndeiabre.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdGFrenBzcGdwa25kZWlhYnJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzE4MjQxMSwiZXhwIjoyMDgyNzU4NDExfQ.hJSeqJQwTwLAqXlwOPy2_KOWiEtR2A_GJUWvikH_FZg'
);

async function createAdmin() {
  try {
    console.log('Checking if admin user exists...');
    
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', 'admin@sycomindustry.com')
      .single();

    if (!existingAdmin) {
      console.log('Creating admin user...');
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
      } else {
        console.error('Error creating admin:', error);
      }
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdmin();
