# **Réseau social d'entreprise GROUPOMANIA**

Ce site internet permet aux employés de Groupomania d'échanger au travers de publications.
Pour chaque publication il est possible d'ajouter un commentaire et de liker.
Un administrateur a la permission de modification et suppression des publications et des commentaires.

## **Technologies utilisées:**

La partie frontend est gérée par ReactJs, la partie backend est une API NodeJs qui gère les requêtes du frontend vers la base de données MySQL.

## **Installation sur un nouveau poste**

1. **Code**

   - Cloner le code de l'application depuis le dépôt github.

2. **Backend**

   - Depuis le dossier /back du projet, lancez la commande npm install pour installez tous les packages.
   - Renommez le fichier .env.example en supprimant le .example et ajoutez vos données personnelles.
   - Une fois fini, lancez la commande nodemon server.
   - Le serveur se connecte au port sélectionné dans le fichier .env, ATTENTION le port doit être différent de 3000.

3. **Frontend**

   - Depuis le dossier /front du projet, lancer la commande npm install pour installer tous les packages.
   - Une fois fini, lancer la commande npm start.
   - Une nouvelle page doit s'ouvrir et le site doit démarrer sur le port 3000.
