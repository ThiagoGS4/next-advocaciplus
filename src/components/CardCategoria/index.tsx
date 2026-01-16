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

export const iconMap: Record<string, ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>> = {
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
};

export interface ICategorieProps {
    id?: number
    title: string
    desc: string
    icon: keyof typeof iconMap;
}

export default function CardCategoria ({title, desc, icon}: ICategorieProps) {
    return (
    <div className="main">
        <li>{title}</li>
        <li>{desc}</li>
        <Icon>{icon}</Icon>
    </div>
    )
}