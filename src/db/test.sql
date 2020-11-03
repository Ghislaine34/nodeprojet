-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 27 oct. 2020 à 11:15
-- Version du serveur :  5.7.28
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `amiibo`
--
CREATE DATABASE IF NOT EXISTS `amiibo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `amiibo`;

-- --------------------------------------------------------

--
-- Structure de la table `amiibo`
--

CREATE TABLE `amiibo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `types_id` int(11) NOT NULL,
  `amiiboseries_id` int(11) NOT NULL,
  `gameseries_id` int(11) NOT NULL,
  `characters_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `amiiboseries`
--

CREATE TABLE `amiiboseries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `gameseries`
--

CREATE TABLE `gameseries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour la table `amiibo`
--
ALTER TABLE `amiibo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `types_id` (`types_id`),
  ADD KEY `amiiboseries_id` (`amiiboseries_id`),
  ADD KEY `gameseries_id` (`gameseries_id`),
  ADD KEY `characters_id` (`characters_id`);

--
-- Index pour la table `amiiboseries`
--
ALTER TABLE `amiiboseries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gameseries`
--
ALTER TABLE `gameseries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour la table `amiibo`
--
ALTER TABLE `amiibo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `amiiboseries`
--
ALTER TABLE `amiiboseries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gameseries`
--
ALTER TABLE `gameseries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


--
-- Contraintes pour la table `amiibo`
--
ALTER TABLE `amiibo`
  ADD CONSTRAINT `amiibo_ibfk_1` FOREIGN KEY (`types_id`) REFERENCES `types` (`id`),
  ADD CONSTRAINT `amiibo_ibfk_2` FOREIGN KEY (`amiiboseries_id`) REFERENCES `amiiboseries` (`id`),
  ADD CONSTRAINT `amiibo_ibfk_3` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`),
  ADD CONSTRAINT `amiibo_ibfk_4` FOREIGN KEY (`gameseries_id`) REFERENCES `gameseries` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
