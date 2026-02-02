import { IconProps } from "@radix-ui/themes"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import {
    BackpackIcon,
    CheckCircledIcon,
    FileIcon,
    GroupIcon,
    ClipboardIcon,
    BookmarkIcon,
    LightningBoltIcon,
    HomeIcon,
    HeartIcon,
    GlobeIcon,
} from "@radix-ui/react-icons"
import { Icon } from "@radix-ui/themes/components/callout"
import styles from "./index.module.scss"

export interface ICategorieProps {
    id: number
    title: string
    desc: string
}

export default function CardCategoria({ title, desc, id }: ICategorieProps) {
    function IconRenderer(icon: number) {
        switch (icon) {
            case 1:
                return <BackpackIcon className={styles.icons} />
            case 2:
                return <CheckCircledIcon className={styles.icons} />
            case 3:
                return <FileIcon className={styles.icons} />
            case 4:
                return <GroupIcon className={styles.icons} />
            case 5:
                return <ClipboardIcon className={styles.icons} />
            case 6:
                return <BookmarkIcon className={styles.icons} />
            case 7:
                return <LightningBoltIcon className={styles.icons} />
            case 8:
                return <HomeIcon className={styles.icons} />
            case 9:
                return <HeartIcon className={styles.icons} />
            case 10:
                return <GlobeIcon className={styles.icons} />
        }
    }

    return (
        <div className={styles.main}>
                <div className={styles.title}>{title} {IconRenderer(id)}</div>
                <div className={styles.desc}>{desc}</div>
        </div>
    )
}
