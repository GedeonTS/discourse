import React from 'react';
import { useEffect, useState } from 'react';

import Daily from '@daily-co/daily-js';

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';




function UserDashboard() {


useEffect(() => {
    // Initialize Daily.co
    const daily = new Daily.Client();
    daily.join({ url: 'YOUR_DAILY_CO_ROOM_URL' });

    // Clean up when the component unmounts
    return () => {
        daily.disconnect();
    };
}, []);




const [currentRoom, setCurrentRoom] = useState(null);
const [daily, setDaily] = useState(null);
const rooms = {
    'room1': {
        name: 'Let\'s talk crypto',
        url: 'DAILY_CO_ROOM_URL_1'
    },
    'room2': {
        name: 'How to stop global warming',
        url: 'DAILY_CO_ROOM_URL_2'
    }
};

useEffect(() => {
    setDaily(new Daily.Client());
}, []);

const joinRoom = (roomId) => {
    const room = rooms[roomId];
    setCurrentRoom(room);
    daily.join({ url: room.url });
};

return (
    <div>
        <h1>Welcome to the Audio Group Call App</h1>
        <h2>Select a room to join:</h2>
        <div>
            {Object.keys(rooms).map((roomId) => (
                <button key={roomId} onClick={() => joinRoom(roomId)}>
                    {rooms[roomId].name}
                </button>
            ))}
        </div>
        {currentRoom && (
            <div>
                <h2>Currently in {currentRoom.name}</h2>
            </div>
        )}
    </div>
);

}

export default UserDashboard;
