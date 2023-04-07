import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

import { Kalam } from 'next/font/google'

const roboto = Kalam({
  weight: '700',
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
