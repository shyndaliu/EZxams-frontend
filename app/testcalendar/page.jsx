'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CalTest() {
    const [loading, setLoading] = useState(false);
    const [subsList, setSubsList] = useState([]);

    const payload = {
        tasks: {
            "The Pigeonhole Principle": ["Introductory reading on Pigeonhole Principle", "Practice easy problems involving Pigeonhole Principle", "Do some tough problems and validate concepts"],
            "Permutations and Combinations": ["Start by recapping fundamental concepts of Permutations and Combinations", "Revise formulas periodically", "Apply formulas to problems, Difficulty level to be increased gradually as you master each level"],
            "The Binomial Theorem": ["Learn the fundamentals and formulas of Binomial Theorem", "Practice expressive problems and numerical exercies", "Solve tough problems to confirm competence attained."]
        },
        timing: {
            "The Pigeonhole Principle": ["30 min", "60 min", "120 min"],
            "Permutations and Combinations": ["30 min", "10 min each (Spread out over a few days)", "60 min"],
            "The Binomial Theorem": ["30 min", "60 min", "60 min"]
        },
    }

    useEffect(async () => {
        console.log('test');
        if (loading) {
            const data = await fetch("api/calendar", {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            console.log(data);
            setSubsList(
                data.map((sub) => ({
                    id: sub.id,
                    title: sub.snippet.title,
                }))
            );
            setLoading(false);
        }
    }, [loading]);

    return (
        <div>

            <h1>NextAuth Youtube Auth Test</h1>

            <button
                onClick={() => setLoading(!loading)}
                disabled={loading || subsList.length}
            >
                Get My calendars
            </button>
            {loading && <p>Loading...</p>}
            <ul>
                {subsList.map((sub) => (
                    <li key={sub.id}>{sub.title}</li>
                ))}
            </ul>
        </div>
    );
}