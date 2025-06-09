-- Add explicit foreign key constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'menu_items_category_id_fkey'
  ) THEN
    ALTER TABLE menu_items 
    ADD CONSTRAINT menu_items_category_id_fkey 
    FOREIGN KEY (category_id) REFERENCES categories(id);
  END IF;
END $$;
