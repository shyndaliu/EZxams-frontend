'use client';
import Balancer from "react-wrap-balancer";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { outfitTitle } from "@/app/fonts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";



export default function Landing() {
  const [signInClicked, setSignInClicked] = useState(false);
  let [showSignIn, setshowSignIn] = useState(false)
  return (
    <>
      <AnimatePresence>
        {!showSignIn && <motion.div
          key="welcome"
          className="z-10 w-full max-w-[70%] h-full max-h-[60%] px-5 xl:px-0"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: "150%" }}>
          <div className="w-full flex flex-row justify-around items-center">
            <div className="w-3/5">
              <h1
                className={`${outfitTitle.className} text-title-violet text-left font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]`}
              >
                <Balancer>Take your time.
                  Work smart.
                  Destroy deadlines.</Balancer>
              </h1>
            </div>
            <div className="w-2/5 h-full">
              <Image
                src="/nikuu1.png"
                alt="start page"
                quality={100}
                layout="responsive"
                width={500}
                height={500}
                objectFit="contain"
              />
            </div>
          </div>
        </motion.div >}

        {showSignIn && <motion.div className="z-10 absolute w-full flex justify-center"
          key="signin"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}>
          <div className="z-10 w-full max-w-[70%] md:max-w-[70%] h-full max-h-[60%] px-10 py-10 bg-purple bg-opacity-20 flex flex-col justify-around items-center rounded-[50px]">

            <div className="w-[200px] h-[200px] rounded-full bg-back-white my-5"></div>

            <button
              disabled={signInClicked}
              className={`${signInClicked
                ? "cursor-not-allowed"
                : ""
                } group flex items-center justify-center space-x-2 rounded-full border px-3 py-1  my-5 md:px-10 md:py-8  bg-white text-sm text-title-violet transition-colors hover:bg-title-violet hover:text-back-white`}
              onClick={() => {
                setSignInClicked(true);
                signIn("google");
              }}
            >
              {signInClicked ? (
                <>
                  <div className="xl:px-80 xl:py-5">
                    <LoadingDots color="#808080" />
                  </div>
                </>
              ) : (
                <>
                  <svg class="h-12 w-12 mx-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg>
                  <p className="text-xl md:text-5xl pb-2"> sign in with google calendar </p>
                </>
              )}
            </button>
          </div>
        </motion.div>}

      </AnimatePresence >
      {!showSignIn && <button
        onClick={() => setshowSignIn(!showSignIn)}
        className="z-20 mx-auto mt-12 flex items-center justify-center space-x-5"
      >
        <div
          className="group flex items-center justify-center space-x-2 rounded-full border px-3 py-1 md:px-10 md:py-8  bg-btn text-sm text-white transition-colors hover:bg-back-white hover:text-btn hover:bg-opacity-5"
          rel="noopener noreferrer"
        >

          <p className="text-xl md:text-5xl"> get started </p>
          <svg className="w-12 h-12 pt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>

        </div>
      </button>
      }
      <div className="absolute w-[200px] h-[200px] blur-[60px] left-0 top-[150px] md:left-[200px] md:top-[99px] md:w-[400px] md:h-[400px] bg-blur-blue rounded-full md:blur-[100px]"></div>
      <div className="absolute w-[200px] h-[200px] blur-[60px] right-0 bottom-[150px] md:right-[200px] md:bottom-0 md:w-[400px] md:h-[400px] bg-blur-pink rounded-full md:blur-[100px]"></div>
    </>
  )
}