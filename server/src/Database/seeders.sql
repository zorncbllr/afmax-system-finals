USE afmax_database;
-- Seed brands
INSERT INTO brands (brandName) VALUES
('MediGlove'),
('HealthPro'),
('SafeCare');

-- Seed products
INSERT INTO products (productName, description, price, brandId, isFeatured) VALUES
('Latex Gloves', 'High-quality disposable latex gloves', 12.99, 1, true),
('Nitrile Gloves', 'Powder-free nitrile gloves', 15.50, 2, false),
('Vinyl Gloves', 'Durable and affordable vinyl gloves', 10.75, 3, false);

-- Seed product images
INSERT INTO productImages (productId, imagePath) VALUES
(1, 'images/products/latex-gloves.jpg'),
(2, 'images/products/nitrile-gloves.jpg'),
(3, 'images/products/vinyl-gloves.jpg');

-- Seed categories
INSERT INTO categories (categoryName) VALUES
('Gloves'),
('Disposable Supplies'),
('Medical Equipment');

-- Seed product categories
INSERT INTO productCategories (categoryId, productId) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3);

-- Seed units
INSERT INTO units (unitName, abbreviation) VALUES
('Box', 'bx'),
('Piece', 'pc'),
('Pack', 'pk');

-- Seed inventories
INSERT INTO inventories (unitId, productId, quantity, expiration) VALUES
(1, 1, 100, '2026-12-31'),
(1, 2, 80, '2026-06-30'),
(1, 3, 120, NULL);

-- Seed users
INSERT INTO users (userPhoto, fullName, email, phoneNumber, isAdmin, password, company) VALUES
(NULL, 'John Doe', 'john@example.com', '09123456789', true, 'hashedpassword1', 'Afmax Medical'),
(NULL, 'Jane Smith', 'jane@example.com', '09987654321', false, 'hashedpassword2', 'SafeMed Supplies');

-- Seed address
INSERT INTO address (userId, zipCode, barangay, city, street, country) VALUES
(1, 1000, 'Barangay 1', 'Manila', '123 Rizal St.', 'Philippines'),
(2, 1100, 'Barangay 2', 'Quezon City', '456 Luna Ave.', 'Philippines');

-- Seed carts
INSERT INTO carts (userId) VALUES
(1),
(2);

-- Seed cart items
INSERT INTO cartItems (cartId, productId, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 5);

-- Seed orders
INSERT INTO orders (cartId) VALUES
(1),
(2);

-- Seed order details
INSERT INTO orderDetails (orderId, productId, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 5);
