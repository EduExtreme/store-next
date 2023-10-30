import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const categoryIcon = {
  keyboards: <KeyboardIcon size={16} />,
  monitors: <MonitorIcon size={16} />,
  headphones: <HeadphonesIcon size={16} />,
  mousepads: <SquareIcon size={16} />,
  speakers: <SpeakerIcon size={16} />,
  mouses: <MouseIcon size={16} />,
};

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      {" "}
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-2 py-3"
      >
        {categoryIcon[category.slug as keyof typeof categoryIcon]}
        <span className="text-xs font-bold">{category.name}</span>
      </Badge>
    </Link>
  );
}
