# PuseTycket

Une application mobile React Native pour visualiser, réserver et localiser des événements.

## Fonctionnalités

- **Connexion/Inscription** : Authentifiez-vous pour accéder à l'application.
- **MAp** : Localisez les événements en fonction de leur lieu.
- **Réservations** : Affichez vos réservations et détails des événements.
- **Mise à jour du profil** : Mettez à jour votre email et mot de passe.
- **Détails des événements** : Visualisez les informations complètes d'un événement.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/f4d3l21/PulseTycket.git
   cd PulseTycket
   npm install
   npx react-native run-android   # Pour Android
   npx react-native run-ios       # Pour iOS
   npm install # dependances
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native gesture-handler react-native-reanimated react-native-vector-icons
   npm install react-native-maps
   npm install axios
   npm install @supabase/supabase-js
   ```

2. Dépendances principales :
   - React Navigation : Gestion de la navigation dans l'application.
   - react-native-maps : Intégration de cartes interactives.
   - axios : Requêtes HTTP pour l'API OpenCage.
   - react-native-vector-icons : Utilisation des icônes dans l'application.
   - @supabase/supabase-js : Gestion de l'authentification et des requêtes avec la base de données.

