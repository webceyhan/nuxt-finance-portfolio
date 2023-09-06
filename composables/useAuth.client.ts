import { User, Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function useAuth() {
    // state
    const auth = useNuxtApp().$auth as Auth;
    const user = useState<User | null>('user', () => auth.currentUser);

    // actions
    const login = () => signInWithPopup(auth, new GoogleAuthProvider());
    const logout = () => auth.signOut();

    // update user stat on login / logout
    const unsubscribe = auth.onAuthStateChanged(
        (state) => (user.value = state)
    );

    // unsubscribe from auth state changes
    onUnmounted(() => unsubscribe());

    return {
        user,
        login,
        logout,
    };
}
