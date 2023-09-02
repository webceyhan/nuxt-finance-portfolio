import { watch } from 'vue';
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
} from 'firebase/firestore';
import { app } from '../firebase';
import { Transaction } from './types';
import { useAuth } from '../store/auth';

// Get a reference to the database service
const db = getFirestore(app);
const { user } = useAuth();

// Get a reference to the collection
let userRef = doc(db, 'users', 'default');
let txsCol = collection(userRef, 'transactions');

watch(user, () => {
    const uid = user.value?.uid || 'default';
    userRef = doc(db, 'users', uid);
    txsCol = collection(userRef, 'transactions');
});

// transform the document data to plain object
const transformDoc = (doc: any) => ({ ...doc.data(), id: doc.id } as any);

// Get a list of transactions from the database
export async function getTransactions() {
    const txsSnapshot = await getDocs(txsCol);
    return txsSnapshot.docs.map(transformDoc) as Transaction[];
}

// get a single transaction from the database
export async function getTransaction(id: string) {
    const ref = doc(txsCol, id);
    const txSnapshot = await getDoc(ref);
    return transformDoc(txSnapshot) as Transaction;
}

// set a transaction in the database
export async function setTransaction(tx: Partial<Transaction>) {
    const { id, ...data } = tx;

    // create a new document if the id is not provided
    if (!id) return addDoc(txsCol, data);

    // update the existing document
    const ref = doc(txsCol, id as any);
    await setDoc(ref, data);
    return ref;
}

// remove a transaction from the database
export async function removeTransaction(id: string) {
    const ref = doc(txsCol, id);
    await deleteDoc(ref);
}

export function onTransactions(listener: (txs: Transaction[]) => void) {
    onSnapshot(txsCol, (txsSnapshot) => {
        const txs = txsSnapshot.docs.map(transformDoc);
        listener(txs);
    });
}
