import React from "react";
import { VerticalTimelineElement, VerticalTimeline } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { SparklesIcon, StarIcon } from "@heroicons/react/20/solid";

export default function UserTimeline() {
    const timeline = [
        {
            icon: SparklesIcon,
            date: '2011 - present',
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
        <VerticalTimeline >
            {timeline.map((t, i) => {
                const contentStyle =
                    i === 0
                        ? { background: 'rgb(33, 150, 243)', color: '#fff' }
                        : undefined;

                return (
                    <VerticalTimelineElement
                        key={i}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#FCFCFC', color: '#513174' }}
                        contentArrowStyle={{ visibility: "hidden" }}
                        iconStyle={{ background: '#FCFCFC', color: 'black', border: 'black' }}
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
        </VerticalTimeline ></>
}