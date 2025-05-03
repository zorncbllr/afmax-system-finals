USE afmax_database;

-- Insert brands
INSERT INTO brands (brandName) VALUES 
('MedEquip'),
('HealthTech'),
('BioScan'),
('SterilSafe'),
('ThermoMed');

-- Insert categories
INSERT INTO categories (categoryName) VALUES
('Diagnostics'),
('Imaging'),
('Surgical'),
('Sterilization'),
('Monitoring'),
('Therapy');

-- Insert products
INSERT INTO products (productName, description, price, brandId, isFeatured) VALUES
('X-Ray Machine', 'High-performance X-ray imaging device.', 12000.00, 1, true),
('MRI Scanner', 'Advanced MRI machine with 3T magnet.', 95000.00, 1, true),
('Ultrasound Device', 'Portable and high-resolution ultrasound machine.', 15000.00, 2, false),
('Sterilizer Unit', 'Fast-cycle steam sterilizer for instruments.', 7000.00, 4, false),
('Heart Monitor', 'Continuous patient monitoring system.', 4000.00, 5, true),
('Therapy Chair', 'Reclining chair for physical therapy sessions.', 3000.00, 5, false),
('Surgical Lamp', 'Shadowless surgical light with adjustable intensity.', 2000.00, 3, true),
('CT Scanner', '128-slice CT scanner for full-body diagnostics.', 85000.00, 2, false),
('Defibrillator', 'Compact defibrillator with AED function.', 5000.00, 3, false),
('IV Pump', 'Automated infusion system with precision controls.', 2500.00, 4, false);

-- Insert product images
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'images/products/xray-machine-front.jpg'),
(1, 'images/products/xray-machine-side.jpg'),
(2, 'images/products/mri-scanner-front.jpg'),
(2, 'images/products/mri-controls.jpg'),
(2, 'images/products/mri-room-view.jpg'),
(3, 'images/products/ultrasound-device.jpg'),
(4, 'images/products/sterilizer-unit.jpg'),
(5, 'images/products/heart-monitor.jpg'),
(6, 'images/products/therapy-chair.jpg'),
(7, 'images/products/surgical-lamp.jpg'),
(8, 'images/products/ct-scanner.jpg'),
(9, 'images/products/defibrillator.jpg'),
(10, 'images/products/iv-pump.jpg');

-- Assign product categories
INSERT INTO productCategories (categoryId, productId) VALUES
(1, 1), -- X-Ray → Diagnostics
(2, 1), -- X-Ray → Imaging
(1, 2), -- MRI → Diagnostics
(2, 2), -- MRI → Imaging
(2, 3), -- Ultrasound → Imaging
(1, 3), -- Ultrasound → Diagnostics
(4, 4), -- Sterilizer → Sterilization
(5, 5), -- Monitor → Monitoring
(6, 6), -- Chair → Therapy
(3, 7), -- Lamp → Surgical
(2, 8), -- CT → Imaging
(1, 8), -- CT → Diagnostics
(1, 9), -- Defib → Diagnostics
(5, 9), -- Defib → Monitoring
(5, 10); -- IV Pump → Monitoring
