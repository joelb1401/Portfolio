import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        id={idName}
      >
        <div className='hash-span' style={{ position: 'absolute', top: '-100px', left: 0 }}>
          &nbsp;
        </div>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;