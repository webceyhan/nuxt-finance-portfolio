<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/vite-finance-portfolio/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/webceyhan/vite-finance-portfolio/actions/workflows/codeql-analysis.yml)
[![Deploy to Firebase](https://github.com/webceyhan/vite-finance-portfolio/actions/workflows/firebase.yml/badge.svg)](https://github.com/webceyhan/vite-finance-portfolio/actions/workflows/firebase.yml)

<!-- LOGO (OPTIONAL) -->

<!-- <img src="./src/assets/logo.png" width="100px"> -->

 <!-- HEADER ///////////////////////////////////////////////////////////// -->

# Finance Portfolio + Vite + Vue + DaisyUI + Firebase

This is a simple finance portfolio application to track your assets based on your transactions which demonstrates Firebase Authentication and Firestore database.

Home page contains a list of all the assets with their current value fetched from CollectAPI. And it's the only page that is accessible without logging in.

When user logs in (using Google Auth) he'll get addtional functionality like adding new assets, editing existing ones, deleting them and also adding new transactions.
Transaction data will be stored in Firestore database.

On "My Portfolio" page user can see a summary of his holdings with his total balance, profit/loss and a list of all his transactions.

[View Demo](https://vite-finance-portfolio.web.app/) |
[Report Issue](https://github.com/webceyhan/vite-finance-portfolio/issues) |
[Request Feature](https://github.com/webceyhan/vite-finance-portfolio/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

<br>
<!-- REQUIREMENTS /////////////////////////////////////////////////////// -->

## Requirements

You need to install the [Node.js](https://nodejs.dev/)
and `npm` package manager first.

Create an account on [CollectAPI](https://collectapi.com/) 
and subscribe to "Gold, Currency and Exchange API" to obtain your free API key.

> Recommended IDE:
> [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

<br>
<!-- INSTALLATION //////////////////////////////////////////////////////// -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/vite-finance-portfolio.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd vite-finance-portfolio
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```
4. Rename .env.sample to .env and fill in your config vars.
    ```sh
    # collectapi
    VITE_API_KEY="--CollectAPI KEY HERE--"

    # firebase
    VITE_FIREBASE_API_KEY="--FIREBASE API KEY HERE--"
    VITE_FIREBASE_AUTH_DOMAIN="--FIREBASE AUTH DOMAIN HERE--"
    VITE_FIREBASE_PROJECT_ID="--FIREBASE PROJECT ID HERE--"
    VITE_FIREBASE_STORAGE_BUCKET="--FIREBASE STORAGE BUCKET HERE--"
    VITE_FIREBASE_MESSAGING_SENDER_ID="--FIREBASE MESSAGING SENDER ID HERE--"
    VITE_FIREBASE_APP_ID="--FIREBASE APP ID HERE--"
    ```

<br>
<!-- USAGE /////////////////////////////////////////////////////////////// -->

## Usage

You can use following commands to do various task with the project.

```sh
npm start               # run application
npm run dev             # start development server
npm run build           # build for production
npm run preview         # preview built app
```

> Take a look at the other scripts in [`package.json`](./package.json)

<br>
<!-- DEVELOPMENT ///////////////////////////////////////////////////////// -->

## Development

You have to run both backend server and frontend development server concurrently to be able to develop application properly.

```sh
npm run dev
```

<br>
<!-- BUILDING //////////////////////////////////////////////////////////// -->

## Building

Build the frontend application for production.

```sh
npm run build
```

To preview, you still have to run the backend server which will serve the app and provide socket connectivity in order to make it work properly.

```sh
npm run preview
```

<br>
<!-- DEPLOYMENT ////////////////////////////////////////////////////////// -->

## Deployment (Firebase)

A GitHub Action will automatically deploy the project to Firebase on every push.

> See the details in [.github/workflows/firebase.yml](./.github/workflows/firebase.yml)

1. Create a [Firebase](https://firebase.google.com/) account.

2. Install the `firebase-cli` globally.

    ```sh
    npm install -g firebase-tools
    ```

3. Initialize new Firebase project inside your project folder.

    ```sh
    firebase init
    
    # Configure files for Firebase Hosting and (optionally) st up GitHub Action deploys

        # ? What do you want to use as your public directory? dist

        # ? Configure as a single-page app (rewrite all urls to /index.html)? Yes

        # ? Set up automatic builds and deploys with GitHub? Yes

        # ? File dist/index.html already exists. Overwrite? No

        # ? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) webceyhan/vue-splendid-food

        # ? Set up the workflow to run a build script before every deploy? Yes
    ```

    > This will create a new application on Firebase cloud, a firebase.json configuration for hosting and a GitHub Action for deployment, inside your project folder.

    > It also generates the required secrets in your GitHub repository as follows;

    ```yaml
    FIREBASE_SERVICE_ACCOUNT_VITE_FINANCE_PORTFOLIO
    ```

4. Set the following secrets on your GitHub repository:
    ```yaml
    VITE_API_KEY
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_APP_ID
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET
    ```

<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [Vite](https://vitejs.dev/)
-   [Vue.js](https://vuejs.org/)
-   [DaisyUI](https://daisyui.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Firestore](https://firebase.google.com/docs/firestore)
-   [Firebase Auth](https://firebase.google.com/docs/auth)
-   [Firebase CLI](https://firebase.google.com/docs/cli)
-   [GitHub Actions](https://docs.github.com/en/actions)
    -   [Firebase](https://firebase.google.com/)
    -   [Firebase Hosting](https://firebase.google.com/docs/hosting/)
    -   [action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy)
-   [CollectAPI](https://collectapi.com/)
