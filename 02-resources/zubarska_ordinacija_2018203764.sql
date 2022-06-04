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

-- Dumping structure for table zubarska_ordinacija_2018203764.intervencija_log
DROP TABLE IF EXISTS `intervencija_log`;
CREATE TABLE IF NOT EXISTS `intervencija_log` (
  `intervencija_log_id` int unsigned NOT NULL AUTO_INCREMENT,
  `sifra_zuba` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `sifra_usluge` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `zub_id` int unsigned NOT NULL,
  `usluga_id` int unsigned NOT NULL,
  `pacijent_id` int unsigned NOT NULL,
  `racun_id` int unsigned NOT NULL,
  PRIMARY KEY (`intervencija_log_id`),
  KEY `fk_intervencija_log_zub_id` (`zub_id`),
  KEY `fk_intervencija_log_usluga_id` (`usluga_id`),
  KEY `fk_intervencija_log_pacijent_id` (`pacijent_id`),
  KEY `fk_intervencija_log_racun_id` (`racun_id`),
  CONSTRAINT `fk_intervencija_log_pacijent_id` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_racun_id` FOREIGN KEY (`racun_id`) REFERENCES `racun` (`racun_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_usluga_id` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`usluga_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_zub_id` FOREIGN KEY (`zub_id`) REFERENCES `zub` (`zub_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.intervencija_log: ~2 rows (approximately)
INSERT INTO `intervencija_log` (`intervencija_log_id`, `sifra_zuba`, `sifra_usluge`, `zub_id`, `usluga_id`, `pacijent_id`, `racun_id`) VALUES
	(1, 'GLK5', 'PKR', 5, 2, 1, 1),
	(2, 'DDS1', 'SKP', 25, 3, 2, 2),
	(7, 'DLS1', 'PKR', 1, 2, 1, 1);

-- Dumping structure for table zubarska_ordinacija_2018203764.karton
DROP TABLE IF EXISTS `karton`;
CREATE TABLE IF NOT EXISTS `karton` (
  `karton_id` int unsigned NOT NULL AUTO_INCREMENT,
  `pacijent_id` int unsigned NOT NULL,
  `intervencija_log_id` int unsigned NOT NULL,
  PRIMARY KEY (`karton_id`),
  KEY `fk_karton_pacijent` (`pacijent_id`),
  KEY `fk_karton_intervencija_log_id` (`intervencija_log_id`),
  CONSTRAINT `fk_karton_intervencija_log_id` FOREIGN KEY (`intervencija_log_id`) REFERENCES `intervencija_log` (`intervencija_log_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_karton_pacijent` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.karton: ~2 rows (approximately)
INSERT INTO `karton` (`karton_id`, `pacijent_id`, `intervencija_log_id`) VALUES
	(1, 1, 1),
	(2, 2, 2);

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
  `is_active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `uq_korisnik_korisnicko_ime` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.korisnik: ~1 rows (approximately)
INSERT INTO `korisnik` (`korisnik_id`, `korisnicko_ime`, `lozinka_hash`, `ime`, `prezime`, `jmbg`, `email`, `created_at`, `is_active`) VALUES
	(1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e', 'Milica', 'Petrovic', '2505994410888', 'mpetrovic@gmail.com', '2022-05-31 18:11:37', 1),
	(2, 'tamara123', 'b4bd15e18040aeed3fea89609b0b1944', 'Tamara', 'Jovanovic', '2010932410777', 'tjovanovic@gmail.com', '2022-06-04 15:54:52', 1);

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
  `status` enum('aktivan','neaktivan') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'aktivan',
  `korisnik_id` int unsigned NOT NULL,
  PRIMARY KEY (`pacijent_id`),
  UNIQUE KEY `uq_pacijent_jmbg` (`jmbg`),
  KEY `fk_pacijent_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_pacijent_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.pacijent: ~3 rows (approximately)
INSERT INTO `pacijent` (`pacijent_id`, `ime`, `prezime`, `jmbg`, `adresa`, `telefon`, `email`, `status`, `korisnik_id`) VALUES
	(1, 'Petar', 'Petkovic', '0102990510111', 'Durmitorska 12', '061123456', 'ppetkovic@gmail.com', 'aktivan', 1),
	(2, 'Mika', 'Mikic', '0203999510222', 'Cerska 15', '062654321', 'mmikic@gmail.com', 'aktivan', 1),
	(5, 'Milica', 'Petrovic', '0304955410111', 'Ustanicka 15', '061332211', 'mpetrovic@gmail.com', 'aktivan', 2);

-- Dumping structure for table zubarska_ordinacija_2018203764.prijava_korisnika
DROP TABLE IF EXISTS `prijava_korisnika`;
CREATE TABLE IF NOT EXISTS `prijava_korisnika` (
  `prijava_korisnika_id` int unsigned NOT NULL AUTO_INCREMENT,
  `logged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `korisnicko_ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka_hash` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`prijava_korisnika_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.prijava_korisnika: ~0 rows (approximately)
INSERT INTO `prijava_korisnika` (`prijava_korisnika_id`, `logged_at`, `status`, `korisnicko_ime`, `lozinka_hash`) VALUES
	(1, '2022-06-04 20:41:57', 1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e'),
	(2, '2022-06-04 20:42:15', 0, 'tamara123', '504938a121efec5f4fbdbcc64ca5736e'),
	(3, '2022-06-04 20:42:39', 1, 'tamara123', 'b4bd15e18040aeed3fea89609b0b1944'),
	(4, '2022-06-04 20:47:01', 1, 'milica123', '504938a121efec5f4fbdbcc64ca5736e');

-- Dumping structure for table zubarska_ordinacija_2018203764.racun
DROP TABLE IF EXISTS `racun`;
CREATE TABLE IF NOT EXISTS `racun` (
  `racun_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tip_usluge` enum('pojedinacna','paket') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `senioritet` enum('dete','penzioner','ostali') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cena` float NOT NULL DEFAULT '0',
  `pacijent_id` int unsigned NOT NULL,
  `korisnik_id` int unsigned NOT NULL,
  PRIMARY KEY (`racun_id`),
  KEY `fk_racun_pacijent_id` (`pacijent_id`),
  KEY `fk_racun_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_racun_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_racun_pacijent_id` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.racun: ~2 rows (approximately)
INSERT INTO `racun` (`racun_id`, `created_at`, `tip_usluge`, `senioritet`, `cena`, `pacijent_id`, `korisnik_id`) VALUES
	(1, '2022-05-31 18:21:23', 'pojedinacna', 'ostali', 2000, 1, 1),
	(2, '2022-05-31 18:22:27', 'pojedinacna', 'ostali', 1000, 2, 1);

-- Dumping structure for table zubarska_ordinacija_2018203764.usluga
DROP TABLE IF EXISTS `usluga`;
CREATE TABLE IF NOT EXISTS `usluga` (
  `usluga_id` int unsigned NOT NULL AUTO_INCREMENT,
  `naziv` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `opis` text COLLATE utf8_unicode_ci,
  `sifra_usluge` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `kategorija` enum('preventivna','redovna','hirurska') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cena` float unsigned NOT NULL DEFAULT '0',
  `popust_paket` float unsigned NOT NULL DEFAULT '0',
  `popust_dete` float unsigned NOT NULL DEFAULT '0',
  `popust_penzioner` float unsigned NOT NULL DEFAULT '0',
  `status` enum('aktivna','neaktivna') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'aktivna',
  PRIMARY KEY (`usluga_id`),
  UNIQUE KEY `uq_usluga_naziv` (`naziv`),
  UNIQUE KEY `uq_usluga_sifra_usluge` (`sifra_usluge`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table zubarska_ordinacija_2018203764.usluga: ~8 rows (approximately)
INSERT INTO `usluga` (`usluga_id`, `naziv`, `opis`, `sifra_usluge`, `kategorija`, `cena`, `popust_paket`, `popust_dete`, `popust_penzioner`, `status`) VALUES
	(1, 'vadjenje zuba', 'vadjenje zuba ', 'VZH', 'hirurska', 3000, 0.1, 0.2, 0.15, 'aktivna'),
	(2, 'popravka krunice', 'popravka karijesa na krunici zuba', 'PKR', 'redovna', 2000, 0.1, 0.2, 0.15, 'aktivna'),
	(3, 'skidanje kamenca', 'skidanje kamenca sa zuba', 'SKP', 'preventivna', 1000, 0.1, 0.2, 0.15, 'aktivna'),
	(4, 'nadogradnja zuba', 'nadogradnja polomljenog zuba', 'NZR', 'redovna', 2200, 0.1, 0.2, 0.15, 'aktivna'),
	(5, 'lecenje zuba', 'lecenje pokvarenog zuba pre plombiranja', 'LZR', 'redovna', 2500, 0.1, 0.2, 0.15, 'aktivna'),
	(6, 'plombiranje zuba', 'stavljanje bele plombe nakon uspesnog lecenja zuba', 'PZR', 'redovna', 2100, 0.1, 0.2, 0.15, 'aktivna'),
	(8, 'vadjenje zivca', 'prethodno umrtvljivanje zivca lekom pa potom i njegovo vadjenje', 'UVZH', 'hirurska', 2400, 0.1, 0.2, 0.15, 'aktivna'),
	(9, 'izrada mosta od 3 zuba', 'izrada i montaza mosta duzine 3 zuba koja se kace na 2 obradjena', 'IM3', 'redovna', 7800, 0.3, 0.27, 0.45, 'aktivna');

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

-- Dumping data for table zubarska_ordinacija_2018203764.zub: ~32 rows (approximately)
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
