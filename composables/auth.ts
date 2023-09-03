import { ref } from 'vue';
import { signInWithPopup, GoogleAuthProvider, User, Auth } from 'firebase/auth';

// get auth instance
const auth = useNuxtApp().$auth as Auth;

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
