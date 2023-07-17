import React, { useState } from 'react';

const TopicForm = () => {
    const [topics, setTopics] = useState({});
    const [newTopic, setNewTopic] = useState('');

    const handleAddTopic = () => {
        if (newTopic.trim() !== '') {
            const updatedTopics = { ...topics, [newTopic]: 0 };
            setTopics(updatedTopics);
            setNewTopic('');
            console.log(topics)
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter a topic"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                />
                <button onClick={handleAddTopic}>Add</button>
            </div>
            {Object.entries(topics).map(([topic, rating]) => (
                <div key={topic}>
                    {topic}
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating}
                        onChange={(e) =>
                            setTopics((prevTopics) => ({
                                ...prevTopics,
                                [topic]: parseInt(e.target.value),
                            }))
                        }
                    />
                    {rating}
                </div>
            ))}
        </div>
    );
};

export default TopicForm;
