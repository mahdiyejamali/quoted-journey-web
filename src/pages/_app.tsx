import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import firebaseApp from '../firebase/config';


export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    signInAnonymously(auth)
      .then(() => {
        // Anonymous user is signed in.
      })
      .catch((error) => {
        // Handle errors here.
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
      } else {
        // User is signed out
      }
    });
  }, [])

  return (
    <Provider store={store}>
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
