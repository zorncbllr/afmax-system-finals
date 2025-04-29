USE afmax_database;

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

-- Insert productImages
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'images/products/xray-machine.jpg'),
(2, 'images/products/mri-scanner.jpg'),
(3, 'images/products/scalpel-set.jpg'),
(4, 'images/products/surgical-gloves.jpg'),
(5, 'images/products/autoclave-unit.jpg'),
(6, 'images/products/knee-brace.jpg'),
(7, 'images/products/face-shield.jpg'),
(8, 'images/products/bone-saw.jpg');

-- Insert productCategories (many-to-many)
INSERT INTO productCategories (categoryId, productId) VALUES
(1, 1), -- X-Ray Machine → Diagnostics
(1, 2), -- MRI Scanner → Diagnostics
(2, 3), -- Scalpel Set → Surgical Instruments
(2, 8), -- Bone Saw → Surgical Instruments
(3, 4), -- Surgical Gloves → Protective Equipment
(3, 7), -- Face Shield → Protective Equipment
(4, 5), -- Autoclave Unit → Sterilization
(5, 6), -- Knee Brace → Orthopedic Supplies
(5, 8); -- Bone Saw → Orthopedic Supplies
