import { ref } from 'vue';
import { User } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

// get auth instance
const auth = getAuth(app);

// define user ref
const user = ref<User | null>(null);

// define default auth provider
const provider = new GoogleAuthProvider();

// listen for auth state changes
auth.onAuthStateChanged((state) => (user.value = state));

async function login() {
    signInWithPopup(auth, provider);
}

async function logout() {
    auth.signOut();
}

function onAuthChanged(listener: (user: User | null) => void) {
    auth.onAuthStateChanged(listener);
}

export function useAuth() {
    return {
        user,
        login,
        logout,
        onAuthChanged,
    };
}
