import { outfitTitle } from "@/app/fonts";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";

export default function RoadmapLanding() {
    return <><motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-[70%] h-full max-h-[60%] px-5 xl:px-0"
    >
        <div className="w-full flex flex-col justify-around items-center">
            <h1
                className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
            >
                <Balancer>Take the first step towards greatness</Balancer>
            </h1>
            <h1
                className={` text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
            >
                <Balancer>Your active table will be showed here</Balancer>
            </h1>
        </div>
    </motion.div >
        <motion.button
            className="z-20 mx-auto mt-12 flex items-center justify-center space-x-5"
            initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
        >
            <div
                className="group flex items-center justify-center rounded-full border px-3 py-1 md:px-10 md:py-3  bg-btn text-sm text-white transition-colors hover:bg-back-white hover:text-btn hover:bg-opacity-5"
                rel="noopener noreferrer"
            >

                <a href="/form" className="text-xl md:text-3xl"> create! </a>

            </div>
        </motion.button>
        <div className="absolute w-[200px] h-[200px] blur-[60px] left-0 top-[150px] md:left-[200px] md:top-[99px] md:w-[400px] md:h-[400px] bg-blur-blue rounded-full md:blur-[100px]"></div>
        <div className="absolute w-[200px] h-[200px] blur-[60px] right-0 bottom-[150px] md:right-[200px] md:bottom-0 md:w-[400px] md:h-[400px] bg-blur-pink rounded-full md:blur-[100px]"></div>
    </>
}