-- Insert categories
INSERT INTO categories (name, description) VALUES
('Appetizers', 'Start your meal with these delicious starters'),
('Main Courses', 'Hearty and flavorful main dishes'),
('Breads', 'Traditional Indian breads'),
('Rice Dishes', 'Aromatic rice specialties'),
('Desserts', 'Sweet treats to end your meal');

-- Insert menu items
INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Samosa', 
  'Crispy pastry filled with spiced potatoes and peas', 
  5.99, 
  TRUE, 
  FALSE, 
  TRUE, 
  (SELECT id FROM categories WHERE name = 'Appetizers'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Samosa');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Chicken Tikka', 
  'Tender chicken pieces marinated in spices and yogurt, grilled to perfection', 
  12.99, 
  FALSE, 
  TRUE, 
  TRUE, 
  (SELECT id FROM categories WHERE name = 'Appetizers'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Chicken Tikka');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Butter Chicken', 
  'Tender chicken cooked in a rich, creamy tomato sauce', 
  16.99, 
  FALSE, 
  FALSE, 
  TRUE, 
  (SELECT id FROM categories WHERE name = 'Main Courses'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Butter Chicken');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Paneer Tikka Masala', 
  'Cottage cheese cubes in a spiced tomato gravy', 
  14.99, 
  TRUE, 
  TRUE, 
  FALSE, 
  (SELECT id FROM categories WHERE name = 'Main Courses'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Paneer Tikka Masala');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Naan', 
  'Traditional leavened bread baked in tandoor', 
  2.99, 
  TRUE, 
  FALSE, 
  FALSE, 
  (SELECT id FROM categories WHERE name = 'Breads'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Naan');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Biryani', 
  'Fragrant basmati rice cooked with spices and your choice of protein', 
  17.99, 
  FALSE, 
  TRUE, 
  TRUE, 
  (SELECT id FROM categories WHERE name = 'Rice Dishes'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Biryani');

INSERT INTO menu_items (name, description, price, is_vegetarian, is_spicy, is_featured, category_id, image_url)
SELECT 
  'Gulab Jamun', 
  'Sweet milk dumplings soaked in rose-flavored syrup', 
  5.99, 
  TRUE, 
  FALSE, 
  FALSE, 
  (SELECT id FROM categories WHERE name = 'Desserts'),
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Gulab Jamun');

-- Insert offers
INSERT INTO offers (title, description, discount_percentage, start_date, end_date, is_active, image_url)
SELECT 
  'Weekend Special', 
  'Enjoy 15% off on all main courses every weekend', 
  15, 
  CURRENT_DATE, 
  CURRENT_DATE + INTERVAL '30 days', 
  TRUE,
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM offers WHERE title = 'Weekend Special');

INSERT INTO offers (title, description, discount_amount, start_date, end_date, is_active, image_url)
SELECT 
  'Family Feast', 
  'Order above $50 and get $10 off', 
  10, 
  CURRENT_DATE - INTERVAL '10 days', 
  CURRENT_DATE + INTERVAL '20 days', 
  TRUE,
  '/placeholder.svg?height=300&width=400'
WHERE NOT EXISTS (SELECT 1 FROM offers WHERE title = 'Family Feast');

-- Insert reviews
INSERT INTO reviews (customer_name, rating, comment, is_featured, review_date)
SELECT 
  'John Smith', 
  5, 
  'The best Indian food I have ever had! The butter chicken was amazing.', 
  TRUE, 
  CURRENT_DATE - INTERVAL '5 days'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE customer_name = 'John Smith');

INSERT INTO reviews (customer_name, rating, comment, is_featured, review_date)
SELECT 
  'Sarah Johnson', 
  4, 
  'Great flavors and excellent service. Will definitely come back!', 
  TRUE, 
  CURRENT_DATE - INTERVAL '10 days'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE customer_name = 'Sarah Johnson');

INSERT INTO reviews (customer_name, rating, comment, is_featured, review_date)
SELECT 
  'Michael Brown', 
  5, 
  'Authentic Indian cuisine at its best. The biryani is a must-try!', 
  TRUE, 
  CURRENT_DATE - INTERVAL '15 days'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE customer_name = 'Michael Brown');

-- Insert admin user if it doesn't exist
INSERT INTO admin_users (email)
SELECT 'admin@gmail.com'
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@gmail.com'
);
