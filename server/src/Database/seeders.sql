USE afmax_database;

-- Brands
INSERT INTO brands (brandName) VALUES
('3M'), ('BD'), ('Philips'), ('Omron'), ('GE Healthcare'),
('Medtronic'), ('Medline'), ('Fresenius'), ('Dräger'), ('Halyard');

-- Categories
INSERT INTO categories (categoryName) VALUES
('Infection Control'),
('Diabetes Management'),
('Maternal Health'),
('Emergency Care'),
('Diagnostic Imaging'),
('Respiratory Therapy'),
('Wound Care'),
('Surgical Supplies'),
('Home Healthcare'),
('Orthopedic Support');

-- Products
INSERT INTO products (productName, description, price, brandId, isFeatured) VALUES
('N95 Respirator Mask', 'NIOSH-certified particulate filter', 120.00, 1, 1),
('Insulin Pump Supplies', 'Disposable infusion sets', 2990.00, 2, 1),
('Portable Fetal Doppler', 'Handheld baby heartbeat monitor', 8999.00, 4, 0),
('Nebulizer Machine', 'Compressor nebulizer for asthma', 4599.00, 4, 1),
('Hemostatic Dressing', 'Emergency trauma wound dressing', 2450.00, 7, 1),
('Cervical Collar', 'Adjustable neck brace', 1899.00, 9, 1),
('Electric Breast Pump', 'Hospital-grade double pump', 21999.00, 8, 1);

-- Product Images (2-3 per product)
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'https://m.media-amazon.com/images/I/71gHY9gAqkL._AC_SL1500_.jpg'),
(1, 'https://www.3m.com/3M/en_US/p/d/v000147847/'),
(2, 'https://www.medtronic.com/content/dam/medtronic-com/global/images/products/diabetes/MMT-399a.png'),
(2, 'https://www.diabetesnet.com/wp-content/uploads/2021/08/medtronic-infusion-set.jpg'),
(3, 'https://www.contecmed.com/UploadFiles/P_20200821143505715.jpg'),
(3, 'https://www.medicalexpo.com/prod/edan-instruments/image-214848-10256561.jpg'),
(4, 'https://www.omronhealthcare-ap.com/wp-content/uploads/2020/09/NE-C801-compressor-nebulizer-1.png'),
(4, 'https://www.medescan.com.au/cdn/shop/products/nebuliser_compressor_nebulizer_machine_medescan_1.jpg'),
(5, 'https://www.teleflex.com/usa/en/product-areas/narescue/images/narescue-hemostatic-dressing.jpg'),
(5, 'https://m.media-amazon.com/images/I/81xZ7HmyZ-L._AC_SL1500_.jpg'),
(6, 'https://www.emed.com/cdn/shop/products/AmbuPerfitACE_1024x1024.jpg'),
(6, 'https://www.orthomed.co.uk/wp-content/uploads/2020/10/Ambu-Perfit-Ace-Cervical-Collar.jpg'),
(7, 'https://www.spectrababy.com/cdn/shop/products/spectra-s1-plus-hospital-grade-breast-pump-268415.jpg'),
(7, 'https://images.ctfassets.net/6m9bd13t776q/6Uy1H2jXqYkH3C8sDdC4hT/5b64f2a0b0c4d3a0a8a0d4a4d4b4a4d4/spectra-s1-plus-hospital-grade-breast-pump.png');

-- Category Assignments (1-3 per product)
INSERT INTO productCategories (categoryId, productId) VALUES
/* N95 Mask */         (1,1), (4,1),
/* Insulin Supplies */ (2,2), (9,2),
/* Fetal Doppler */    (3,3), (5,3), (4,3),
/* Nebulizer */        (6,4), (9,4),
/* Hemostatic Dressing */ (7,5), (4,5),
/* Cervical Collar */  (10,6), (4,6),
/* Breast Pump */      (3,7), (9,7);