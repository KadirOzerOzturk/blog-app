import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Comment(props) {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(window.localStorage.getItem("username"));
    }, []);

    const handleUpdateClick = async () => {
        const username = window.localStorage.getItem("username");
        await axios.put(`/posts/update/${props.postId}`, {
            username: username,
            postId: props.postId,
            content: content,
        })
            .then(() => {
                console.log(`comment updated. comment id : ${props.postId}`);
                // Move reload outside of this function
            });
    };

    // Move reload here to avoid re-render loop
    useEffect(() => {
        window.location.reload(false);
    }, []);

    return (
        <div className='w-1/2 pt-40'>
            <div className="mt-2">
                <p className='flex justify-end text-slate-400'> {`Char Count: ${content.length}`}/255 </p>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    id="comment"
                    name="comment"
                    rows={10}
                    maxLength={3000}
                    className="block w-full h-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={content}
                />
                <button
                    onClick={handleUpdateClick}
                    type="button"
                    className="rounded-md items-end bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 hover:text-white"
                >
                    Share
                </button>
            </div>
        </div>
    );
}
