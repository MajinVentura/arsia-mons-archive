import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  locationKey: string;
}

export default function PageTransition({ children, locationKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0, filter: "brightness(2) saturate(0)" }}
        animate={{ opacity: 1, filter: "brightness(1) saturate(1)" }}
        exit={{ opacity: 0, filter: "brightness(0.5) saturate(0)" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
