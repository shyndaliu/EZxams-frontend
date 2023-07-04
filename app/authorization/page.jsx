import { Google } from "@/components/shared/icons"

export default function Authorization() {
    return <>
        <div className="z-10 w-full max-w-[65%] md:max-w-[60%] h-full max-h-[60%] px-10 py-10 bg-purple bg-opacity-20 flex flex-col justify-around items-center rounded-[50px]">
            <div className="w-[200px] h-[200px] rounded-full bg-back-white my-5"></div>
            <a
                className="group flex items-center justify-center space-x-2 rounded-full border px-3 py-1  my-5 md:px-10 md:py-8  bg-white text-sm text-title-violet transition-colors hover:bg-title-violet hover:text-back-white"
                href="/authorization"
                rel="noopener noreferrer"
            >
                <svg class="h-12 w-12 mx-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg>
                <p className="text-xl md:text-5xl pb-2"> sign in with google calendar </p>

            </a>
        </div>
        <div className="absolute w-[200px] h-[200px] blur-[60px] right-0 top-[150px] md:right-[200px] md:top-[99px] md:w-[400px] md:h-[400px] bg-blur-blue rounded-full md:blur-[100px]"></div>
        <div className="absolute w-[200px] h-[200px] blur-[60px] left-0 bottom-[150px] md:left-[200px] md:bottom-0 md:w-[400px] md:h-[400px] bg-blur-pink rounded-full md:blur-[100px]"></div>
    </>

}