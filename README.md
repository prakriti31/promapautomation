# PromapAutomation

## Overview
PromapAutomation is a full-stack React (Vite) + PHP application featuring:
- Email OTP verification (optional; can be disabled)
- Responsive UI across devices
- “Forgot Password” flow

## Port Mapping
| Port   | Process               | What it serves                                      |
| ------ | --------------------- | --------------------------------------------------- |
| **8888** | `httpd` (Apache/MAMP) | Static Apache root (does **not** know your project) |
| **8000** | `php` (dev-server)    | Your `server/index.php` router ✔                    |

## Getting Started

1. **Start the backend**
   ```bash
   # from the project root
   cd server
   php -S localhost:8000 -t . index.php
   
Start the MAMP server and visit - http://localhost:8888/phpMyAdmin5/index.php?route=/database/structure&db=promapautomation

2. **Start the frontend**
```bash
   cd ../client
   npm run dev
   ```
   
3. **Visit the app at http://localhost:5173 and API at http://localhost:8000.**

### Database 

-- drop first if you are iterating

```DROP TABLE IF EXISTS order_items, orders, email_otps, products, users;```

```CREATE TABLE users (
id            INT AUTO_INCREMENT PRIMARY KEY,
name          VARCHAR(80)  NOT NULL,
email         VARCHAR(120) NOT NULL UNIQUE,
phone         VARCHAR(20)  NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role          ENUM('USER','ADMIN') DEFAULT 'USER',
verified      TINYINT DEFAULT 1,
created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);```

```CREATE TABLE email_otps (
id         INT AUTO_INCREMENT PRIMARY KEY,
email      VARCHAR(120) NOT NULL,
code_hash  VARCHAR(255) NOT NULL,
expires_at DATETIME NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
INDEX (email)
) ENGINE=InnoDB;```

```CREATE TABLE products (
id          INT AUTO_INCREMENT PRIMARY KEY,
category    VARCHAR(60) NOT NULL,
name        VARCHAR(120) NOT NULL,
description TEXT,
price       DECIMAL(10,2) NOT NULL,
photo_url   VARCHAR(255),
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);```

```CREATE TABLE orders (
id         INT AUTO_INCREMENT PRIMARY KEY,
user_id    INT,
total      DECIMAL(10,2),
status     ENUM('PENDING','PAID','SHIPPED','CANCELLED') DEFAULT 'PENDING',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);```

```CREATE TABLE order_items (
id         INT AUTO_INCREMENT PRIMARY KEY,
order_id   INT,
product_id INT,
qty        INT,
price      DECIMAL(10,2),
FOREIGN KEY (order_id)  REFERENCES orders(id)    ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);```
