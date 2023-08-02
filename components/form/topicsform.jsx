import { StarIcon, TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TopicForm = ({ topics, setTopics }) => {
    const [newTopic, setNewTopic] = useState('');
    const [hoveredTopic, setHoveredTopic] = useState(null);

    const handleAddTopic = () => {
        if (newTopic.trim() !== '') {
            const updatedTopics = { [newTopic]: 0, ...topics };
            setTopics(updatedTopics);
            setNewTopic('');
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTopic();
        }
    };
    const handleDeleteTopic = (topic) => {
        // Add your logic to handle deleting the topic
        console.log('Topic deleted:', topic);
        const updatedTopics = { ...topics };
        delete updatedTopics[topic];
        setTopics(updatedTopics);
    };

    const handleRatingChange = (topic, rating) => {
        const updatedTopics = { ...topics, [topic]: rating };
        setTopics(updatedTopics);
    };

    const handleStarHover = (topic, index) => {
        setHoveredTopic({ topic, index });
    };

    return (
        <div>
            <h1 className='text-gray-800 text-xl md:text-5xl py-5'>What topics you should prepare for?</h1>
            <div className=''>
                <input
                    className='bg-gray-200 w-[70%] md:w-[80%] border-none rounded-2xl px-5px-4 py-1'
                    type="text"
                    placeholder="Enter a topic"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="px-2 md:px-4 py-1 mx-5 border-gray-300 border-2 bg-btn/5 text-gray-800 text-md rounded-3xl hover:bg-btn hover:text-white hover:border-btn transition-colors" onClick={handleAddTopic}>Add</button>
            </div>
            <div id="topics" className='w-80% h-[100px] md:h-[200px] overflow-y-scroll overflow-x-hidden my-5 bg-gray-300/20 rounded-3xl text-xl py-2'>
                {Object.entries(topics).map(([topic, rating]) => (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={topic} className='flex justify-between px-5 py-3'>
                        <div id="topics" className='w-3/5 overflow-x-scroll bg-gray-800/10 rounded-xl py-1 px-1'>
                            {topic}
                        </div>
                        <div className='w-2/5 flex justify-center items-center'>
                            {[...Array(5)].map((_, i) => {
                                const starColor =
                                    (hoveredTopic &&
                                        hoveredTopic.topic === topic &&
                                        hoveredTopic.index >= i + 1) || (rating >= i + 1)
                                        ? '#C1ABFF'
                                        : 'gray';
                                return (
                                    <label
                                        key={i}
                                        onMouseEnter={() => handleStarHover(topic, i + 1)}
                                        onMouseLeave={() => setHoveredTopic(null)}
                                    >
                                        <input
                                            type="radio"
                                            name={`rating-${topic}`}
                                            value={i + 1}
                                            checked={rating === i + 1}
                                            onChange={() => handleRatingChange(topic, i + 1)}
                                        />
                                        <StarIcon className='w-5 h-5' style={{ color: starColor }} />
                                    </label>
                                );
                            })}
                        </div>
                        <button onClick={() => handleDeleteTopic(topic)}><TrashIcon className='w-5 h-5 text-gray-500' /></button>
                    </motion.div>

                ))}
            </div>
            <h1 className='text-gray-500'>*please, rate how WELL you understand every topic in the scale from 1 to 5. it helps us to build a better plan just for you. thanks!</h1>
        </div>
    );
};

export default TopicForm;
