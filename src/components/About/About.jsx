import { motion } from "framer-motion";
import aboutImage from "/src/assets/man.avif";

import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            {/* Left Side - Text */}
            <motion.div
                className="about-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2>About Us</h2>
                <p>
                    We specialize in crafting unique digital experiences. Our team is dedicated to
                    blending creativity with technology to bring your ideas to life. Let’s build
                    something amazing together.
                </p>
            </motion.div>

            {/* Right Side - Image */}
            <motion.img
                src={aboutImage}
                alt="About Us"
                className="about-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 150 } }}
            />
        </div>
    );
};

export default About;
