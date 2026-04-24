export const pocketPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: [0, 5, -5, 0],
    transition: { 
      type: "spring" as const, 
      stiffness: 400, 
      damping: 25 
    } 
  }
};

export const cardHover = {
  hover: {
    y: -5,
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(0, 174, 239, 0.5)",
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    backgroundColor: "rgba(255, 215, 0, 0.2)", // Flash Yellow
    transition: { duration: 0.1 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};
