-- create and init database and table
CREATE DATABASE IF NOT EXISTS scoj;
USE scoj;
CREATE TABLE IF NOT EXISTS user_account (
    uid INT UNSIGNED PRIMARY KEY,
    username VARCHAR(20),
    password CHAR(32),
    reg_time DATETIME,
    last_login DATETIME
);
CREATE TABLE IF NOT EXISTS user_info (
    uid INT UNSIGNED PRIMARY KEY,
    nickname VARCHAR(20),
    avatar VARCHAR(256),
    sex TINYINT DEFAULT 0,
    /*
     * user_info.sex: tinyint
     * [0]: other
     * [1]: male
     * [2]: female
     */
    tag VARCHAR(64)
);
CREATE TABLE IF NOT EXISTS problem (
    pid VARCHAR(10) PRIMARY KEY,
    title VARCHAR(64),
    tag VARCHAR(64),
    difficulty TINYINT DEFAULT 0,
    /*
     * problem.difficulty: tinyint
     * [0]: 尚未评定
     * [1]: 入门
     * [2]: 普及-
     * [3]: 普及/提高-
     * [4]: 普及+/提高
     * [5]: 提高+/省选-
     * [6]: 省选/NOI-
     * [7]: NOI/NOI+/CTSC
     */
    try INT UNSIGNED DEFAULT 0,
    accept INT UNSIGNED DEFAULT 0
);

-- create admin account
INSERT INTO user_account (uid, username, password, reg_time, last_login)
    VALUE (0, 'admin', MD5(CONCAT('admin', '7f98d27ca899ae9c')), NOW(), NOW());
INSERT INTO user_info (uid, nickname, avatar, sex, tag)
    VALUE (0, 'admin', '', 1, 'admin');

