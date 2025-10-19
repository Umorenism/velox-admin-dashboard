import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your background images
import pic1 from "../assets/hero.svg";
import pic2 from "../assets/hero.svg";
import pic3 from "../assets/hero.svg";
import pic4 from "../assets/hero.svg";

const images = [pic1, pic2, pic3, pic4];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
