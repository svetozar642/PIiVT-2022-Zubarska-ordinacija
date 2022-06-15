-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.20 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for zubarska_ordinacija_2018203764
DROP DATABASE IF EXISTS `zubarska_ordinacija_2018203764`;
CREATE DATABASE IF NOT EXISTS `zubarska_ordinacija_2018203764` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zubarska_ordinacija_2018203764`;

-- Dumping structure for table zubarska_ordinacija_2018203764.korisnik
DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `korisnik_id` int unsigned NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `jmbg` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` enum('aktivan','neaktivan') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'neaktivan',
  `aktivacioni_kod` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `uq_korisnik_korisnicko_ime` (`korisnicko_ime`),
  UNIQUE KEY `uq_korisnik_aktivacioni_kod` (`aktivacioni_kod`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.korisnik: ~7 rows (approximately)
INSERT INTO `korisnik` (`korisnik_id`, `korisnicko_ime`, `lozinka_hash`, `ime`, `prezime`, `jmbg`, `email`, `created_at`, `is_active`, `aktivacioni_kod`) VALUES
	(1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e', 'Milica', 'Petrovic', '2505994410888', 'mpetrovic@gmail.com', '2022-05-31 18:11:37', 'aktivan', NULL),
	(2, 'tamara123', 'b4bd15e18040aeed3fea89609b0b1944', 'Tamara', 'Jovanovic', '2010932410777', 'tjovanovic@gmail.com', '2022-06-04 15:54:52', 'aktivan', NULL),
	(4, 'jelena111', 'c62439ea56c71bf8b4760d507e0e646a', 'Jelena', 'Popovic', '2103992410777', 'jpopovic@gmail.com', '2022-06-10 14:45:21', 'aktivan', NULL),
	(5, 'katarina123', '59dda66f74e8c549f1cffbdb83cd699c', 'Katarina', 'Petrovic', '1511993410999', 'kpetrovic@gmail.com', '2022-06-11 15:03:17', 'aktivan', NULL),
	(6, 'tina123', '$2b$10$YUjNpbQWVDRBpfIZ7A/QUesGOV5tjqyV2WDVuWHrytffGxuU71tJu', 'Tina', 'Lazarevic', '1007994410555', 'tlazarevic@gmail.com', '2022-06-14 21:43:19', 'aktivan', NULL),
	(8, 'teodora123', '$2b$10$smp3K90/oLfqq4hMrLcaa.5c8x5F55nEjU7wduFtJQZQwzwyVXzHa', 'Teodora', 'Popovic', '2207996410222', 'tpopovic@gmail.com', '2022-06-15 20:38:05', 'aktivan', '92344790-8e9f-4a1b-b2e8-7af7918e48e1'),
	(10, 'marija123', '$2b$10$k76CF5r3DiyDkhDU2n8SBuyf.TiJ3kB3JZ5klUOGNYiPQFELQMf5S', 'Marija', 'Stankovic', '1507997410222', 'mstankovic@gmail.com', '2022-06-15 21:23:10', 'aktivan', NULL);

-- Dumping structure for table zubarska_ordinacija_2018203764.pacijent
DROP TABLE IF EXISTS `pacijent`;
CREATE TABLE IF NOT EXISTS `pacijent` (
  `pacijent_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `jmbg` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `adresa` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `telefon` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `senioritet` enum('dete','penzioner','ostali') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ostali',
  `status` enum('aktivan','neaktivan') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'aktivan',
  `korisnik_id` int unsigned NOT NULL,
  PRIMARY KEY (`pacijent_id`),
  UNIQUE KEY `uq_pacijent_jmbg` (`jmbg`),
  KEY `fk_pacijent_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_pacijent_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.pacijent: ~5 rows (approximately)
INSERT INTO `pacijent` (`pacijent_id`, `ime`, `prezime`, `jmbg`, `adresa`, `telefon`, `email`, `senioritet`, `status`, `korisnik_id`) VALUES
	(1, 'Petar', 'Petkovic', '0102990510111', 'Durmitorska 12', '061123456', 'ppetkovic@gmail.com', 'ostali', 'aktivan', 1),
	(2, 'Mika', 'Mikic', '0203999510222', 'Kumanovska 15', '062654321', 'mmikic@gmail.com', 'ostali', 'neaktivan', 1),
	(5, 'Milica', 'Petrovic', '0304955410111', 'Ustanicka 15', '061332211', 'mpetrovic@gmail.com', 'penzioner', 'aktivan', 2),
	(11, 'Luka', 'Jovanovic', '0505945510444', 'Mirijevski venac 15', '061443311', 'ljovanovic@gmail.com', 'penzioner', 'aktivan', 4),
	(12, 'Katarina', 'Marjanovic', '0710008410111', 'Cerska 15', '064552211', 'kmarjanovic@gmail.com', 'dete', 'aktivan', 5);

-- Dumping structure for table zubarska_ordinacija_2018203764.prijava_korisnika
DROP TABLE IF EXISTS `prijava_korisnika`;
CREATE TABLE IF NOT EXISTS `prijava_korisnika` (
  `prijava_korisnika_id` int unsigned NOT NULL AUTO_INCREMENT,
  `logged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `korisnicko_ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka_hash` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`prijava_korisnika_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.prijava_korisnika: ~9 rows (approximately)
INSERT INTO `prijava_korisnika` (`prijava_korisnika_id`, `logged_at`, `status`, `korisnicko_ime`, `lozinka_hash`) VALUES
	(1, '2022-06-04 20:41:57', 1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e'),
	(2, '2022-06-04 20:42:15', 0, 'tamara123', '504938a121efec5f4fbdbcc64ca5736e'),
	(3, '2022-06-04 20:42:39', 1, 'tamara123', 'b4bd15e18040aeed3fea89609b0b1944'),
	(4, '2022-06-04 20:47:01', 1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e'),
	(5, '2022-06-07 16:21:09', 1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e'),
	(6, '2022-06-11 15:15:39', 0, 'tamara123', '504938a121efec5f4fbdbcc64ca5736e'),
	(7, '2022-06-11 15:15:53', 1, 'tamara123', 'b4bd15e18040aeed3fea89609b0b1944'),
	(8, '2022-06-14 22:52:54', 0, 'tamara333', '$2b$10$BwsTGWJMGR5BPqjHgHgR9OnwOiMraf.HIPQ7n.HX0Am51w423UR/u'),
	(9, '2022-06-14 22:53:10', 0, 'tamara333', '$2b$10$Bn.99erITURguECj7U1Glu2OMKT6cGf3qq3kuhF.jO3Z32Azp0D52');

-- Dumping structure for table zubarska_ordinacija_2018203764.racun
DROP TABLE IF EXISTS `racun`;
CREATE TABLE IF NOT EXISTS `racun` (
  `racun_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tip_usluge` enum('pojedinacna','paket') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `senioritet` enum('dete','penzioner','ostali') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pacijent_id` int unsigned NOT NULL,
  `korisnik_id` int unsigned NOT NULL,
  PRIMARY KEY (`racun_id`),
  KEY `fk_racun_pacijent_id` (`pacijent_id`),
  KEY `fk_racun_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_racun_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_racun_pacijent_id` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.racun: ~6 rows (approximately)
INSERT INTO `racun` (`racun_id`, `created_at`, `tip_usluge`, `senioritet`, `pacijent_id`, `korisnik_id`) VALUES
	(1, '2022-05-31 18:21:23', 'pojedinacna', 'ostali', 1, 1),
	(2, '2022-05-31 18:22:27', 'pojedinacna', 'ostali', 2, 1),
	(3, '2022-06-05 21:18:44', 'paket', 'penzioner', 5, 2),
	(4, '2022-06-07 16:16:26', 'pojedinacna', 'ostali', 2, 1),
	(6, '2022-06-11 13:49:23', 'paket', 'penzioner', 11, 4),
	(7, '2022-06-11 15:19:23', 'pojedinacna', 'dete', 12, 5);

-- Dumping structure for table zubarska_ordinacija_2018203764.racun_usluga
DROP TABLE IF EXISTS `racun_usluga`;
CREATE TABLE IF NOT EXISTS `racun_usluga` (
  `racun_usluga_id` int unsigned NOT NULL AUTO_INCREMENT,
  `zub_id` int unsigned NOT NULL,
  `usluga_id` int unsigned NOT NULL,
  `pacijent_id` int unsigned NOT NULL,
  `racun_id` int unsigned NOT NULL,
  PRIMARY KEY (`racun_usluga_id`) USING BTREE,
  KEY `fk_intervencija_log_zub_id` (`zub_id`),
  KEY `fk_intervencija_log_usluga_id` (`usluga_id`),
  KEY `fk_intervencija_log_pacijent_id` (`pacijent_id`),
  KEY `fk_intervencija_log_racun_id` (`racun_id`),
  CONSTRAINT `fk_intervencija_log_pacijent_id` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_racun_id` FOREIGN KEY (`racun_id`) REFERENCES `racun` (`racun_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_usluga_id` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`usluga_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_zub_id` FOREIGN KEY (`zub_id`) REFERENCES `zub` (`zub_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.racun_usluga: ~6 rows (approximately)
INSERT INTO `racun_usluga` (`racun_usluga_id`, `zub_id`, `usluga_id`, `pacijent_id`, `racun_id`) VALUES
	(1, 5, 2, 1, 1),
	(2, 25, 3, 2, 2),
	(7, 1, 2, 5, 1),
	(8, 19, 2, 2, 4),
	(9, 25, 3, 11, 6),
	(10, 15, 4, 12, 7);

-- Dumping structure for table zubarska_ordinacija_2018203764.usluga
DROP TABLE IF EXISTS `usluga`;
CREATE TABLE IF NOT EXISTS `usluga` (
  `usluga_id` int unsigned NOT NULL AUTO_INCREMENT,
  `naziv` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci,
  `sifra_usluge` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `kategorija` enum('preventivna','redovna','hirurska') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cena_pojedinacna_dete` float unsigned NOT NULL DEFAULT '0',
  `cena_pojedinacna_penzioner` float unsigned NOT NULL DEFAULT '0',
  `cena_pojedinacna_ostali` float unsigned NOT NULL DEFAULT '0',
  `cena_paket_dete` float unsigned NOT NULL DEFAULT '0',
  `cena_paket_penzioner` float unsigned NOT NULL DEFAULT '0',
  `cena_paket_ostali` float unsigned NOT NULL DEFAULT '0',
  `status` enum('aktivna','neaktivna') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'aktivna',
  PRIMARY KEY (`usluga_id`),
  UNIQUE KEY `uq_usluga_naziv` (`naziv`),
  UNIQUE KEY `uq_usluga_sifra_usluge` (`sifra_usluge`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.usluga: ~10 rows (approximately)
INSERT INTO `usluga` (`usluga_id`, `naziv`, `opis`, `sifra_usluge`, `kategorija`, `cena_pojedinacna_dete`, `cena_pojedinacna_penzioner`, `cena_pojedinacna_ostali`, `cena_paket_dete`, `cena_paket_penzioner`, `cena_paket_ostali`, `status`) VALUES
	(1, 'vadjenje zuba', 'vadjenje zuba ', 'VZH', 'hirurska', 1500, 1800, 2000, 1000, 1200, 1500, 'aktivna'),
	(2, 'popravka krunice', 'popravka karijesa na krunici zuba', 'PKR', 'redovna', 1700, 2000, 2500, 1200, 1500, 1700, 'aktivna'),
	(3, 'skidanje kamenca', 'skidanje kamenca sa zuba', 'SKP', 'preventivna', 1000, 1200, 1400, 800, 900, 1000, 'aktivna'),
	(4, 'nadogradnja zuba', 'nadogradnja polomljenog zuba', 'NZR', 'redovna', 2200, 2600, 3000, 2000, 2300, 2600, 'aktivna'),
	(5, 'lecenje zuba', 'lecenje pokvarenog zuba pre plombiranja', 'LZR', 'redovna', 2500, 2700, 3000, 2100, 2400, 2700, 'aktivna'),
	(6, 'plombiranje zuba', 'stavljanje bele plombe nakon uspesnog lecenja zuba', 'PZR', 'redovna', 2100, 2200, 2300, 1700, 1900, 2000, 'aktivna'),
	(8, 'vadjenje zivca', 'prethodno umrtvljivanje zivca lekom pa potom i njegovo vadjenje', 'UVZH', 'hirurska', 2800, 3000, 3400, 2500, 2700, 2900, 'aktivna'),
	(9, 'izrada mosta od 3 zuba', 'izrada i montaza mosta duzine 3 zuba koja se kace na 2 obradjena', 'IM3', 'redovna', 7800, 8000, 8500, 6500, 6700, 7000, 'aktivna'),
	(12, 'izrada mosta od 4 zuba', 'izrada i montaza mosta duzine 4 zuba koja se kace na 2 obradjena', 'IM4', 'redovna', 9800, 10000, 10500, 8500, 9500, 9800, 'aktivna'),
	(13, 'poliranje zuba', 'poliranje zuba gornje i donje vilice ', 'PZGDV', 'redovna', 1000, 1300, 1400, 700, 900, 1200, 'aktivna');

-- Dumping structure for table zubarska_ordinacija_2018203764.zub
DROP TABLE IF EXISTS `zub`;
CREATE TABLE IF NOT EXISTS `zub` (
  `zub_id` int unsigned NOT NULL AUTO_INCREMENT,
  `broj` int NOT NULL,
  `vilica` enum('gornja','donja') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tip` enum('sekutic','ocnjak','kutnjak') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `strana` enum('leva','desna') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sifra_zuba` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`zub_id`),
  UNIQUE KEY `uq_zub_sifra_zuba` (`sifra_zuba`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.zub: ~29 rows (approximately)
INSERT INTO `zub` (`zub_id`, `broj`, `vilica`, `tip`, `strana`, `sifra_zuba`) VALUES
	(1, 1, 'gornja', 'sekutic', 'leva', 'GLS1'),
	(2, 2, 'gornja', 'sekutic', 'leva', 'GLS2'),
	(3, 3, 'gornja', 'ocnjak', 'leva', 'GLO3'),
	(4, 4, 'gornja', 'kutnjak', 'leva', 'GLK4'),
	(5, 5, 'gornja', 'kutnjak', 'leva', 'GLK5'),
	(6, 6, 'gornja', 'kutnjak', 'leva', 'GLK6'),
	(7, 7, 'gornja', 'kutnjak', 'leva', 'GLK7'),
	(8, 8, 'gornja', 'kutnjak', 'leva', 'GLK8'),
	(9, 1, 'gornja', 'sekutic', 'desna', 'GDS1'),
	(10, 2, 'gornja', 'sekutic', 'desna', 'GDS2'),
	(11, 3, 'gornja', 'ocnjak', 'desna', 'GDO3'),
	(12, 4, 'gornja', 'kutnjak', 'desna', 'GDK4'),
	(13, 5, 'gornja', 'kutnjak', 'desna', 'GDK5'),
	(14, 6, 'gornja', 'kutnjak', 'desna', 'GDK6'),
	(15, 7, 'gornja', 'kutnjak', 'desna', 'GDK7'),
	(16, 8, 'gornja', 'kutnjak', 'desna', 'GDK8'),
	(17, 1, 'donja', 'sekutic', 'leva', 'DLS1'),
	(18, 2, 'donja', 'sekutic', 'leva', 'DLS2'),
	(19, 3, 'donja', 'ocnjak', 'leva', 'DLO3'),
	(20, 4, 'donja', 'kutnjak', 'leva', 'DLK4'),
	(21, 5, 'donja', 'kutnjak', 'leva', 'DLK5'),
	(22, 6, 'donja', 'kutnjak', 'leva', 'DLK6'),
	(23, 7, 'donja', 'kutnjak', 'leva', 'DLK7'),
	(24, 8, 'donja', 'kutnjak', 'leva', 'DLK8'),
	(25, 1, 'donja', 'sekutic', 'desna', 'DDS1'),
	(26, 2, 'donja', 'sekutic', 'desna', 'DDS2'),
	(27, 3, 'donja', 'ocnjak', 'desna', 'DDO3'),
	(28, 4, 'donja', 'kutnjak', 'desna', 'DDK4'),
	(29, 5, 'donja', 'kutnjak', 'desna', 'DDK5'),
	(30, 6, 'donja', 'kutnjak', 'desna', 'DDK6'),
	(31, 7, 'donja', 'kutnjak', 'desna', 'DDK7'),
	(32, 8, 'donja', 'kutnjak', 'desna', 'DDK8');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
