import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
    // get runtime config params
    const config = useRuntimeConfig();

    // initialize Firebase
    const app = initializeApp(config.public.firebase);

    // inject firebase to the context
    nuxtApp.provide('auth', getAuth(app));
    nuxtApp.provide('firestore', getFirestore(app));
});
