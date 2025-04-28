USE afmax_database;

-- Insert mock brands
INSERT INTO brands (brandName) VALUES 
('MediTech Solutions'),
('HealthFirst Supplies'),
('CarePlus Medical'),
('VitaMed Essentials');

-- Insert mock products
INSERT INTO products (productName, description, price, brandId) VALUES
('Digital Blood Pressure Monitor', 'Accurate and easy-to-use digital blood pressure monitor.', 59.99, 1),
('Sterile Surgical Gloves', 'High-quality sterile gloves for surgical procedures.', 19.99, 2),
('3-Ply Disposable Face Masks', 'Comfortable and breathable disposable masks.', 14.99, 2),
('Infrared Thermometer', 'Non-contact infrared thermometer for quick readings.', 39.99, 1),
('Wheelchair Standard Model', 'Durable and lightweight wheelchair.', 249.99, 3),
('First Aid Kit - 100 Pieces', 'Comprehensive first aid kit for emergencies.', 34.99, 4);

-- Insert mock product images
INSERT INTO productImages (productId, imagePath) VALUES
(1, '/images/products/bp_monitor_1.jpg'),
(1, '/images/products/bp_monitor_2.jpg'),
(2, '/images/products/surgical_gloves.jpg'),
(3, '/images/products/face_masks.jpg'),
(4, '/images/products/infrared_thermometer.jpg'),
(5, '/images/products/wheelchair.jpg'),
(6, '/images/products/first_aid_kit.jpg');
