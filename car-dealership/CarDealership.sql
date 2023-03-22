-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: car_dealership
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` year NOT NULL,
  `car_condition` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `color_code` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `passengers` int NOT NULL,
  `safety` varchar(45) NOT NULL,
  `number_of_doors` int NOT NULL,
  `drive_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'Toyota','Camry',2021,'New',32000.00,'4-door sedan, hybrid engine, Bluetooth connectivity','White','#FFFFFF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/camry.webp?alt=media&token=9678acb0-b48e-4f22-a1fa-5c1370166557',5,5,'Lane departure warning',4,'All wheel drive'),(2,'Honda','Civic',2019,'Used',25000.00,'2-door coupe, gasoline engine, backup camera','Red','#FF0000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/civic.jpg?alt=media&token=322c2114-3eb8-4153-8695-097fb34c8201',3,4,'Forward collision warning',2,'Front wheel drive'),(3,'Ford','Mustang',2020,'New',45000.00,'2-door convertible, gasoline engine, navigation system','Blue','#0000FF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/FordMustang.webp?alt=media&token=d76ea31b-67c0-4420-ae1a-ebb347876d63',1,4,'Blind spot monitoring',2,'Rear wheel drive'),(4,'Chevrolet','Corvette',2022,'New',65000.00,'2-door coupe, gasoline engine, heated seats','Yellow','#FFFF00','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Chevrolet%20Corvette.png?alt=media&token=50421cfa-f3f8-4516-98ba-343902a6d96f',2,2,'Rear cross traffic alert',2,'Rear wheel drive'),(5,'Tesla','Model S',2021,'Used',80000.00,'4-door sedan, electric engine, autopilot','Black','#000000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/TeslaModelS-removebg-preview.png?alt=media&token=88d2a080-3cc1-4d69-8de4-3e8a9fd474a0',1,5,'Automatic emergency braking',4,'All wheel drive'),(6,'Audi','A4',2022,'New',38000.00,'4-door sedan, gasoline engine, sunroof','Gray','#808080','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/AudiA4png.png?alt=media&token=2b42c5b6-c225-4d64-bb52-d9a975c86916',7,5,'Adaptive cruise control',4,'All wheel drive'),(7,'BMW','M4',2020,'Used',55000.00,'2-door coupe, gasoline engine, sport suspension','White','#FFFFFF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/BMWM4.webp?alt=media&token=2ced6044-d5bc-4901-8558-9ae59c1a8c3f',3,4,'Lane keeping assist',2,'Rear wheel drive'),(8,'Mercedes-Benz','C-Class',2021,'New',42000.00,'4-door sedan, diesel engine, leather seats','Black','#000000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Mercedes-BenzC-Class.png?alt=media&token=0f11be78-5c9c-47fc-aedb-c7330d52d33f',6,5,'Blind spot assist',4,'Rear wheel drive'),(9,'Subaru','Outback',2021,'New',35000.00,'4-door wagon, hybrid engine, all-weather package','Green','#008000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/SubaruOutback.png?alt=media&token=dc90fc22-e10d-43ad-bedc-01c16317d4ad',4,5,'EyeSight driver assist technology',4,'All wheel drive'),(10,'Lexus','ES',2022,'New',46000.00,'4-door sedan, gasoline engine, heated and ventilated seats','Silver','#C0C0C0','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Lexus.webp?alt=media&token=a2a57a74-7968-432d-9177-818a7a83bd90',2,5,'Rear cross-traffic braking',4,'Front wheel drive'),(11,'Jeep','Wrangler',2021,'Used',35000.00,'2-door SUV, gasoline engine, removable top','Orange','#FFA500','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Wrangler.webp?alt=media&token=0246a2eb-3b14-4de9-b2c0-9798070f0a13',3,4,'Electronic stability control',2,'Four wheel drive'),(12,'GMC','Sierra 1500',2020,'Used',42000.00,'2-door pickup truck, gasoline engine, towing package','Black','#000000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Gmc.jpg?alt=media&token=b914aa22-6a7a-4c92-a764-7715a0d3a413',2,3,'Trailer sway control',2,'Four wheel drive'),(13,'Nissan','Altima',2022,'New',32000.00,'4-door sedan, gasoline engine, push button start','Gray','#808080','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/NissanAtlima.png?alt=media&token=9f86bde6-25a3-4b58-a8ff-7a606af1752d',5,5,'Automatic emergency braking',4,'Front wheel drive'),(14,'Mazda','CX-5',2021,'Used',28000.00,'4-door SUV, gasoline engine, Apple CarPlay and Android Auto','Red','#FF0000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/mazda.png?alt=media&token=3b053f62-05b1-4a47-8ea0-f1b9551d9d5a',4,5,'Lane departure warning',4,'All wheel drive'),(15,'Hyundai','Tucson',2022,'New',33000.00,'4-door SUV, hybrid engine, wireless charging','White','#FFFFFF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Tucson.png?alt=media&token=460e00d2-396b-47b5-8eee-0865cb0e9eda',6,5,'Blind spot collision warning',4,'Front wheel drive'),(16,'Kia','Stinger',2020,'Used',40000.00,'4-door sedan, gasoline engine, heated front seats','Black','#000000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/KiaStinger.jpg?alt=media&token=7ff764e5-0241-418b-89dc-de5246a88bab',1,5,'Forward collision avoidance assist',4,'Rear wheel drive'),(17,'Dodge','Challenger',2021,'New',50000.00,'2-door coupe, gasoline engine, rear park assist','Blue','#0000FF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/DodgeChallenger.png?alt=media&token=16ec9e5b-83a7-4197-8aff-25b1507854c2',3,5,'Adaptive cruise control',2,'Rear wheel drive'),(18,'Infiniti','QX60',2022,'New',44000.00,'4-door SUV, gasoline engine, panoramic moonroof','Gray','#808080','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/InfinitiQX60.png?alt=media&token=a68ff649-d19a-4b24-94d1-59a0ab0947b0',2,6,'Predictive forward collision warning',4,'All wheel drive'),(19,'Acura','TLX',2021,'Used',38000.00,'4-door sedan, gasoline engine, keyless access system','Silver','#C0C0C0','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/AcuraTLX.webp?alt=media&token=2014dab6-bbe4-4267-b23b-a6db7eafb104',0,5,'Road departure mitigation',4,'Front wheel drive'),(20,'Porsche','911',2022,'New',120000.00,'2-door convertible, gasoline engine, sport exhaust system','Red','#FF0000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/Porsche911-removebg-preview.png?alt=media&token=22f67944-65d0-43cd-8e45-060a583c1ba9',1,2,'Porsche Stability Management',2,'Rear wheel drive'),(21,'Volvo','XC90',2021,'Used',60000.00,'4-door SUV, hybrid engine, 360-degree camera','Gray','#808080','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/VolvoXC90.png?alt=media&token=3985ba4f-55ce-4974-8b91-5ee29c1f9779',2,7,'Run-off road mitigation',4,'All wheel drive'),(22,'Cadillac','CT4',2022,'New',42000.00,'4-door sedan, gasoline engine, 10-speed automatic transmission','Black','#000000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/CadillacCT4.jpg?alt=media&token=82dbc9a0-a30b-452d-b80d-803b8846ed1d',3,5,'Front pedestrian braking',4,'Rear wheel drive'),(23,'Lincoln','Aviator',2020,'Used',56000.00,'4-door SUV, gasoline engine, adaptive suspension','Blue','#0000FF','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/lincoln-aviator.webp?alt=media&token=6e0d0523-2ab5-4037-9278-4852d117c223',1,7,'Reverse brake assist',4,'All wheel drive'),(24,'Land Rover','Sport',2021,'New',80000.00,'4-door SUV, gasoline engine, terrain response system','Green','#008000','https://firebasestorage.googleapis.com/v0/b/cardealership-6ef44.appspot.com/o/rover.avif?alt=media&token=a159a42b-3d03-4a19-85a6-981179ff66da',2,5,'Lane departure warning',4,'Four wheel drive');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Nathalie Saab','nathaliesaab6@gmail.com','$2a$11$4XsSVU5N1gj6zXcsIKFwqeZzvvDbw3gDuHDMhO0/HETIS94WkNenG'),(18,'Nathaliet','test@gmail.com','$2a$11$n5/yfUUK7R.IR/yy4FtnI.6aCu5WvaMBZMIU8MLcXgBJdTqpx9582'),(19,'Nathalie','nathaliesaab@gmail.com','$2a$11$Ny93Ln9V0tpEvJQtnG/09eeOgwR4NKWSJ9eS2vLd2PlPyB7vfy9aa'),(20,'Testing','tes2t@gmail.com','$2a$11$y8KdBtcTFh.Dd75MDQAyDO8yjkiLt7CejwK5zNiIPNfxZD4FldUs2');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favourite`
