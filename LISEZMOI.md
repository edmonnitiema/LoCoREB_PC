# LoCoREB – application Windows

Logiciel de Compilation des Résultats des Examens Blancs, version ordinateur (Windows 10/11, 64 bits).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `app/LoCoREB.html` | L'application (la même que la version navigateur) |
| `main.js`, `preload.js` | Fenêtre Windows, boîte « Enregistrer sous » pour les PDF et les sauvegardes |
| `package.json` | Configuration de la construction du .exe |
| `build/icon.ico`, `build/icon.png` | Logo de l'application : icône du raccourci, de l'installateur et de la fenêtre |
| `.github/workflows/build-windows.yml` | Construction automatique du .exe sur GitHub |

## Construire le .exe avec GitHub (comme LoGeNo)

1. Créez un dépôt GitHub privé nommé `LoCoREB`.
2. Envoyez-y **tout le contenu de ce dossier**, y compris le dossier caché `.github`
   (si `.github` ne passe pas par glisser-déposer : « Add file » > « Create new file », nom `.github/workflows/build-windows.yml`, puis collez le contenu du fichier).
3. Onglet **Actions** > « Construire LoCoREB pour Windows » > **Run workflow** (la construction démarre aussi à chaque envoi de fichiers).
4. Après 3 à 5 minutes, ouvrez l'exécution terminée, section **Artifacts**, téléchargez `LoCoREB-Windows`.
5. Dans le zip :
   - `LoCoREB-Installateur-1.1.0.exe` : installe l'application et crée automatiquement un **raccourci LoCoREB sur le Bureau**, avec le logo de l'application ;
   - `LoCoREB-Portable-1.1.0.exe` : fonctionne sans installation, par exemple depuis une clé USB (même logo, pas de raccourci automatique).

## Raccourci sur le Bureau et logo

Après l'installation avec `LoCoREB-Installateur-1.1.0.exe` :

- un raccourci **LoCoREB** apparaît sur le Bureau, avec le **logo de l'application** (carré vert, trois barres blanches, trait rouge et le nom LoCoREB) ;
- le même logo s'affiche dans le menu Démarrer, dans la barre des tâches, dans la fenêtre et dans le programme de désinstallation ;
- double-cliquez sur le raccourci pour lancer l'application.

Le logo vient du fichier `build/icon.ico` (tailles 16 à 256 pixels). Pour changer de logo, remplacez `build/icon.ico` et `build/icon.png` par vos nouveaux fichiers, puis reconstruisez le .exe.

Si le raccourci du Bureau affiche encore une ancienne icône après une mise à jour, Windows garde parfois l'ancienne image en mémoire : supprimez le raccourci, puis relancez l'installateur, ou redémarrez l'explorateur Windows (Ctrl + Maj + Échap > « Explorateur Windows » > Redémarrer).

## Construire le .exe sur un ordinateur Windows (option)

Avec [Node.js](https://nodejs.org) installé, dans ce dossier :

```
npm install
npm run dist
```

Les fichiers .exe apparaissent dans le dossier `dist`. Pour simplement tester sans construire : `npm start`.

## Licence

Au premier lancement, l'application affiche un **identifiant** (10 caractères) propre à l'ordinateur.
Cliquez sur « Envoyer l'identifiant par WhatsApp » (ou « Copier l'identifiant ») pour l'envoyer au fournisseur, puis collez le code reçu et cliquez sur « Activer ».
Un bandeau apparaît 30 jours avant l'expiration ; la page Identification permet de prolonger avec un nouveau code.
Les codes sont ceux de votre générateur habituel (même clé que LoGeNo, signature « LOGEB1 »). Après expiration, les données sont conservées mais l'application reste bloquée jusqu'à un nouveau code.

## Enregistrer et exporter

- **Exporter en PDF** (Saisie des résultats, Résultats, Ordre de mérite, Comparatif) : une boîte « Enregistrer sous » s'ouvre, puis le PDF s'ouvre dans votre lecteur PDF, prêt à imprimer ou à envoyer.
- **Sauvegarde** (page Identification) : enregistre un fichier `.json` à garder ; « Restaurer un fichier » le recharge sur un autre ordinateur. La licence n'est pas incluse dans la sauvegarde.
- Les données de saisie sont conservées sur l'ordinateur, dans le profil de l'utilisateur Windows.

## Remarque à l'installation

Windows peut afficher « Windows a protégé votre ordinateur » car l'application n'est pas signée numériquement : cliquez sur **Informations complémentaires**, puis **Exécuter quand même**.
