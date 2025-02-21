import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS file

export default function Navbar() {
    return (
        <motion.nav
            className="navbar"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Logo / Title */}
            <motion.h1 className="logo" whileHover={{ scale: 1.1 }} >
                PHA5E
            </motion.h1>

            {/* Navigation Links */}
            <div className="nav-links">
                {["Our vision", "Our team", "Our projects", "Contact us", "FR/EN"].map((item, index) => (
                    <motion.a
                        key={index}
                        href={`#${item.toLowerCase()}`}
                        className="nav-link"
                        whileHover={{ scale: 1.1 }}
                    >
                        {item}
                    </motion.a>
                ))}
            </div>
        </motion.nav>
    );
}
