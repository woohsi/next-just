"use client"

import { twMerge } from "tailwind-merge";

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  children,
  className,
}) => {

  return ( 
    <div className={twMerge(`
      h-fit
      p-6
      text-neutral-400
      text-xs
      `,
      className
    )}>
      { children }
    </div>
   );
}
 
export default Footer