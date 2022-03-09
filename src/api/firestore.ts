import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from './firebase';

const db = getFirestore(app);

// Get a list of cities from your database
async function getCities() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());

    return cityList;
}
