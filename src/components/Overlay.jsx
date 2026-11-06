import { AnimatePresence, motion } from "motion/react";
import "./Overlay.css";

function Overlay({ children, condition }) {
    return (
        <AnimatePresence>
            {condition && <motion.div
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>}
        </AnimatePresence>
    );
}

export default Overlay;