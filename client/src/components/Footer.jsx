import React from "react";
import { motion, useInView } from "framer-motion";
import { FacebookLogo, TwitterLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, EnvelopeSimple } from "@phosphor-icons/react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const iconVariants = {
    rest: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.3
      }
    }
  };

  const socialIcons = [
    { icon: FacebookLogo, link: "#" },
    { icon: TwitterLogo, link: "#" },
    { icon: YoutubeLogo, link: "#" },
    { icon: InstagramLogo, link: "#" },
    { icon: LinkedinLogo, link: "#" },
    { icon: EnvelopeSimple, link: "#" }
  ];

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      className="bg-black text-white py-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div variants={itemVariants} className="flex justify-center space-x-8">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              className="w-12 h-12 rounded-full flex items-center justify-center group"
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                className="w-full h-full rounded-full flex items-center justify-center bg-transparent group-hover:bg-white transition-colors duration-300"
                variants={iconVariants}
              >
                <social.icon 
                  size={24} 
                  className="text-white group-hover:text-black transition-colors duration-300"
                  weight="fill"
                />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;