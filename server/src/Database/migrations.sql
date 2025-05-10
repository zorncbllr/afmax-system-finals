USE afmax_database;

DROP TABLE IF EXISTS productImages;
DROP TABLE IF EXISTS productCategories;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;


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
    unitName VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(50)
);

CREATE TABLE inventories (
    inventoryId INT PRIMARY KEY AUTO_INCREMENT,
    unitId INT,
    productId INT NOT NULL,
    quantity INT,
    expiration DATETIME DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (unitId) REFERENCES units(unitId),
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
);