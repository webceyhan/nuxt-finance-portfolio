import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(async (nuxtApp) => {
    // get runtime config params
    const config = useRuntimeConfig();

    // initialize Firebase
    const app = initializeApp(config.public.firebase);

    // get services
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    // wait for auth to be ready
    await auth.authStateReady();

    // inject firebase services
    nuxtApp.provide('auth', auth);
    nuxtApp.provide('firestore', firestore);
});
