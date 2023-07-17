'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import DatePicker from '@/components/form/datetimepicker';
import Balancer from "react-wrap-balancer";
import TopicForm from '@/components/form/topicsform';

export default function Form() {
    const containerRef = useRef(null);

    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.scrollY;
            const middle = absoluteElementTop - window.innerHeight / 2 + 100;
            window.scrollTo({ top: middle, behavior: 'smooth' });
        }
    }

    const variants = {
        jump: {
            y: [0, -20],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    }
    return <>
        <div className="w-full h-[4179px] relative">
            <div className="w-full h-[4422px] absolute overflow-hidden">
                <div className="right-[10px] top-[150px] absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[120px]" />
                <div className="left-[10px] md:left-[267px] top-[2580px] absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[535px] md:h-[518px] md:blur-[150px]" />
                <div className="left-0 top-[350px] absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[686px] md:h-[679px] md:blur-[150px]" />
                <div className="w-[752px] h-[758px] left-[59px] top-[3800px] absolute bg-blur-pink rounded-full blur-[150px]" />
                <div className="w-[531px] h-[515px] left-[1144px] top-[1700px] absolute bg-fuchsia-300 rounded-full blur-[150px]" />
            </div>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full h-[3900px] top-[100px] absolute overflow-hidden">
                <div className="w-[464px] h-[496px] left-0 top-[3400px] absolute origin-top-left flex-col justify-center items-center inline-flex">
                    <img className="w-[464px] h-[496px]" src="/form5.png" />
                </div>
                <div className="w-[486px] h-[633px] left-0 top-[1650px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[486px] h-[633px]" src="/form3.png" />
                </div>
                <div className="w-[398px] h-[624px] right-0 top-[900px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[398px] h-[624px]" src="/form2.png" />
                </div>
                <div className="w-[457px] h-[529px] top-[150px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[457px] h-[529px]" src="/form1.png" />
                </div>
                <div className="w-[473px] h-[509px] right-0 top-[2464px] absolute origin-top-left  justify-center items-center inline-flex">
                    <img className="w-[473px] h-[509px]" src="/form4.png" />
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }} className="absolute pl-[50%] pr-[5%] pt-[20%] flex flex-col items-center justify-center text-right text-title-violet text-4xl md:pt-[8%] md:text-8xl">
                <Balancer><p>It seems that you are having an exam soon...</p></Balancer>
                <motion.button
                    variants={variants}
                    animate={"jump"}
                    className="flex justify-center items-center w-full p-2 my-10 px-10 my-5 min-w-max text-sm text-center rounded-full backdrop-blur-sm transition-all md:text-base bg-blur-blue/20 hover:bg-blur-blue/80"
                    onClick={() => scrollToElement('element1')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" height="30" className="inline text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
                    </svg>
                </motion.button>

            </motion.div>

            <div id="element1" className="left-[533px] top-[800px] absolute">
                <div className="bg-neutral-50 rounded-[29px] drop-shadow-xl flex flex-col justify-center w-[616px] px-10 pt-10 pb-5">
                    <p className="text-gray-800 text-5xl py-5">What is your deadline?</p>
                    <DatePicker></DatePicker>
                    <div className='flex justify-end py-3'>
                        <button className='px-4 py-1 border-gray-300 border-2 bg-btn/5 text-gray-800 text-xl rounded-3xl hover:bg-btn hover:text-white hover:border-btn transition-colors'
                            onClick={() => scrollToElement('element2')}>
                            next
                        </button>
                    </div>
                </div>
            </div>

            <div id="element2" className="left-[533px] top-[1596px] absolute">
                <TopicForm />
            </div>

            {/* <div id="element2" className="left-[533px] top-[1596px] absolute">
                <div className="w-[616px] h-[272px] left-0 top-0 absolute">
                    <div className="w-[616px] h-[272px] left-0 top-0 absolute bg-neutral-50 rounded-[29px] shadow" />
                    <div className="w-[536px] h-[45px] left-[37px] top-[170px] absolute">
                        <div className="w-[536px] h-[45px] left-0 top-0 absolute bg-gray-200 rounded-2xl" />
                        <div className="left-[31px] top-[13px] absolute text-right text-zinc-700 text-[20px] font-normal leading-tight">Enter your name...</div>
                    </div>
                </div>
                <div className="w-[428px] h-[100px] left-[39px] top-[36px] absolute text-purple-900 text-[48px] font-semibold leading-10">First of all, how can i call you?</div>
            </div> */}
        </div>
    </>
}