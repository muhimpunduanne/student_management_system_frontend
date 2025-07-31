import { GalleryVerticalEnd } from "lucide-react";

interface TeamHeaderProps {
  name: string;
  Logo: React.ElementType;
  collapsed?: boolean;
}

export function TeamHeader({ name, Logo, collapsed }: TeamHeaderProps) {
  return (
    <div className="flex items-center px-4 py-2 space-x-2">
      <Logo className="h-5 w-5 text-primary" />
      {!collapsed && (
        <span className="text-sm font-semibold truncate">{name}</span>
      )}
    </div>
  );
}
