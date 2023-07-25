'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from '@/components/form/datetimepicker';
import Balancer from "react-wrap-balancer";
import TopicForm from '@/components/form/topicsform';
import { SparklesIcon } from '@heroicons/react/20/solid';
import { outfitTitle } from "@/app/fonts";

const Form = ({ setStage }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const containerRef = useRef(null);
    const [topics, setTopics] = useState({});

    function saveLocalData() {
        localStorage.setItem('deadline', JSON.stringify(selectedDate));
        localStorage.setItem('topics', JSON.stringify(topics));
        console.log(selectedDate);
        console.log(topics);

    }

    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.scrollY;
            const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            let middle = absoluteElementTop - (viewportHeight / 2) + (elementRect.height / 2);
            if (elementId == "element2") {
                middle += 250;
            }
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
        <div className="w-full h-[3200px] relative">
            <div className="w-full h-[3200px] absolute overflow-hidden">
                <div className="right-[10px] top-[150px] absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[120px]" />
                <div className="left-[10px] md:left-[267px] top-[2580px] absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[535px] md:h-[518px] md:blur-[150px]" />
                <div className="left-0 top-[350px] absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[686px] md:h-[679px] md:blur-[150px]" />
                <div className="w-[531px] h-[515px] left-[1144px] top-[1700px] absolute bg-fuchsia-300 rounded-full blur-[150px]" />
            </div>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full h-[3100px] top-[100px] absolute overflow-hidden">
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
                    <DatePicker onChange={handleDateChange} />
                    <button
                        className="flex justify-center items-center w-full p-2 my-10 px-10 my-5 min-w-max text-sm text-center rounded-full backdrop-blur-sm transition-all md:text-base bg-blur-blue/20 hover:bg-blur-blue/80"
                        onClick={() => {
                            scrollToElement('element2');
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" height="30" className="inline text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="element2" className="left-[533px] top-[1596px] absolute">
                <div className="w-[700px] left-0 top-0 absolute bg-neutral-50 rounded-[29px] shadow flex flex-col justify-center py-5 px-5">
                    <TopicForm topics={topics} setTopics={setTopics} />
                    <button
                        className="flex justify-center items-center w-full p-2 px-10 my-3 min-w-max text-sm text-center rounded-full backdrop-blur-sm transition-all md:text-base bg-blur-blue/20 hover:bg-blur-blue/80"
                        onClick={() => {
                            scrollToElement('element3');
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" height="30" className="inline text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <button id="element3" onClick={() => { saveLocalData(); setStage("loading"); }} className="absolute top-[2800px] left-[450px] z-20  flex items-center justify-center space-x-5"
            >
                <div
                    className="group flex items-center justify-center space-x-2 rounded-full border px-3 py-1 md:px-10 md:py-8  bg-btn text-sm text-white transition-colors hover:bg-back-white hover:text-btn hover:bg-opacity-5"
                    rel="noopener noreferrer"
                >

                    <p className="text-xl md:text-5xl"> let's generate </p>
                    <SparklesIcon className='w-10 h-10' />

                </div>
            </button>
        </div>
    </>
}

const Loading = () => {
    const [currentStage, setCurrentStage] = useState(-2);

    let localEmail = localStorage.getItem('email');
    let localTopics = JSON.parse(localStorage.getItem('topics'));
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    let localTiming = JSON.parse(localStorage.getItem('timing'));

    const [payload, setPayload] = useState({ email: localEmail, topics: localTopics });

    const stages = [
        {
            endpoint: '/api/table/first-stage',
        },
        {
            endpoint: '/api/table/second-stage',
        },
        {
            endpoint: '/api/table/third-stage',
        },
        // ...
    ];

    useEffect(() => {
        const proceedToNextStage = async () => {
            if (currentStage === stages.length || currentStage === -1 || currentStage === -2) {
                return;
            }
            const response = await fetch(stages[currentStage].endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                setCurrentStage(-1);
            }
            if (currentStage == 0) {
                response.json().then(data => {
                    localStorage.setItem('topics', JSON.stringify(data));
                    setPayload({ email: localEmail, topics: data })
                    console.log(data);
                    console.log(payload);
                }).catch(function () {
                    console.error();
                    setCurrentStage(-1);
                });
            } else if (currentStage == 1) {
                response.json().then(data => {
                    localStorage.setItem('tasks', JSON.stringify(data));
                    setPayload({ email: localEmail, tasks: data })
                    console.log(data);
                    console.log(payload);
                }).catch(function () {
                    console.error();
                    setCurrentStage(-1);
                });
            } else if (currentStage == 2) {
                response.json().then(data => {
                    localStorage.setItem('timing', JSON.stringify(data));
                    console.log(data);
                }).catch(function () {
                    console.error();
                    setCurrentStage(-1);
                });
            }
            setCurrentStage(currentStage + 1);
        };
        proceedToNextStage();
    }, [payload]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Required for Chrome compatibility
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const variants = {
        jump: {
            y: [0, -10],
            transition: {
                duration: 0.9,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    }
    return <>
        <div>
            {currentStage === -2 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[90%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                        >
                            <Balancer>Oops... We are not ready yet!</Balancer>
                        </h1>
                        <h1
                            className={` text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                        >
                            stay tuned
                        </h1>
                    </div>
                </motion.div >
            )}
            {currentStage === -1 && (
                <div>
                    {/* Render the landing page for the first stage */}
                    something wrong, bitch
                </div>
            )}

            {currentStage === 0 && (
                <div>
                    {/* Render the landing page for the first stage */}
                    analyzing your topics, bitch
                </div>
            )}

            {currentStage === 1 && (
                <div>
                    {/* Render the landing page for the second stage */}
                    creating task for you, bitch
                </div>
            )}

            {currentStage === 2 && (
                <div>
                    {/* Render the landing page for the second stage */}
                    timing for you, bitch
                </div>
            )}
            {currentStage === 3 && (
                <div>
                    {/* Render the landing page for the second stage */}
                    done, bitch
                </div>
            )}

            {/* Repeat the above pattern for each stage */}
        </div>
        <div className="w-full h-full absolute overflow-hidden">
            <motion.div variants={variants}
                animate={"jump"} className="z-20 w-[398px] h-[624px] right-0 top-[-50px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="w-[398px] h-[624px]" src="/form2.png" />
            </motion.div>
            <motion.div variants={variants}
                animate={"jump"} className="z-20 w-[457px] h-[529px] left-0 top-[250px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="w-[457px] h-[529px]" src="/form1.png" />
            </motion.div>
            <div className="left-0 top-[350px] absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[686px] md:h-[679px] md:blur-[150px]" />
            <div className="right-0  top-0 absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[535px] md:h-[518px] md:blur-[150px]" />
        </div>
    </>
}

export default function FormPage() {
    const [stage, setStage] = useState("form")
    return <>
        {stage == "form" ? <Form setStage={setStage} /> : <Loading />}
    </>
}