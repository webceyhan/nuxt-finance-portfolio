import {
    User,
    Auth,
    Unsubscribe,
    NextOrObserver,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

type Listener = NextOrObserver<User | null>;

// define default auth provider
const provider = new GoogleAuthProvider();

export function useAuth() {
    // state
    let unsubscribe: Unsubscribe;
    const auth = useNuxtApp().$auth as Auth;
    const user = useState<User | null>('auth_user', () => null);

    // actions
    const login = () => signInWithPopup(auth, provider);
    const logout = () => auth.signOut();
    const onAuthChanged = (listener: Listener) =>
        auth.onAuthStateChanged(listener);

    // listen for auth state changes
    onMounted(() => {
        unsubscribe = auth.onAuthStateChanged((state) => (user.value = state));
    });

    // unsubscribe from auth state changes
    onUnmounted(() => unsubscribe());

    return {
        user,
        login,
        logout,
        onAuthChanged,
    };
}
