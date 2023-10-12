CREATE DATABASE magazines_subscription;
USE magazines_subscription;

CREATE TABLE magazines (
  id integer PRIMARY KEY AUTO_INCREMENT,
  is_deleted BIT NOT NULL DEFAULT 0,
  is_subscribed BIT NOT NULL DEFAULT 0
);
