'use client';

import { useEffect } from "react";
import { fetchSignIn, fetchActiveTable } from "@/app/api/auth/[...nextauth]/testroute";
import UserTimeline from "./users-timeline";
import RoadmapLanding from "./roadmap-landing";


export default function Roadmap({ session }) {
    let activeTable;
    const { email, image } = session?.user || {};
    useEffect(() => {
        localStorage.setItem('email', email)
        fetchSignIn(session);
        activeTable = fetchActiveTable(session);
    }, []);
    activeTable = { "table": "dfsdfsd" };
    return (
        <>
            {activeTable ? <UserTimeline /> : <RoadmapLanding />}
        </>
    );
}