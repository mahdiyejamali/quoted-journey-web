import { getAuth, signInAnonymously } from "firebase/auth";
import { collection, DocumentData, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import firebaseApp from '../firebase/config';
import {saveAs} from "file-saver";

export default function useFirestore() {
    
    const getUserFavoriteImages = async () => {
        const firestore = getFirestore(firebaseApp);
        const imagesRef = collection(firestore, "images");
        let result: DocumentData[] = [];
    
        try {
            const uid = await getUserAnonymousUID();

            // Create a query against the collection.
            const q = query(imagesRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);

            
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              result.push(doc.data());
            });

            return result;
        } catch(e) {
            console.log('getUserFavoriteImages', e);
        }

        return result;
    }

    const getUserAnonymousUID = async () => {
        const auth = getAuth(firebaseApp);
        try {
            const result = await signInAnonymously(auth);
            return result?.user?.uid;
        } catch (e) {
            console.log('getUserAnonymousUID', e);
        }
    }

    const downloadImage = async (filename: string) => {
        const storage = getStorage();
        getDownloadURL(ref(storage, filename))
        .then(async (url) => {
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                saveAs(blob, 'quote.png')
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch((error) => {
            // Handle any errors
        });
    }

    return {getUserFavoriteImages, getUserAnonymousUID, downloadImage};
}