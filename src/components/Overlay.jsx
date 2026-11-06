import { motion } from "motion/react";
import "./Overlay.css";

function Overlay({ children }) {
    return (
        <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

export default Overlay;