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
        <div className="w-full h-[2350px] md:h-[3200px] relative">
            <div className="w-full h-[2300px] md:h-[3200px] absolute overflow-hidden">
                <div className="absolute bg-blur-blue rounded-full right-[10px] top-[150px] w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[120px]" />
                <div className="absolute bg-blur-blue rounded-full left-[10px] md:left-[267px] top-[1700px] md:top-[2580px] w-[200px] h-[200px] blur-[100px] md:w-[535px] md:h-[518px] md:blur-[150px]" />
                <div className="absolute bg-blur-pink rounded-full left-0 top-[400px] md:top-[350px]  w-[200px] h-[200px] blur-[100px] md:w-[686px] md:h-[679px] md:blur-[150px]" />
                <div className="absolute bg-fuchsia-300 rounded-full right-0 md:left-[1144px] top-[1000px]  w-[200px] h-[200px] blur-[80px]  md:w-[531px] md:h-[515px] md:top-[1700px]  md:blur-[150px]" />
            </div>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full h-[2350px] md:h-[3100px] top-[100px] absolute overflow-hidden">
                <div className="md:w-[486px] md:h-[633px] left-0 top-[1500px] md:top-[1650px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[240px] h-[312px] md:w-[486px] md:h-[633px]" src="/form3.png" />
                </div>
                <div className="w-[200px] h-[312px] md:w-[398px] md:h-[624px] right-0 top-[900px] md:top-[900px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[200px] h-[312px] md:w-[398px] md:h-[624px] " src="/form2.png" />
                </div>
                <div className="w-[220px] h-[266px]  md:w-[457px] md:h-[529px] top-[300px] md:top-[150px] absolute origin-top-left justify-center items-center inline-flex">
                    <img className="w-[220px] h-[266px] md:w-[457px] md:h-[529px]" src="/form1.png" />
                </div>
                <div className="w-[235px] h-[250px] md:w-[473px] md:h-[509px] right-0 top-[2100px] md:top-[2464px] absolute origin-top-left  justify-center items-center inline-flex">
                    <img className="w-[235px] h-[250px]  md:w-[473px] md:h-[509px]" src="/form4.png" />
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }} className="absolute md:pl-[50%] pl-[20%]  pr-[5%] pt-[50%] flex flex-col items-center justify-center text-right text-title-violet text-4xl md:pt-[8%] md:text-8xl">
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

            <div id="element1" className=" top-[700px] left-[20%] md:left-[533px] md:top-[800px] absolute">
                <div className="bg-neutral-50 rounded-[29px] drop-shadow-xl flex flex-col justify-center w-[100%] md:w-[616px] px-3 md:px-10 pt-5 pb-2 md:pt-10 md:pb-5">
                    <p className="text-gray-800 text-xl md:text-5xl py-1 md:py-5">What is your deadline?</p>
                    <DatePicker onChange={handleDateChange} />
                    <button
                        className="flex justify-center items-center w-full p-2 my-5 px-10 min-w-max text-sm text-center rounded-full backdrop-blur-sm transition-all md:text-base bg-blur-blue/20 hover:bg-blur-blue/80"
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
            <div id="element2" className="left-[5%] top-[1200px] md:left-[533px] md:top-[1596px] absolute">
                <div className="w-[350px] md:w-[700px] left-0 top-0 absolute bg-neutral-50 rounded-[29px] shadow flex flex-col justify-center py-5 px-5">
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
            <button id="element3" onClick={() => { saveLocalData(); setStage("loading"); }} className="absolute top-[2000px] left-[100px] md:top-[2800px] md:left-[450px] z-20  flex items-center justify-center space-x-5"
            >
                <div
                    className="group flex items-center justify-center space-x-2 rounded-full border px-3 py-1 md:px-10 md:py-8  bg-btn text-sm text-white transition-colors hover:bg-back-white hover:text-btn hover:bg-opacity-5"
                    rel="noopener noreferrer"
                >

                    <p className="text-xl md:text-5xl"> let's generate </p>
                    <SparklesIcon className='h-6 w-6 md:w-10 md:h-10' />

                </div>
            </button>
        </div>
    </>
}

