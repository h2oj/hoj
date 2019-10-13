--- INIT SQL
CREATE DATABASE IF NOT EXISTS scoj;
USE scoj;
CREATE TABLE IF NOT EXISTS user_account (
    uid INT UNSIGNED,
    username VARCHAR(20),
    password CHAR(32),
    reg_time DATETIME,
    last_login DATETIME
);
CREATE TABLE IF NOT EXISTS user_info (
    uid INT UNSIGNED,
    nickname VARCHAR(20),
    avatar VARCHAR(256),
    sex TINYINT,
    tag VARCHAR(64)
);
INSERT INTO user_account (uid, username, password, reg_time, last_login)
    VALUE (0, 'admin', MD5(CONCAT('admin', '7f98d27ca899ae9c')), NOW(), NOW());
INSERT INTO user_info (uid, nickname, avatar, sex, tag)
    VALUE (0, 'admin', '', 1, 'admin');
