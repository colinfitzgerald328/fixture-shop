ALTER TABLE orders ADD COLUMN note TEXT CHECK (length(note) <= 280);
