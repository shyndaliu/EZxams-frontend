'use client';

import { useEffect } from "react";
import { fetchSignIn, fetchActiveTable } from "@/app/api/auth/[...nextauth]/testroute";
import UserTimeline from "./users-timeline";
import RoadmapLanding from "./roadmap-landing";


export default function Roadmap({ session }) {
    let activeTable;
    useEffect(() => {
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