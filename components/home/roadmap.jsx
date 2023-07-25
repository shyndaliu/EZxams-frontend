'use client';

import { useEffect } from "react";
import { fetchSignIn, fetchActiveTable } from "@/app/api/auth/[...nextauth]/testroute";
import UserTimeline from "./users-timeline";
import RoadmapLanding from "./roadmap-landing";


export default function Roadmap({ session }) {
    let activeTable;
    console.log(session);
    const { email, image } = session?.user || {};
    useEffect(() => {
        localStorage.setItem('email', email)
        fetchSignIn(session);
    }, []);
    //activeTable = { "table": "dfsdfsd" };
    // check authorization?->get table
    return (
        <>
            {activeTable ? <UserTimeline /> : <RoadmapLanding />}
        </>
    );
}