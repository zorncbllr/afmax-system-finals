USE afmax_database;

-- Insert Medical Brands
INSERT INTO brands (brandName) VALUES
('Johnson & Johnson'),
('Pfizer'),
('Bayer'),
('Medtronic'),
('Roche Diagnostics');

-- Insert Medical Categories
INSERT INTO categories (categoryName) VALUES
('Pharmaceuticals'),
('Medical Equipment'),
('First Aid'),
('Surgical Supplies'),
('Diagnostic Tools');

-- Insert Medical Products
INSERT INTO products (productName, description, price, brandId, isFeatured) VALUES
('Ibuprofen Tablets 200mg', 'NSAID pain reliever, 100 tablets', 8.99, 1, true),
('Digital Thermometer', 'Instant oral/axillary reading', 14.99, 4, true),
('Disposable Nitrile Gloves', 'Powder-free, large size (100 count)', 12.50, 1, false),
('Portable Oxygen Concentrator', 'Lightweight 5L oxygen therapy', 1499.99, 4, true),
('COVID-19 Rapid Test Kit', '15-minute antigen test (25 pack)', 89.99, 5, false);

-- Link Products to Categories
INSERT INTO productCategories (categoryId, productId) VALUES
(1, 1),  -- Ibuprofen -> Pharmaceuticals
(3, 1),  -- Ibuprofen -> First Aid
(2, 2),  -- Thermometer -> Medical Equipment
(3, 2),  -- Thermometer -> First Aid
(3, 3),  -- Gloves -> First Aid
(4, 3),  -- Gloves -> Surgical Supplies
(2, 4),  -- Oxygen Concentrator -> Medical Equipment
(5, 5);  -- Test Kit -> Diagnostic Tools

-- Insert Product Images
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'images/ibuprofen.jpg'),
(2, 'images/thermometer.jpg'),
(3, 'images/gloves.jpg'),
(4, 'images/oxygen-concentrator.jpg'),
(5, 'images/covid-test.jpg');

-- Insert Medical Units
INSERT INTO units (unitName, abbreviation) VALUES
('Tablets', 'tabs'),
('Milliliters', 'ml'),
('Boxes', 'bx'),
('Pairs', 'pr'),
('Units', 'unt');

-- Insert Inventory Data
INSERT INTO inventories (inventoryId, unitId, productId, quantity, expiration) VALUES
(1, 1, 1, 1000, '2025-12-31'),  -- Ibuprofen tablets
(2, 5, 2, 150, NULL),           -- Thermometers
(3, 3, 3, 500, '2026-06-30'),    -- Gloves boxes
(4, 5, 4, 25, NULL),             -- Oxygen concentrators
(5, 3, 5, 80, '2024-09-30');     -- Test kits