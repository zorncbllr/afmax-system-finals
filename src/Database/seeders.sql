USE afmax_database;

-- Insert brands
INSERT INTO brands (brandName) VALUES
('MedEquip'),
('HealthPlus'),
('SafeTech'),
('SterilPro'),
('OrthoGen');

-- Insert categories
INSERT INTO categories (categoryName) VALUES
('Diagnostics'),
('Surgical Instruments'),
('Protective Equipment'),
('Sterilization'),
('Orthopedic Supplies');

-- Insert products
INSERT INTO products (productName, description, price, brandId) VALUES
('X-Ray Machine', 'High-definition digital x-ray machine.', 12000.00, 1),
('MRI Scanner', 'Advanced MRI machine with 3T magnet.', 95000.00, 1),
('Scalpel Set', 'Stainless steel scalpel set.', 450.00, 2),
('Surgical Gloves', 'Latex-free disposable gloves.', 25.00, 3),
('Autoclave Unit', 'Sterilization device for medical tools.', 3800.00, 4),
('Knee Brace', 'Adjustable orthopedic knee brace.', 120.00, 5),
('Face Shield', 'Anti-fog full-face shield.', 15.99, 3),
('Bone Saw', 'Electric bone saw for orthopedic surgeries.', 750.00, 5);

-- Insert productImages (2–3 images per product)
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'images/products/xray-machine-front.jpg'),
(1, 'images/products/xray-machine-side.jpg'),
(2, 'images/products/mri-scanner-front.jpg'),
(2, 'images/products/mri-room-view.jpg'),
(2, 'images/products/mri-controls.jpg'),
(3, 'images/products/scalpel-set.jpg'),
(3, 'images/products/scalpel-detail.jpg'),
(4, 'images/products/gloves-box.jpg'),
(5, 'images/products/autoclave.jpg'),
(5, 'images/products/autoclave-back.jpg'),
(6, 'images/products/knee-brace.jpg'),
(6, 'images/products/knee-brace-demo.jpg'),
(7, 'images/products/face-shield.jpg'),
(8, 'images/products/bone-saw.jpg'),
(8, 'images/products/bone-saw-blades.jpg'),
(8, 'images/products/bone-saw-kit.jpg');

-- Insert productCategories (1–3 categories per product)
INSERT INTO productCategories (categoryId, productId) VALUES
-- X-Ray Machine
(1, 1),
(2, 1),
-- MRI Scanner
(1, 2),
(4, 2),
-- Scalpel Set
(2, 3),
-- Surgical Gloves
(3, 4),
(4, 4),
-- Autoclave Unit
(4, 5),
(2, 5),
-- Knee Brace
(5, 6),
(2, 6),
-- Face Shield
(3, 7),
-- Bone Saw
(2, 8),
(5, 8),
(4, 8);
