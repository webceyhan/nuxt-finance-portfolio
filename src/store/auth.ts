import { ref } from 'vue';
import { User } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const user = ref<User | null>(null);
const provider = new GoogleAuthProvider();

// Listen for auth state changes
auth.onAuthStateChanged((state) => (user.value = state));

async function login() {
    await signInWithPopup(auth, provider);
}

async function logout() {
    await auth.signOut();
}

export function useAuth() {
    return { user, login, logout };
}
