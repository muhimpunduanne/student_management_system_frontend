import Image from "next/image";

interface LogoProps {
  style?: React.CSSProperties;
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <Image
      src="https://i.postimg.cc/KvVNz9Kb/Chat-GPT-Image-Jul-27-2025-10-47-30-PM-removebg-preview.png"
      alt="SMS Logo"
      width={32}
      height={32}
      className={`h-8 w-8 ${props.className ?? ""}`}
      style={props.style}
      priority
    />
  );
}