const Loading = () => {
    const [currentStage, setCurrentStage] = useState(0);

    let localEmail = localStorage.getItem('email');
    let localDeadline = localStorage.getItem('deadline');
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
        {
            endpoint: '/api/calendar',
        },
        // ...
    ];

    useEffect(() => {
        const proceedToNextStage = async () => {
            if (currentStage === stages.length || currentStage < 0) {
                return;
            }
            const response = await fetch(stages[currentStage].endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            // console.log(response);

            if (!response.ok) {
                if (response.status == 401) {
                    setCurrentStage(-3);
                }
                if (response.status == 429) {
                    setCurrentStage(-2);
                }
                if (response.status == 400) {
                    setCurrentStage(-1);
                }
                if (response.status == 402) {
                    setCurrentStage(-4);
                }
                return;
            }
            if (currentStage == 0) {
                response.json().then(data => {
                    localStorage.setItem('topics', JSON.stringify(data));
                    setPayload({ email: localEmail, topics: data })
                }).catch(function () {
                    setCurrentStage(-1);
                });
            } else if (currentStage == 1) {
                response.json().then(data => {
                    localStorage.setItem('tasks', JSON.stringify(data));
                    setPayload({ email: localEmail, tasks: data })
                }).catch(function () {
                    console.error();
                    setCurrentStage(-1);
                });
            } else if (currentStage == 2) {
                response.json().then(data => {
                    localStorage.setItem('timing', JSON.stringify(data));
                    let tasks = payload?.tasks
                    setPayload({ deadline: localDeadline, tasks: tasks, timing: data })
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
        <div className='z-20'>
            {currentStage === -4 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[95%] md:max-w-[70%] h-full max-h-[60%]  md:mt-[5%]  px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                        >
                            token limit is exceeded
                        </h1>
                        <h1
                            className={`max-w-[80%] text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                        >
                            we would like to provide our services to everyone, but we are limited by financial resources. if you are interested in support, contact us.
                        </h1>
                    </div>
                </motion.div >
            )}
            {currentStage === -3 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[95%] md:max-w-[60%] h-full max-h-[60%] md:mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                        >
                            authorization problem
                        </h1>
                        <h1
                            className={` text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                        >
                            How to fix it?<br />

                            sign out &#8594; visit <a href="https://myaccount.google.com/connections?continue=https%3A%2F%2Fmyaccount.google.com%2Fsecurity%3Fhl%3Dru&hl=ru" className='text-title-violet/50 hover:text-title-violet/80'>this</a> link &#8594; find "EZxams" and revoke access &#8594; sign in and try again
                        </h1>
                    </div>
                </motion.div >
            )}
            {currentStage === -2 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[95%] md:max-w-[60%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                        >
                            omg, too many requests:(
                        </h1>
                        <h1
                            className={` text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                        >
                            we use OpenAi's free account, so it will happen sometimes. if you are interested in support, contact us
                        </h1>
                    </div>
                </motion.div >
            )}
            {currentStage === -1 && (
                <div>
                    <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                        className="z-20 w-full max-w-[95%] md:max-w-[90%] h-full max-h-[60%] mt-[5%] px-0 md:px-5 xl:px-0 mx-auto"
                    >
                        <div className="w-full flex flex-col justify-around items-center">
                            <h1
                                className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                            >
                                <Balancer>oops... something went wrong</Balancer>
                            </h1>
                            <h1
                                className={`max-w-[60%] text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                            >
                                we use generative AI, so responses are not always perfect. please, try again and thank you for your patience!
                            </h1>
                        </div>
                    </motion.div >
                </div>
            )}

            {currentStage === 0 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[60%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-5xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-2`}
                        >
                            analyzing your topics
                        </h1>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </motion.div >
            )}

            {currentStage === 1 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[60%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-5xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-2`}
                        >
                            creating task for you
                        </h1>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </motion.div >
            )}

            {currentStage === 2 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[60%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-5xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-2`}
                        >
                            estimating the time
                        </h1>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </motion.div >
            )}
            {currentStage === 3 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[70%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-5xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-2`}
                        >
                            last steps, and...
                        </h1>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </motion.div >
            )}
            {currentStage === 4 && (
                <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15 }} transition={{ duration: 0.5 }}
                    className="z-20 w-full max-w-[60%] h-full max-h-[60%] mt-[5%] px-5 xl:px-0 mx-auto"
                >
                    <div className="w-full flex flex-col justify-around items-center">
                        <h1
                            className={`${outfitTitle.className} text-title-violet text-center font-display text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem] pb-5`}
                        >
                            Done! Good luck on exams!
                        </h1>
                        <h1
                            className={` text-title-violet/80 text-center font-display text-2xl tracking-[-0.02em] drop-shadow-sm md:text-3xl `}
                        >
                            you can check your schedule on <a href="/" className='text-title-violet/50 hover:text-title-violet/80'>main page</a> or in your <a href="https://calendar.google.com/" className='text-title-violet/50 hover:text-title-violet/80'>Google Calendar</a>
                        </h1>
                    </div>
                </motion.div >
            )}

            {/* Repeat the above pattern for each stage */}
        </div>
        <div className="z-0 w-full h-full absolute overflow-hidden">
            <motion.div variants={variants}
                animate={"jump"} className="z-20 w-[200px] h-[312px] md:w-[398px] md:h-[624px] right-0 top-[-50px] md:top-[-50px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="w-[200px] h-[312px] md:w-[398px] md:h-[624px]" src="/form2.png" />
            </motion.div>
            <motion.div variants={variants}
                animate={"jump"} className="z-20 w-[230px] h-[265px] md:w-[457px] md:h-[529px] left-0 bottom-[-30px]  md:bottom-[-40px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="w-[230px] h-[265px] md:w-[457px] md:h-[529px]" src="/form1.png" />
            </motion.div>
            <div className="left-0 bottom-[-10px] md:bottom-0 absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[686px] md:h-[679px] md:blur-[150px]" />
            <div className="right-0  top-0 absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[535px] md:h-[518px] md:blur-[150px]" />
        </div>
    </>
}

//tiktok tanec ne mogu a penis

export default function FormPage() {
    const [stage, setStage] = useState("form")
    return <>
        {stage == "form" ? <Form setStage={setStage} /> : <Loading />}
    </>
}