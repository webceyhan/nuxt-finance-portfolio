import {
    doc,
    collection,
    getFirestore,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    onSnapshot,
    DocumentReference,
} from 'firebase/firestore';
import { useAuth } from './auth';
import { useFirebase } from './firebase';

type Listener<T> = (data: T) => void;

// get a reference to the database service
const db = getFirestore(useFirebase());

export function useFirestore() {
    return {
        db,
        getUserRef,
    };
}

export function useDocument<T>(path: string, ref?: DocumentReference) {
    // define factory for getting a reference to the document
    //
    // workaround for auth.user.value being null on first load
    // so we make method dynamic to get the user ref on each call
    const docRef = () => doc(ref ?? getUserRef(), path);

    // get the document data
    const get = async () => transformDoc(await getDoc(docRef())) as T;

    // set or update the document data
    const set = (data: any, merge = false) => setDoc(docRef(), data, { merge });

    // remove the document
    const remove = () => deleteDoc(docRef());

    // listen for document changes
    const watch = (listener: Listener<T>) =>
        onSnapshot(docRef(), (snapshot) => listener(transformDoc(snapshot)));

    // exports
    return {
        docRef,
        get,
        set,
        remove,
        watch,
    };
}

export function useCollection<T>(path: string, ref?: DocumentReference) {
    // define factory for getting a reference to the collection
    //
    // workaround for auth.user.value being null on first load
    // so we make method dynamic to get the user ref on each call
    const colRef = () => collection(ref ?? getUserRef(), path);

    /**
     * Find all records in the given collection
     */
    const findAll = async (): Promise<T[]> => {
        const snapshot = await getDocs(colRef());
        return snapshot.docs.map(transformDoc) as T[];
    };

    /**
     * Find a single record in the given collection
     */
    const findOne = async (id: string): Promise<T> => {
        const docRef = doc(colRef(), id);
        const snapshot = await getDoc(docRef);

        return transformDoc(snapshot) as T;
    };

    /**
     * Create or update a record in the given collection
     */
    const saveOne = async ({ id, ...data }: any): Promise<string> => {
        // create a new document if the id is not provided
        if (!id) return (await addDoc(colRef(), data)).id;

        // update the existing document
        const docRef = doc(colRef(), id);
        await setDoc(docRef, data);

        return docRef.id;
    };

    /**
     * Remove a record from the given collection
     */
    const removeOne = async (id: string): Promise<void> => {
        const docRef = doc(colRef(), id);
        deleteDoc(docRef);
    };

    /**
     * Listen for collection changes
     */
    const watch = (listener: Listener<T[]>) =>
        onSnapshot(colRef(), (snapshot) =>
            listener(snapshot.docs.map(transformDoc))
        );

    return {
        colRef,
        findAll,
        findOne,
        saveOne,
        removeOne,
        watch,
    };
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

function getUserRef(): DocumentReference {
    const uid = useAuth().user.value?.uid;
    return doc(db, 'users', uid ?? 'default');
}

function transformDoc(doc: any) {
    // transform the document data to plain object
    return { ...doc.data(), id: doc.id };
}
