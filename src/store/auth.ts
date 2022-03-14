import { ref } from 'vue';
import { User } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const user = ref<User | null>(null);
const loading = ref(false);
const provider = new GoogleAuthProvider();

// Listen for auth state changes
auth.onAuthStateChanged((state) => (user.value = state));

async function login() {
    loading.value = true;
    await signInWithPopup(auth, provider);
    loading.value = false;
}

async function logout() {
    loading.value = true;
    await auth.signOut();
    loading.value = false;
}

export function useAuth() {
    return { user, loading, login, logout };
}
