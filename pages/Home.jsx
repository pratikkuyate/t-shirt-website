import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../src/store";
import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
  slideAnimation,
} from "../src/config/config/motion";
import Image from "next/image";
import { CustomButton } from "../src/components";

const Hero = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="../public/threejs.png"
              alt="threejs"
              className="w-8 h-8 object-contain"
              width={100}
              height={100}
            />
          </motion.header>
          <motion.div className="home-container" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" />
                DO IT.
              </h1>
            </motion.div>
            <motion.div>
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our new 3D customization tool.{" "}
                <strong>Unleash your imagination</strong> and define your own style.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Hero;
