import Image from "next/image"
import { Geist, Geist_Mono } from "next/font/google"
import Head from "next/head"
import { useTranslations } from "next-intl"
import styles from "../styles/Home.module.scss"
import { Box, Flex, TextField } from "@radix-ui/themes"
import {
    EyeClosedIcon,
    EyeOpenIcon,
    LockClosedIcon,
    PersonIcon,
} from "@radix-ui/react-icons"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import { Input } from "@heroui/react"
import { useLogin } from '@/contexts/loginContext';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export default function Home() {
    const t = useTranslations("Login")

    const { signIn } = useLogin()

    const [hasError, setHasError] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    function login() {

    }

    return (
        <>
            <Head>
                <title></title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/" />
            </Head>
            <main
                className={styles.mainStyle}
                style={{ background: "var(--login-background)" }}
            >
                <div className={styles.banner}>
                    <h1>Bem Vindo(a) ao Adivocaciplus</h1>

                    <Image
                        fill
                        style={{
                            objectFit: "cover",
                            objectPosition: "0 rem center",
                        }}
                        src="/adv-login.jpg"
                        alt="adivocaciplus banner"
                    />
                </div>
                <div className={styles.loginContainer}>
                    {/* parei aqui (05/01/26) preciso terminar essa página de login, depois proceser para dentro do app */}

                    <Box maxWidth="200px">
                        <Input
                            color={hasError ? "danger" : "success"}
                            placeholder={t("userPlaceholder")}
                            variant="bordered"
                            startContent={<PersonIcon />}
                            onChange={({ target }) => setUsername(target.value)}
                            onKeyDown={({ key }) => {
                                if (key === "Enter") login()
                            }}
                        ></Input>
                    </Box>

                    <Box maxWidth="200px">
                        <Input
                            color={hasError ? "danger" : "success"}
                            placeholder={t("passwordPlaceholder")}
                            type={passwordShow ? "text" : "password"}
                            startContent={<LockClosedIcon />}
                            onKeyDown={({ key }) => {
                                if (key === "Enter") login()
                            }}
                            onChange={({ target }) => setPassword(target.value)}
                            endContent={
                                passwordShow ? (
                                    <EyeOpenIcon
                                        onClick={() =>
                                            setPasswordShow(!passwordShow)
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                ) : (
                                    <EyeClosedIcon
                                        onClick={() =>
                                            setPasswordShow(!passwordShow)
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                )
                            }
                            variant="bordered"
                        />
                    </Box>
                    <Box maxWidth="200px">
                        <button onClick={login}></button>
                    </Box>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            messages: (await import(`@/locales/${context.locale}.json`))
                .default, //importando arquivo json com traduções dependendp do local
        },
    }
}
