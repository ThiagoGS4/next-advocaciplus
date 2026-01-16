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
  GlobeIcon
} from "@radix-ui/react-icons";
import { Icon } from "@radix-ui/themes/components/callout";

export interface ICategorieProps {
    id: number
    title: string
    desc: string
}

export default function CardCategoria ({title, desc, id}: ICategorieProps) {

  function IconRenderer(icon: number) {
    switch(icon){
      case 1:
        return <BackpackIcon />
      case 2:
        return <CheckCircledIcon />
      case 3:
        return <FileIcon />
      case 4:
        return <GroupIcon />
      case 5:
        return <ClipboardIcon />
      case 6:
        return <BookmarkIcon />
      case 7:
        return <LightningBoltIcon />
      case 8:
        return <HomeIcon />
      case 9:
        return <HeartIcon />
      case 10:
        return <GlobeIcon />
    }
  }

    return (
    <div className="main">
        <li>{title}</li>
        <li>{desc}</li>
        {IconRenderer(id)}
    </div>
    )
}