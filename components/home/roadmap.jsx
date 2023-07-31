'use client';

import { useEffect, useState } from "react";
import { fetchSignIn, fetchActiveTable } from "@/app/api/auth/[...nextauth]/testroute";
import UserTimeline from "./users-timeline";
import RoadmapLanding from "./roadmap-landing";


export default function Roadmap({ session }) {
    const [activeTable, setActiveTable] = useState();
    const { email, image } = session?.user || {};

    const getTable = async () => {
        localStorage.setItem('email', email)
        fetchSignIn(session);
        setActiveTable(await fetchActiveTable(email));
    }

    useEffect(() => {
        getTable();
    }, []);
    return (
        <>
            {activeTable?.body && activeTable?.description ? <UserTimeline table={activeTable.body} description={activeTable.description} /> : <RoadmapLanding />}
        </>
    );
}