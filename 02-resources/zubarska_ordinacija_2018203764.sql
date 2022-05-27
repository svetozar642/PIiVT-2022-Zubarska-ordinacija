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
  `karton_id` int unsigned NOT NULL,
  `racun_id` int unsigned NOT NULL,
  PRIMARY KEY (`intervencija_log_id`),
  KEY `fk_intervencija_log_zub_id` (`zub_id`),
  KEY `fk_intervencija_log_usluga_id` (`usluga_id`),
  KEY `fk_intervencija_log_pacijent_id` (`pacijent_id`),
  KEY `fk_intervencija_log_karton_id` (`karton_id`),
  KEY `fk_intervencija_log_racun_id` (`racun_id`),
  CONSTRAINT `fk_intervencija_log_karton_id` FOREIGN KEY (`karton_id`) REFERENCES `karton` (`karton_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_pacijent_id` FOREIGN KEY (`pacijent_id`) REFERENCES `pacijent` (`pacijent_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_racun_id` FOREIGN KEY (`racun_id`) REFERENCES `racun` (`racun_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_usluga_id` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`usluga_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_intervencija_log_zub_id` FOREIGN KEY (`zub_id`) REFERENCES `zub` (`zub_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table zubarska_ordinacija_2018203764.korisnik
DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `korisnik_id` int unsigned NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `uq_korisnik_korisnicko_ime` (`korisnicko_ime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table zubarska_ordinacija_2018203764.pacijent
DROP TABLE IF EXISTS `pacijent`;
CREATE TABLE IF NOT EXISTS `pacijent` (
  `pacijent_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `jmbg` int unsigned NOT NULL,
  `adresa` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `telefon` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('aktivan','neaktivan') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'aktivan',
  `karton_id` int unsigned NOT NULL,
  `korisnik_id` int unsigned NOT NULL,
  PRIMARY KEY (`pacijent_id`),
  UNIQUE KEY `uq_pacijent_jmbg` (`jmbg`),
  KEY `fk_pacijent_korisnik_id` (`korisnik_id`),
  KEY `fk_pacijent_karton_id` (`karton_id`),
  CONSTRAINT `fk_pacijent_karton_id` FOREIGN KEY (`karton_id`) REFERENCES `karton` (`karton_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pacijent_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table zubarska_ordinacija_2018203764.prijava_korisnika
DROP TABLE IF EXISTS `prijava_korisnika`;
CREATE TABLE IF NOT EXISTS `prijava_korisnika` (
  `prijava_korisnika_id` int unsigned NOT NULL AUTO_INCREMENT,
  `logged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `korisnicko_ime` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka_hash` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`prijava_korisnika_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
