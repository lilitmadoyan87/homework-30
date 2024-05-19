/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 100432
Source Host           : localhost:3306
Source Database       : nest_homework_30

Target Server Type    : MYSQL
Target Server Version : 100432
File Encoding         : 65001

Date: 2024-05-19 15:43:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `teacherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9a85fd90f7e33eb0265e76af9c7` (`teacherId`),
  CONSTRAINT `FK_9a85fd90f7e33eb0265e76af9c7` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('1', 'G1', '23', '1');
INSERT INTO `group` VALUES ('2', 'G2', '13', '2');
INSERT INTO `group` VALUES ('3', 'G3', '13', '2');
INSERT INTO `group` VALUES ('4', 'G4', '13', '1');

-- ----------------------------
-- Table structure for rating
-- ----------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b110361349c7bcee2966f39ef5a` (`studentId`),
  CONSTRAINT `FK_b110361349c7bcee2966f39ef5a` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of rating
-- ----------------------------
INSERT INTO `rating` VALUES ('1', '20', '1');
INSERT INTO `rating` VALUES ('2', '17', '2');
INSERT INTO `rating` VALUES ('3', '19', '3');
INSERT INTO `rating` VALUES ('4', '19', '1');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ce9660fc114efef4062bba4c119` (`groupId`),
  CONSTRAINT `FK_ce9660fc114efef4062bba4c119` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', 'S1', 'Syan1', 's1@gmail.com', '23', '111111', '1');
INSERT INTO `student` VALUES ('2', 'S2', 'Syan2', 's2@gmail.com', '16', '111111', '1');
INSERT INTO `student` VALUES ('3', 'S3', 'Syan3', 's3@gmail.com', '23', '111111', '2');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', 'Lilit', 'Madoyan', '1@gmail.com', '37');
INSERT INTO `teacher` VALUES ('2', 'Nune', 'Midoyan', '2@gmail.com', '37');
SET FOREIGN_KEY_CHECKS=1;
