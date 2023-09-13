import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  className: string,
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className
}) => {
  return (
    <span className={twMerge(
      `
      px-1
      rounded-lg
      `, className
    )}>
      {children}
    </span>
  );
}

export default Badge;