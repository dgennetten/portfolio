-- Site settings table
-- Run: mysql -u dgennetten -p -h mysql.gennetten.com kdg_portfolio < scripts/settings_schema.sql

CREATE TABLE IF NOT EXISTS site_settings (
  `key`      VARCHAR(100) NOT NULL PRIMARY KEY,
  `value`    TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO site_settings (`key`, `value`)
VALUES ('hero_image', '/images/Paintings/Car25.jpg');
