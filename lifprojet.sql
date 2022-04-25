-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 25 avr. 2022 à 11:25
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lifprojet`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'ak', '$2b$10$WlaeNul/AVSbhX2SZ5SYTOPiwfRO/i/MWWpmOun3.lClmRb3blX4K'),
(2, 'Cecilia', '$2b$10$rNHPbfggDT6e0X0CKXgYsu4G2QC.9KJhWDKcffEm7gi59GX9wy6om');

-- --------------------------------------------------------

--
-- Structure de la table `watchlist`
--

CREATE TABLE `watchlist` (
  `id` int(8) NOT NULL,
  `movieId` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `score` int(10) DEFAULT NULL,
  `progress` int(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `watchlist`
--

INSERT INTO `watchlist` (`id`, `movieId`, `title`, `status`, `score`, `progress`, `userId`) VALUES
(23, 190859, 'American Sniper', 'Completed', 10, 1, 'ak'),
(26, 120089, 'SPY×FAMILY', 'Planning', 2, 2, 'ak'),
(27, 31724, 'Code Geass: Lelouch of the Rebellion', 'Completed', 7, 50, 'ak'),
(35, 634649, 'Spider-Man : No Way Home', 'Completed', 5, 10, 'ak'),
(38, 324857, 'Spider-Man : New Generation', 'Watching', 2, 0, 'ak'),
(39, 44217, 'Vikings', 'Watching', 2, 15, 'ak');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
