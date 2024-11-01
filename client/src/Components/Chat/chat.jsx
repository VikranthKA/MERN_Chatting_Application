import React, { useEffect, useState } from 'react'


const Chat = () => {
    const [wsConnection, setWsConnection] = useState(null)
    const [onlinePeople, setOnlinePeople] = useState({})
    useEffect(() => {

        const ws = new WebSocket('ws://localhost:3333')
        setWsConnection(ws)
        ws.addEventListener('message', handleMessage)

    }, [])

    function showOnlinePeople(peopleArray) {
        const people = {}
        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username;
        })
        setOnlinePeople(people)
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data)
        if ('online' in messageData) {
            showOnlinePeople(messageData.online)
        }
    }

    return (
        <div className='flex h-screen'>
            <div className="bg-white-100 w-1/4">
                <div className="text-blue-600 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                        <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                    </svg>
                    MernChat
                </div>
                {Object.keys(onlinePeople).map(userId => (
                    <div key={onlinePeople[userId]} className='border-b border-gray-100 py-2' >
                        {onlinePeople[userId]}
                    </div>
                ))}
            </div>
            <div className="bg-blue-300 w-3/4 p-2">
                <div className="flex-grow">message with selected person</div>

                <div className='flex gap-2 '>
                    <input type="text" placeholder="Type your message here" className="bg-white border p-2 flex-grow rounded-sm " />
                    <button className='bg-blue-500 p-2 text-white rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Chat