--

DROP TABLE IF EXISTS `Favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_ud_idx` (`customer_id`),
  KEY `car_id_idx` (`car_id`),
  CONSTRAINT `car_id` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  CONSTRAINT `id_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favourite`
--

LOCK TABLES `Favourite` WRITE;
/*!40000 ALTER TABLE `Favourite` DISABLE KEYS */;
INSERT INTO `Favourite` VALUES (71,18,2),(106,19,2),(109,20,7),(110,20,10),(114,2,3);
/*!40000 ALTER TABLE `Favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `userId` int NOT NULL,
  `tokenId` varchar(45) DEFAULT NULL,
  `refreshToken` longtext,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken`
--

LOCK TABLES `refreshtoken` WRITE;
/*!40000 ALTER TABLE `refreshtoken` DISABLE KEYS */;
INSERT INTO `refreshtoken` VALUES (1,'1232403093','5244fCn3RnmwV/mJNw4qlzpF35HZ7rAntXhxpr0oPfg='),(2,'889499983','ZdbglPBCgbX+/7ULONRwhKeY/TvGo+uLLb+Ajbdybo4='),(7,'1536356881','6CIPHbIawDfUxwp2X7lHMGEgqbIWEbilqfpPh7cJzb8='),(8,'699686150','GgFaLL79SPykpVoy4IqWNMDDtGFdYKDMCvP3xcaeN0M='),(9,'643001732','yAvM5rc0eciSdHU5HVNvGJbHbarvwvBgtqtnlaF8Ba8='),(10,'1342003949','buvjfcS6xRwdNB1SgTgaS+mbUJLLhtDV5cb253qUK5w='),(18,'1762984397','9OMS5pvxx6R5mD4nr1xu1JyIc28HRGIjjEysWgud6vo='),(19,'1065207501','VLso68BWn/A1WOc/nnVzFec+KUD+8EpQJI2lWkSq4bY='),(20,'667634654','+YmyfZGkkkWapc30yMiK5aOR2w2bKT87U7cIyYkYEOE=');
/*!40000 ALTER TABLE `refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `customer_id` int NOT NULL,
  `review` varchar(255) NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id_idx` (`customer_id`),
  KEY `car_id_idx` (`car_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_car` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,5,2,'Best customer service and amazing staff!',3),(14,4,19,'Best customer support',6);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-22 20:02:48
