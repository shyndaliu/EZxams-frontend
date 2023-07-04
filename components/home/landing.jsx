import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { outfitTitle } from "@/app/fonts";
import { DEPLOY_URL } from "@/lib/constants";

export default function Landing() {
  return (
    <>

      <div className="z-10 w-full max-w-[65%] h-full max-h-[60%] px-5 xl:px-0">

        <div className="w-full flex flex-row justify-around items-center">
          <h1
            className={outfitTitle.className + " animate-fade-up bg-title-violet bg-clip-text text-left font-display text-4xl tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-8xl md:leading-[6rem]"}
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer>Take your time.
              Work smart.
              Destroy deadlines.</Balancer>
          </h1>
          <Image
            src="/nikuu1.png"
            alt="start page"
            width={360}
            height={336}
          ></Image>
        </div>
        <div
          className="mx-auto mt-12 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex items-center justify-center space-x-2 rounded-full border px-3 py-1 md:px-10 md:py-8  bg-btn text-sm text-white transition-colors hover:bg-back-white hover:text-btn hover:bg-opacity-5"
            href="/authorization"
            rel="noopener noreferrer"
          >
            <p className="text-xl md:text-5xl"> get started </p>
            <svg className="w-12 h-12 pt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>

          </a>
        </div>
      </div>
      <div className="absolute w-[200px] h-[200px] blur-[60px] left-0 top-[150px] md:left-[200px] md:top-[99px] md:w-[400px] md:h-[400px] bg-blur-blue rounded-full md:blur-[100px]"></div>
      <div className="absolute w-[200px] h-[200px] blur-[60px] right-0 bottom-[150px] md:right-[200px] md:bottom-0 md:w-[400px] md:h-[400px] bg-blur-pink rounded-full md:blur-[100px]"></div>
    </>
  )
}