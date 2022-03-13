// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
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
import { Transaction } from './models';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDsNBR2PMW6DkSr05gdFu7SGwetoSlOF6U',
    authDomain: 'vite-finance-portfolio.firebaseapp.com',
    projectId: 'vite-finance-portfolio',
    storageBucket: 'vite-finance-portfolio.appspot.com',
    messagingSenderId: '838795714350',
    appId: '1:838795714350:web:1d1f29de4bbb1bf103e4bf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getFirestore(app);

// Get a reference to the collection
const txsCol = collection(db, 'transactions');

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
