import React from "react";
import { VerticalTimelineElement, VerticalTimeline } from "react-vertical-timeline-component";
import './style.min.css'
import { SparklesIcon, StarIcon } from "@heroicons/react/20/solid";

export default function UserTimeline() {
    const timeline = [
        {
            icon: SparklesIcon,
            date: '',
            title: 'Creative Director',
            subtitle: 'Miami, FL',
            desc: 'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
        },
        {
            icon: SparklesIcon,
            date: '2010 - 2011',
            title: 'Art Director',
            subtitle: 'San Francisco, CA',
            desc: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        },
        {
            icon: SparklesIcon,
            date: '2008 - 2010',
            title: 'Web Designer',
            subtitle: 'Los Angeles, CA',
            desc: 'User Experience, Visual Design',
        },
        {
            icon: SparklesIcon,
            date: '2006 - 2008',
            title: 'Web Designer',
            subtitle: 'San Francisco, CA',
            desc: 'User Experience, Visual Design',
        },
        {
            icon: SparklesIcon,
            date: 'April 2013',
            title: 'Content Marketing for Web, Mobile and Social Media',
            subtitle: 'Online Course',
            desc: 'Strategy, Social Media',
        },
        {
            icon: SparklesIcon,
            date: 'November 2012',
            title: 'Agile Development Scrum Master',
            subtitle: 'Certification',
            desc: 'Creative Direction, User Experience, Visual Design',
        },
        {
            icon: SparklesIcon,
            date: '2002 - 2006',
            title: 'Bachelor of Science in Interactive Digital Media Visual Imaging',
            subtitle: 'Bachelor Degree',
            desc: 'Creative Direction, Visual Design',
        },
        { icon: StarIcon },
    ];
    return <>
        <div className="z-20 w-full pt-[5%]">
            <VerticalTimeline className="z-25" >
                {timeline.map((t, i) => {
                    const contentStyle =
                        i === 0
                            ? { background: 'rgba(74, 20, 228, 0.1)', color: '#fff' }
                            : { background: '#FCFCFC', color: '#513174' };

                    return (
                        <VerticalTimelineElement
                            key={i}
                            className="vertical-timeline-element--work"
                            contentStyle={contentStyle}
                            contentArrowStyle={{ visibility: "hidden" }}
                            iconStyle={{ background: 'white', color: 'rgba(128, 128, 215, 1)' }}
                            date={t.date}
                            {...t.icon}
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
        </div>

        <div className="w-full h-[1600px] absolute top-0 overflow-hidden">
            <div className="left-0 top-[-100px] absolute bg-blur-pink rounded-full w-[200px] h-[200px] blur-[100px] md:w-[400px] md:h-[400px] md:blur-[150px]" />
        </div>
    </>

}