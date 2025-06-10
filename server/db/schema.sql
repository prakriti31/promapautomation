-- ------------------------------------------------------------------
--   Users
-- ------------------------------------------------------------------
CREATE TABLE users (
                       id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                       name            VARCHAR(80)  NOT NULL,
                       email           VARCHAR(120) NOT NULL UNIQUE,
                       phone           VARCHAR(20)  NOT NULL,
                       password_hash   VARCHAR(255) NOT NULL,
                       role            ENUM('USER','ADMIN') DEFAULT 'USER',
                       verified        TINYINT(1)   DEFAULT 0,
                       created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
                       updated_at      TIMESTAMP    NULL ON UPDATE CURRENT_TIMESTAMP,

                       INDEX idx_users_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--   Products
-- ------------------------------------------------------------------
CREATE TABLE products (
                          id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          category      VARCHAR(60)  NOT NULL,
                          subcategory   VARCHAR(60)  NULL,                      -- new
                          name          VARCHAR(120) NOT NULL,
                          description   TEXT         NULL,
                          price         DECIMAL(10,2) UNSIGNED NOT NULL,
                          photo_url     VARCHAR(255) NULL,
                          created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
                          updated_at    TIMESTAMP    NULL ON UPDATE CURRENT_TIMESTAMP,

                          INDEX idx_products_cat_sub (category, subcategory)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--   Orders (header)
-- ------------------------------------------------------------------
CREATE TABLE orders (
                        id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        user_id    INT UNSIGNED NULL,
                        total      DECIMAL(10,2) UNSIGNED,
                        status     ENUM('PENDING','PAID','SHIPPED','CANCELLED') DEFAULT 'PENDING',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

                        CONSTRAINT fk_orders_user
                            FOREIGN KEY (user_id) REFERENCES users(id)
                                ON DELETE SET NULL
                                ON UPDATE CASCADE,

                        INDEX idx_orders_user (user_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--   Order items (detail)
-- ------------------------------------------------------------------
CREATE TABLE order_items (
                             id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             order_id   INT UNSIGNED NOT NULL,
                             product_id INT UNSIGNED NOT NULL,
                             qty        INT UNSIGNED NOT NULL DEFAULT 1,
                             price      DECIMAL(10,2) UNSIGNED NOT NULL,  -- snapshot of unit price
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

                             CONSTRAINT fk_order_items_order
                                 FOREIGN KEY (order_id)  REFERENCES orders(id)
                                     ON DELETE CASCADE
                                     ON UPDATE CASCADE,
                             CONSTRAINT fk_order_items_product
                                 FOREIGN KEY (product_id) REFERENCES products(id)
                                     ON DELETE CASCADE
                                     ON UPDATE CASCADE,

                             INDEX idx_order_items_order (order_id),
                             INDEX idx_order_items_product (product_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--   Email OTPs
-- ------------------------------------------------------------------
CREATE TABLE email_otps (
                            id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                            email      VARCHAR(120) NOT NULL,
                            code_hash  VARCHAR(255) NOT NULL,
                            expires_at DATETIME     NOT NULL,
                            created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

                            INDEX idx_email_otps_email (email),
                            INDEX idx_email_otps_exp  (expires_at)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
