-- Insert admin user if it doesn't exist
INSERT INTO admin_users (email)
SELECT 'admin@gmail.com'
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@gmail.com'
);
