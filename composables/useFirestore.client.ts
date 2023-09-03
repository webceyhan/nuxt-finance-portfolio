import {
    doc,
    collection,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    onSnapshot,
    DocumentReference,
    query,
    where as _where,
    Firestore,
} from 'firebase/firestore';

type Listener<T> = (data: T) => void;
type Where = { key: string; value?: string };

// get a reference to the database service
const db = useNuxtApp().$firestore as Firestore;

/**
 * Find all records in the given collection
 */
async function findAll<T>(path: string, where?: Where): Promise<T[]> {
    const colRef = getUserColRef(path);
    let q = colRef as any;

    // apply where clause if provided
    if (where?.key && where.value !== undefined) {
        q = query(colRef, _where(where.key, '==', where.value));
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map(transformDoc) as T[];
}

/**
 * Find a single record in the given collection
 */
async function findOne<T>(path: string, id: string): Promise<T> {
    const colRef = getUserColRef(path);
    const docRef = doc(colRef, id);
    const snapshot = await getDoc(docRef);

    return transformDoc(snapshot) as T;
}

/**
 * Create or update a record in the given collection
 */
async function saveOne(path: string, { id, ...data }: any): Promise<string> {
    const colRef = getUserColRef(path);

    // create a new document if the id is not provided
    if (!id) return (await addDoc(colRef, data)).id;

    // update the existing document
    const docRef = doc(colRef, id);
    await setDoc(docRef, data);

    return docRef.id;
}

/**
 * Remove a record from the given collection
 */
async function removeOne(path: string, id: string): Promise<void> {
    const colRef = getUserColRef(path);
    const docRef = doc(colRef, id);

    deleteDoc(docRef);
}

/**
 * Listen for collection changes
 */
function watch<T>(path: string, listener: Listener<T[]>) {
    const colRef = getUserColRef(path);

    return onSnapshot(colRef, (snapshot) =>
        listener(snapshot.docs.map(transformDoc))
    );
}

export function useFirestore() {
    return {
        db,
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

function getUserColRef(path: string) {
    const ref = getUserRef();
    return collection(ref, path);
}

function transformDoc(doc: any) {
    // transform the document data to plain object
    return { ...doc.data(), id: doc.id };
}
