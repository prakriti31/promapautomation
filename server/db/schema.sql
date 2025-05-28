CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(80) NOT NULL,
                       email VARCHAR(120) NOT NULL UNIQUE,
                       phone VARCHAR(20) NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       role ENUM('USER','ADMIN') DEFAULT 'USER',
                       verified TINYINT DEFAULT 0,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          category VARCHAR(60) NOT NULL,
                          name VARCHAR(120) NOT NULL,
                          description TEXT,
                          price DECIMAL(10,2) NOT NULL,
                          photo_url VARCHAR(255),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        user_id INT,
                        total DECIMAL(10,2),
                        status ENUM('PENDING','PAID','SHIPPED','CANCELLED') DEFAULT 'PENDING',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE order_items (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             order_id INT,
                             product_id INT,
                             qty INT,
                             price DECIMAL(10,2),
                             FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                             FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- OTP table for email verification
CREATE TABLE IF NOT EXISTS email_otps (
                                          id           INT AUTO_INCREMENT PRIMARY KEY,
                                          email        VARCHAR(120) NOT NULL,
                                          code_hash    VARCHAR(255) NOT NULL,
                                          expires_at   DATETIME NOT NULL,
                                          created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

