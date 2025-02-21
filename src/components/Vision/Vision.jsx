import React from "react";
import { motion } from "framer-motion";
import "./Vision.css";

const Vision = () => {
    return (
        <motion.div
            className="vision-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Left Section - "VISION" Text */}
            <motion.h2
                className="vision-title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                VISION
            </motion.h2>

            {/* Vision Text Content */}
            <motion.div
                className="vision-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
            >
                <p>
                    Living an immersive journey rich in emotions adds flesh and bones and
                    meaning to a digital experience that is all too often cold. Not only does
                    this process perfectly embody the core values of the brand, but the message
                    delivered has a longer, deeper, and more positive influence on the user.
                </p>
                <p>
                    The bringing together of digital creativity and knowledge in neuroscience
                    has written into the DNA of our studio an artisanal know-how at the service
                    of high technology. Each project is imagined and produced on a tailor-made
                    basis, with listening, precision, rigor, originality, and pleasure.
                </p>
                <motion.a
                    href="#"
                    className="see-more"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    → SEE MORE
                </motion.a>
            </motion.div>

            {/* Right Section - Bold Quote */}
            <motion.div
                className="vision-bold"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
            >
                <h1>
                    THE MORE AN EXPERIENCE IS RICH IN MEANING, <br />
                    THE MORE ITS MEANING IS RICH.
                </h1>
            </motion.div>
        </motion.div>
    );
};

export default Vision;
