import React from "react";
import { VerticalTimelineElement, VerticalTimeline } from "react-vertical-timeline-component";
import './style.min.css'
import { MapPinIcon, SparklesIcon, FireIcon, RocketLaunchIcon, HeartIcon, StarIcon, TrophyIcon } from "@heroicons/react/20/solid";

export default function UserTimeline() {
    const icons = [<SparklesIcon />, <FireIcon />, <RocketLaunchIcon />, <HeartIcon />, <StarIcon />]
    const table = {
        "24.06":
            { "4PM-4.30PM": "Introductory reading on Pigeonhole Principle", "4.30PM-5PM": "Practice easy problems involving Pigeonhole Principle", "5PM-6PM": "Do some tough problems and validate concepts" },
        "25.06":
            { "3PM-3.20PM": "Start by recapping fundamental concepts of Permutations and Combinations", "3.20PM-4.05PM": "Revise formulas periodically", "4.05PM-5.05PM": "Apply formulas to problems, Difficulty level to be increased gradually as you master each level", "6PM-6.30PM": "Learn the fundamentals and formulas of Binomial Theorem", "6.30PM-8PM": "Practice expressive problems and numerical exercies", "8PM-8.10PM": "Solve tough problems to confirm competence attained." }
    }
    let timeline = []
    timeline.push({
        date: '',
        title: 'Your Personal Roadmap',
        desc: 'Watch your progress based on generated table right here!',
    })
    //{ title: 'Finish line!' }
    let length = timeline.length;
    return <>
        < div className="z-20 w-full pt-[5%]" >
            <VerticalTimeline className="z-25" >
                {timeline.map((t, i) => {
                    const contentStyle =
                        i === 0
                            ? { background: 'rgba(193, 171, 255, 1)', color: '#fff' }
                            : { background: '#FCFCFC', color: '#513174' };
                    const iconStyle =
                        i === 0
                            ? { background: 'rgba(193, 171, 255, 1)', color: '#fff' }
                            : { background: '#FCFCFC', color: '#513174' };

                    return (
                        <VerticalTimelineElement
                            key={i}
                            className="vertical-timeline-element--work"
                            contentStyle={contentStyle}
                            contentArrowStyle={{ visibility: "hidden" }}
                            iconStyle={iconStyle}
                            date={t.date}
                            icon={i == 0 ? <MapPinIcon /> : i == length - 1 ? <TrophyIcon /> : icons[i % 5]}
                        >
                            {t.title ? (
                                <React.Fragment>
                                    <h3 className="vertical-timeline-element-title text-xl ">{t.title}</h3>
                                    {t.desc && <p>{t.desc}</p>}
                                </React.Fragment>
                            ) : undefined}
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline >
        </div >

        <div className="w-full h-[1800px] absolute top-0 overflow-hidden">
            <div className="right-0 top-[-50px] absolute bg-blur-blue rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[150px]" />
            <div className="left-0 top-[550px] absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[150px]" />
            <div className="right-0 top-[1150px] absolute bg-fuchsia-300 rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[150px]" />
        </div>
        <div className="w-full h-[1800px] top-0 absolute overflow-hidden">
            <div className="right-0 top-[-50px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="" src="/form2.png" />
            </div>
            <div className="left-0 top-[550px] absolute origin-top-left justify-center items-center inline-flex">
                <img className="w-[486px] h-[633px]" src="/form3.png" />
            </div>
            <div className="right-0 top-[1150px] absolute origin-top-left  justify-center items-center inline-flex">
                <img className="w-[473px] h-[509px] " src="/form4.png" />
            </div>
        </div>
    </>

}