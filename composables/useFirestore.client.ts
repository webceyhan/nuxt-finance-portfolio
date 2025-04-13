import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  where as _where,
  Firestore,
} from "firebase/firestore";

type Listener<T> = (data: T) => void;
type Where = { key: string; value?: string };

export function useFirestore() {
  // get a reference to the database service
  const db = useNuxtApp().$firestore as Firestore;

  // get the current user id or use 'guest' as default
  const uid = computed(() => useAuth().user.value?.uid ?? "guest");

  // get reference to auth user document
  const userRef = computed(() => doc(db, "users", uid.value));

  /**
   * Find all records in the given collection
   */
  async function findAll<T>(path: string, where?: Where): Promise<T[]> {
    const colRef = collection(userRef.value, path);
    let q: ReturnType<typeof query> | null = null;

    // apply where clause if provided
    if (where?.key && where.value !== undefined) {
      q = query(colRef, _where(where.key, "==", where.value));
    }
    const snapshot = await getDocs(q ?? colRef);

    return snapshot.docs.map(transformDoc) as T[];
  }

  /**
   * Find a single record in the given collection
   */
  async function findOne<T>(path: string, id: string): Promise<T> {
    const colRef = collection(userRef.value, path);
    const docRef = doc(colRef, id);
    const snapshot = await getDoc(docRef);

    return transformDoc(snapshot) as T;
  }

  /**
   * Create or update a record in the given collection
   */
  async function saveOne(path: string, { id, ...data }: any): Promise<string> {
    const colRef = collection(userRef.value, path);

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
    const colRef = collection(userRef.value, path);
    const docRef = doc(colRef, id);

    deleteDoc(docRef);
  }

  /**
   * Listen for collection changes
   */
  function onChange<T>(path: string, listener: Listener<T[]>) {
    const colRef = collection(userRef.value, path);

    return onSnapshot(colRef, (snapshot) =>
      listener(snapshot.docs.map(transformDoc))
    );
  }

  return {
    db,
    findAll,
    findOne,
    saveOne,
    removeOne,
    onChange,
  };
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

function transformDoc(doc: any) {
  // transform the document data to plain object
  return { ...doc.data(), id: doc.id };
}
