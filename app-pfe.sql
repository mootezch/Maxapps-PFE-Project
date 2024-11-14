-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 nov. 2024 à 13:34
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app-pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `idClient` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `adresse` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`idClient`, `idUser`, `nom`, `prenom`, `telephone`, `adresse`) VALUES
(22, 42, 'Aaa', 'Bbbb', '346788', 'Dfjyrf'),
(25, 49, 'Cc', 'Salem', '4578', 'Xcvjnn'),
(26, 50, 'Mootez', 'Chihi', '123345', 'Sousse');

-- --------------------------------------------------------

--
-- Structure de la table `conversation_message`
--

CREATE TABLE `conversation_message` (
  `idMessage` int(11) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `sender` enum('client','personal') NOT NULL,
  `idTicket` int(11) DEFAULT NULL,
  `idClient` int(11) DEFAULT NULL,
  `idPersonal` int(11) DEFAULT NULL,
  `idProjet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `conversation_message`
--

INSERT INTO `conversation_message` (`idMessage`, `message`, `createdAt`, `sender`, `idTicket`, `idClient`, `idPersonal`, `idProjet`) VALUES
(75, 'test', '2024-06-28 14:49:23.714755', 'personal', 22, 25, 2, 41),
(76, 'azkjagz', '2024-06-28 14:49:29.262766', 'personal', 22, 25, 2, 41),
(77, 'Jdjdjdj', '2024-06-28 14:49:30.420987', 'client', 22, 25, NULL, 41),
(78, 'salut', '2024-06-28 15:58:08.545191', 'personal', 23, 26, 2, 42),
(79, 'salu-tt', '2024-06-28 15:58:38.913393', 'personal', 23, 26, 2, 42),
(80, 'Hkkjgff', '2024-06-28 15:58:56.140981', 'client', 23, 26, NULL, 42);

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

CREATE TABLE `intervention` (
  `idIntervention` int(11) NOT NULL,
  `idClient` int(11) NOT NULL,
  `idPersonal` int(11) NOT NULL,
  `idTicket` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL,
  `status` enum('resolved','unresolved') NOT NULL DEFAULT 'unresolved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal`
--

CREATE TABLE `personal` (
  `idPersonal` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personal`
--

INSERT INTO `personal` (`idPersonal`, `idUser`, `nom`, `prenom`, `position`) VALUES
(2, 1, 'mootez', 'chihi', 'Chef de projet');

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `deadline` date NOT NULL,
  `idClient` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `project`
--

INSERT INTO `project` (`id`, `nom`, `deadline`, `idClient`, `description`, `status`) VALUES
(39, 'azfafzafz', '2024-06-05', 22, 'afzafzfa', 'Pending'),
(41, 'Project app mobile', '2024-07-06', 25, 'this is your project', 'Pending'),
(42, 'app mobile ', '2024-06-07', 26, 'votre app est suuceesfull', 'In Progress');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

CREATE TABLE `ticket` (
  `idTicket` int(11) NOT NULL,
  `idClient` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `status` enum('open','closed') NOT NULL DEFAULT 'open',
  `typeTicket` enum('reclamation','demande') NOT NULL DEFAULT 'demande',
  `projectId` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `priority` enum('low','meduim','high','urgent') NOT NULL DEFAULT 'low'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ticket`
--

INSERT INTO `ticket` (`idTicket`, `idClient`, `description`, `date`, `status`, `typeTicket`, `projectId`, `title`, `priority`) VALUES
(21, 22, 'User authentique ', '2024-06-27 23:45:28.637214', 'open', 'demande', 39, 'Error', 'low'),
(22, 25, ' 7gigigij', '2024-06-28 14:39:06.373493', 'open', 'demande', 41, '7ccuc ', 'low'),
(23, 26, 'J\'ai un problème ', '2024-06-28 15:57:15.521978', 'open', 'reclamation', 42, 'Error d\'authentification ', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('client','personnel') NOT NULL DEFAULT 'client',
  `status` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `email`, `password`, `role`, `status`) VALUES
(1, 'mootez@gmail.com', '$2a$10$dz7nv8/xzTWiepVjNKnKcOb1iq4IiOWItyi9fVD2nd.7PsvIbYdYe', 'personnel', 1),
(42, 'abc@gmail.com', '$2b$10$WuE78bGPApSTbFZ/C6hUT.RhI.gfmd3x2dP0aTvon3Fdx19HHFO0m', 'client', 1),
(49, 'cc@gmail.com', '$2b$10$WyBKvZUVzkKpeZNOHhuvUe89jYHOpectdIaXamUyTSFE1gx0G95uu', 'client', 1),
(50, 'mootez.chihi@gmail.com', '$2b$10$EmhcehsSsulCYDnkbxmkEOu27iJgxSxCZsIKPAEWBFQLdGfuJyulK', 'client', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_notifications`
--

INSERT INTO `user_notifications` (`id`, `token`, `idUser`) VALUES
(1, 'ExponentPushToken[hsL85mMdxzbTOyPmNS9he3]', 42),
(4, 'ExponentPushToken[hsL85mMdxzbTOyPmNS9he3]', 49),
(5, 'ExponentPushToken[hsL85mMdxzbTOyPmNS9he3]', 50);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`idClient`),
  ADD UNIQUE KEY `REL_4d464471634bb01249fb090a4a` (`idUser`);

--
-- Index pour la table `conversation_message`
--
ALTER TABLE `conversation_message`
  ADD PRIMARY KEY (`idMessage`),
  ADD KEY `FK_1b2bd35809d0e63a9ecf8dec55c` (`idTicket`),
  ADD KEY `FK_8de298797450b6a9475c32059dd` (`idClient`),
  ADD KEY `FK_8159fdecacc8382cc38df8a60c0` (`idPersonal`),
  ADD KEY `FK_df264057fcfe970afbbeeceae36` (`idProjet`);

--
-- Index pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD PRIMARY KEY (`idIntervention`),
  ADD KEY `FK_f7820fad5254080c03ba4680065` (`idPersonal`),
  ADD KEY `FK_9a0f4578d1fac136772d3edb2af` (`idTicket`),
  ADD KEY `FK_5a3f05db8bf28920b09971355ee` (`idClient`);

--
-- Index pour la table `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`idPersonal`),
  ADD KEY `FK_85a9f3831e69ca16fb530be7c6e` (`idUser`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_387d85a395760b9d0268055e39c` (`idClient`);

--
-- Index pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`idTicket`),
  ADD KEY `FK_c6f47d3e270123ccd2f16f13d29` (`projectId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- Index pour la table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_6b027478bdbdd6890694bbe2ff` (`idUser`),
  ADD UNIQUE KEY `IDX_144eb948f3cdc8fd48cfab7a96` (`token`,`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `idClient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `conversation_message`
--
ALTER TABLE `conversation_message`
  MODIFY `idMessage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT pour la table `intervention`
--
ALTER TABLE `intervention`
  MODIFY `idIntervention` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal`
--
ALTER TABLE `personal`
  MODIFY `idPersonal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK_4d464471634bb01249fb090a4ad` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `conversation_message`
--
ALTER TABLE `conversation_message`
  ADD CONSTRAINT `FK_1b2bd35809d0e63a9ecf8dec55c` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8159fdecacc8382cc38df8a60c0` FOREIGN KEY (`idPersonal`) REFERENCES `personal` (`idPersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8de298797450b6a9475c32059dd` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_df264057fcfe970afbbeeceae36` FOREIGN KEY (`idProjet`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD CONSTRAINT `FK_5a3f05db8bf28920b09971355ee` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9a0f4578d1fac136772d3edb2af` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f7820fad5254080c03ba4680065` FOREIGN KEY (`idPersonal`) REFERENCES `personal` (`idPersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `FK_85a9f3831e69ca16fb530be7c6e` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_387d85a395760b9d0268055e39c` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_c6f47d3e270123ccd2f16f13d29` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD CONSTRAINT `FK_6b027478bdbdd6890694bbe2ff6` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
