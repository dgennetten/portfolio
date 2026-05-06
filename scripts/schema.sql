-- Run against kdg_portfolio on mysql.gennetten.com
-- mysql -u dgennetten -p -h mysql.gennetten.com kdg_portfolio < scripts/schema.sql

CREATE TABLE IF NOT EXISTS artworks (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(500)  NOT NULL,
  media          VARCHAR(500)  DEFAULT NULL,
  description    TEXT          DEFAULT NULL,
  image_src      VARCHAR(1000) NOT NULL,
  category       ENUM(
                   'drawings','paintings','sculptures','prints','geometric',
                   'design','photography','code',
                   'WIPdrawings','WIPsculptures','WIPkinetics','WIPprints'
                 ) NOT NULL,
  display_order  INT           DEFAULT 0,
  is_featured    TINYINT(1)    DEFAULT 0,
  featured_order INT           DEFAULT NULL,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category        (category, display_order),
  INDEX idx_featured        (is_featured, featured_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin authentication tables

CREATE TABLE IF NOT EXISTS admins (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL,
  role       ENUM('admin','superadmin') NOT NULL DEFAULT 'admin',
  is_active  TINYINT(1)   NOT NULL DEFAULT 1,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS auth_sessions (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id   INT UNSIGNED NOT NULL,
  token      CHAR(64)     NOT NULL,
  expires_at DATETIME     NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_token (token),
  CONSTRAINT fk_session_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS otp_codes (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(64)  NOT NULL,
  code       CHAR(6)      NOT NULL,
  expires_at DATETIME     NOT NULL,
  used       TINYINT(1)   NOT NULL DEFAULT 0,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lookup  (email, code),
  INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial superadmin (idempotent)
INSERT IGNORE INTO admins (email, role) VALUES ('douglas@gennetten.com', 'superadmin');
