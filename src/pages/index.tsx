import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useTranslations } from "next-intl";
import styles from '../styles/Home.module.scss'
import { Box, Flex, TextField } from "@radix-ui/themes";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const t = useTranslations('Login')

  const [hasError, setHasError] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
      </Head>
      <main className={styles.mainStyle}>
        <div className={styles.banner}>
          <Image
          fill
          style={{objectFit: "cover", objectPosition:"0 rem center"}}
          src='/adv-login.jpg'
          alt="adivocaciplus banner"
          />
        </div>
        <div className={styles.loginContainer}>

          {/* parei aqui (05/01/26) preciso terminar essa página de login, depois proceser para dentro do app */}

          <Box maxWidth="200px">
          <TextField.Root color={hasError ? 'red' : 'indigo'} placeholder={t("userPlaceholder")}>
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>
          </Box>

          <Box maxWidth="200px">
          <TextField.Root color={hasError ? 'red' : 'indigo'} placeholder={t("passwordPlaceholder")} type={passwordShow ? 'text': 'password'}>
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
          </TextField.Root>
          </Box>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  return{
    props: {
       messages: (await import(`@/locales/${context.locale}.json`)).default //importando arquivo json com traduções dependendp do local
    }
  }
  
}