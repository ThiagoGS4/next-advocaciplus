import CardCategoria, { ICategorieProps } from "@/components/CardCategoria"
import styles from "./index.module.scss"
import { api } from "@/services/api"
import { useEffect, useState } from "react"

export default function Categorias() {
    const [listCategories, setListCategories] = useState<ICategorieProps[]>()
    useEffect(() => {
        async function fetchData() {
            const response = (await api.get("/categories")) as ICategorieProps[]

            console.log("response -> ", response)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setListCategories((response as any).data ?? response)
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="h-screen w-screen">
                <h2 className={styles.title}>Categorias Profissionais</h2>
                <div className={styles.cards}>
                    {listCategories?.map((categorie) => (
                        <CardCategoria
                            key={categorie.id}
                            title={categorie.title}
                            desc={categorie.desc}
                            id={categorie.id}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
