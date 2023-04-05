import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Kalam } from 'next/font/google'

const roboto = Kalam({
  weight: '700',
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
