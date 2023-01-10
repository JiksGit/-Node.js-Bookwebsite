CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `board` (
  `boardid` int NOT NULL AUTO_INCREMENT,
  `loginid` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` varchar(8) NOT NULL,
  `content` text NOT NULL,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`boardid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `stock` int NOT NULL,
  `pubdate` varchar(8) NOT NULL,
  `pagenum` int DEFAULT NULL,
  `ISBN` varchar(30) NOT NULL,
  `ebook` varchar(1) NOT NULL,
  `kdc` varchar(20) DEFAULT NULL,
  `img` varchar(30) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `nation` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `custid` varchar(10) NOT NULL,
  `bookid` int NOT NULL,
  `cartdate` varchar(30) NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`cartid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `namecard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loginid` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `birth` varchar(8) NOT NULL,
  `class` varchar(2) NOT NULL,
  `grade` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `purchase` (
  `purchaseid` int NOT NULL AUTO_INCREMENT,
  `custid` varchar(10) NOT NULL,
  `bookid` int NOT NULL,
  `purchasedate` varchar(30) NOT NULL,
  `price` int DEFAULT NULL,
  `point` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `cancel` varchar(1) NOT NULL DEFAULT 'N',
  `refund` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`purchaseid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `birth` varchar(8) NOT NULL,
  `gender` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
