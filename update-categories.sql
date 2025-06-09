-- Update existing categories to match the new naming scheme
-- This script will update the category names and descriptions

-- Update Main Courses to NonVeg Specials
UPDATE categories 
SET name = 'NonVeg Specials', 
    description = 'Rich, aromatic curries and non-vegetarian specialties'
WHERE name = 'Main Courses';

-- Update Breads to Tandoori Breads
UPDATE categories 
SET name = 'Tandoori Breads', 
    description = 'Traditional breads and tandoori specialties from our clay oven'
WHERE name = 'Breads';

-- Add new Vegetable Delight category if it doesn't exist
INSERT INTO categories (name, description) 
SELECT 'Vegetable Delight', 'Flavorful vegetarian dishes showcasing the diversity of Indian cuisine'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Vegetable Delight');

-- Move vegetarian items from Main Courses to Vegetable Delight
UPDATE menu_items 
SET category_id = (SELECT id FROM categories WHERE name = 'Vegetable Delight')
WHERE is_vegetarian = TRUE 
  AND category_id = (SELECT id FROM categories WHERE name = 'NonVeg Specials');
