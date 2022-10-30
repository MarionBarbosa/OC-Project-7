# **Réseau social d'entreprise GROUPOMANIA**

Ce site internet permet aux employés de Groupomania d'échanger au travers de publications.
Pour chaque publication il est possible d'ajouter un commentaire et de liker.
Un administrateur a la permission de modification et suppression des publications et des commentaires.

## **Technologies utilisées:**

La partie frontend est gérée par ReactJs, la partie backend est une API NodeJs qui gère les requêtes du frontend vers la base de données MySQL.

## **Installation sur un nouveau poste**

1. **Code**

   - Clonez le code de l'application depuis le dépôt github.

2. **MySQL**

   - Créez une nouvelle base de données sur MySQL et y importer le fichier mysqldump.

3. **Backend**

   - Depuis le dossier /back du projet, lancez la commande npm install dans votre terminal pour installer tous les packages.
   - Renommez le fichier .env.example en supprimant le .example et ajoutez vos données de connection à MySQL (nom d'utilisateur - DB_USER et mot de passe - DB_PASSWORD).
   - Changez le nom de la base de données par celui choisi à l'étape 2.
   - Une fois fini, lancez la commande nodemon server dans votre terminal.
   - Le serveur se connecte au port sélectionné dans le fichier .env, ATTENTION le port doit être différent de 3000.

4. **Frontend**

   - Depuis le dossier /front du projet, lancer la commande npm install pour installer tous les packages.
   - Une fois fini, lancer la commande npm start.
   - Une nouvelle page contenant le site doit s'ouvrir sur votre écran, le site démarre sur le port 3000.
