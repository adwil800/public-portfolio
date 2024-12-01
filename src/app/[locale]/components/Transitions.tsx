
"use client";

import {usePathname} from "@/navigation";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: -50 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export function FirstLoadTransition({ children }: { children: React.ReactNode }) {

  return (
    <motion.div 
      initial={"hidden"}
      animate="enter"
      variants={{
        hidden: { opacity: 0, x: 0, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ type: "linear" }}
    >
      {children}
    </motion.div>
  );
  
}

export function PageTransition({ children }: { children: React.ReactNode }) {

  const key = usePathname();

  return (
    <motion.div 
      key={key}
      initial={"hidden"}
      animate="enter"
      variants={variants}
      transition={{ type: "linear" }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
  
}

export function ItemTransition({ children, delay, origin }: { children: React.ReactNode, delay: number, origin: 'up' | 'down' | 'left' | 'right'}) {

  const hiddenY = origin === 'up' ? -50 : origin === 'down' ? 50 : 0;
  const hiddenX = origin === 'left' ? -50 : origin === 'right' ? 50 : 0;
  
  return (
    <motion.div 
      initial={"hidden"}
      animate="enter"
      variants={{
        hidden: { opacity: 0, x: hiddenX, y: hiddenY},
        enter: { opacity: 1, x: 0, y: 0, transition: { delay: delay * 0.15 }},
      }}
      transition={{ type: "linear" }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

