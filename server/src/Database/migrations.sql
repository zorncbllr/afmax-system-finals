USE afmax_database;

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS paymentMethods;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS productImages;
DROP TABLE IF EXISTS productCategories;
DROP TABLE IF EXISTS cartItems;
DROP TABLE IF EXISTS orderDetails;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;


CREATE TABLE brands (
    brandId INT PRIMARY KEY AUTO_INCREMENT,
    brandName VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    brandId INT NOT NULL,
    isFeatured BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brandId) REFERENCES brands(brandId) ON DELETE RESTRICT
);

CREATE TABLE productImages (
    productImageId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    imagePath VARCHAR(255) NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
);

CREATE TABLE categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE productCategories (
    categoryId INT NOT NULL,
    productId INT NOT NULL,
    PRIMARY KEY (categoryId, productId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId) ON DELETE RESTRICT,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
);

CREATE TABLE units (
    unitId INT PRIMARY KEY AUTO_INCREMENT,
    unitName VARCHAR(100) UNIQUE NOT NULL,
    abbreviation VARCHAR(50)
);

CREATE TABLE inventories (
    inventoryId INT PRIMARY KEY AUTO_INCREMENT,
    unitId INT,
    productId INT NOT NULL,
    quantity INT,
    expiration DATE DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (unitId) REFERENCES units(unitId) ON DELETE RESTRICT,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
    UNIQUE KEY uniqueInventory (unitId, productId)
);

CREATE TABLE users (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  userPhoto VARCHAR(255),
  fullName VARCHAR(80) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  phoneNumber CHAR(11) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  password VARCHAR(255) NOT NULL,
  company VARCHAR(80),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE address (
    addressId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    zipCode INT NOT NULL,
    barangay VARCHAR(120) NOT NULL,
    city VARCHAR(120) NOT NULL,
    street VARCHAR(180) NOT NULL,
    country VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE carts(
    cartId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE cartItems(
    cartItemId INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT NOT NULL,
    productId INT NOT NULL,
    unitId INT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE KEY uniqueCartItem (cartId, productId),
    FOREIGN KEY(cartId) REFERENCES carts(cartId) ON DELETE CASCADE,
    FOREIGN KEY (unitId) REFERENCES units(unitId) ON DELETE CASCADE,
    FOREIGN KEY(productId) REFERENCES products(productId) ON DELETE CASCADE
);


CREATE TABLE orders(
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT NOT NULL,
    amountDue DECIMAL(10, 2) NOT NULL,
    status ENUM('Resolved', 'Pending', 'Canceled') DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cartId) REFERENCES carts(cartId) 
);

CREATE TABLE orderDetails(
    orderDetailId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT NOT NULL,
    unitId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(orderId) ON DELETE CASCADE,
    FOREIGN KEY (unitId) REFERENCES units(unitId) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE RESTRICT 
);

CREATE TABLE transactions(
    transactionId VARCHAR(120) PRIMARY KEY NOT NULL,
    orderId INT NOT NULL,
    paymentId VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (orderId) REFERENCES orders(orderId)
);

CREATE TABLE paymentMethods(
    paymentMethodId INT PRIMARY KEY AUTO_INCREMENT,
    methodName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE payments (
    paymentId INT PRIMARY KEY AUTO_INCREMENT,
    paymentMethodId INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (paymentMethodId) REFERENCES paymentMethods(paymentMethodId)
);


CREATE TABLE invoices(
    invoiceId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT NOT NULL,
    transactionId VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    remarks VARCHAR(100) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(orderId), 
    FOREIGN KEY (transactionId) REFERENCES transactions(transactionId), 
    issuedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);