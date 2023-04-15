import { RefObject } from 'react';
import { createImageCanvas, Html2CanvasProps } from './useHtml2Canvas';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import firebaseApp from '../firebase/config';
import useFirestore from './useFirestore';

function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export default function useUploadImage(elementRef: RefObject<HTMLDivElement>, props: Html2CanvasProps) {
    const {getUserAnonymousUID} = useFirestore();

    const handleImageUpload = async () => {
        const storage = getStorage(firebaseApp);
        const firestore = getFirestore(firebaseApp);
        const canvas = await createImageCanvas(elementRef, props);
        if (canvas) {
            try {
                const uid = await getUserAnonymousUID();
                const canvasBlob = dataURLtoBlob(canvas.toDataURL());

                // Save image in cloud storage and get a URL
                const filename = 'images/' + new Date().getTime() + '-canvas.png';
                const storageReference = ref(storage, filename);
                await uploadBytesResumable(storageReference, canvasBlob);
                const downloadURL = await getDownloadURL(storageReference);
                
                // Save image URL in cloud storage
                const docRef = await addDoc(collection(firestore, "images"), {
                    uid,
                    filename,
                    downloadURL,
                    createdAt: serverTimestamp(),
                });

                return downloadURL;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    return [
        handleImageUpload,
    ]
}