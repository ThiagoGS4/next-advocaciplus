import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';
import '@radix-ui/themes/styles.css';
import {LoginContextProvider} from '@/contexts/LoginContext'


const inter = Inter ({subsets: ['latin']})

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const router = useRouter();
  const lang = router.locale ?? 'en_US';
  return (
    <NextIntlClientProvider
      locale={lang}
      timeZone="America/Sao_Paulo"
      messages={pageProps.messages}
    >
      <LoginContextProvider session={session}>
        <Component className={inter.className} {...pageProps} />
      </LoginContextProvider>
  
  </NextIntlClientProvider>
  /* parei aqui, preciso começar a fazer o layou aqui em _app.tsx, depois fazer o home (provavelmente login) */
)
}
