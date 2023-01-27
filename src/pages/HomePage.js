
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import VideoRoom from "./VideoRoom";
import { uid } from 'uid';
import '../components/channelsSection.css';
import AgoraRTC from "agora-rtc-sdk";


export const MOD = "MOD";
export const SPEAKER = "SPK";
export const LISTENER = "LST";
const HomePage = () => {
    const [authUser, setAuthUser] = useState(null);
    const [channels, setChannels] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [activeChannel, setActiveChannel] = useState(null);
    const [onCall, setOnCall] = useState(false);
    const [token, setToken] = useState(null);

    const createChannel = async (channelN) => {
        // Import the AgoraRTC SDK

        // Initialize the Agora client
        const client = AgoraRTC.createClient({
            mode: 'live',
            codec: 'h264'
        });

        console.log('client', client)

        // Create and join a channel
        client.createChannel(channelN, function (channel) {
            console.log('Channel created and joined: ' + channel);
        }, function (err) {
            console.log('Error creating and joining channel: ' + err);
        });


    }



    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        
        return () => {
            listen();
        };


    }, [authUser]);

    const userSignOut = () => {
        signOut(auth);
    };

    // useEffect(() => {
    //     const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    //     client.init('822488d93b924e8dbcf45dd5b3950d9f', () => {
    //         client.createChannel('mychannel', () => {
    //             console.log('Channel created');
    //         }, (err) => {
    //             console.log(`Error creating the channel: ${err}`);
    //         });
    //       client.join(null, 'mychannel', null, (uid) => {
    //         console.log(`User ${uid} joined the channel`);
    //       }, (err) => {
    //         console.log(`Error joining the channel: ${err}`);
    //       });
    //     }, (err) => {
    //       console.log(`Error initializing the client: ${err}`);
    //     });
    //     return () => {
    //       client.leave(() => {}, (err) => {});
    //     };
    //   }, []);
    // const [joined, setJoined] = useState(false)


    // Form related functions
    const generateToken = async (channelName) => {
        // https://discourse-token-server.up.railway.app/access_token?channelName=test&role=subscriber&uid=1234&expireTime=6400
        let id = uid(10);
        console.log("uid", id);
        const response = await fetch(
            `https://discourse-token-server.up.railway.app/access_token?channelName=${channelName}`
        );
        const data = await response.json();
        console.log('data', data)
        return data.token;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setChannels([...channels, channelName]);
        let token = await generateToken(channelName);
        setToken(token);
        // createChannel(channelName);

        // Add the channel to firestore
        // await addChannelToFirestore(channelName);
        // Update the UI to show the new channel in a list of available channels
        setChannelName("");
    }

    const handleChange = (e) => {
        setChannelName(e.target.value);
    }


    return (
        <>
            <div>
                <h2>Dashboard</h2>
                <div className="channels-section">
                    <div className="action-section">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter channel name"
                                value={channelName}
                                onChange={handleChange}
                            />
                            <button type="submit">Create Channel</button>
                        </form>
                        {authUser ? (
                            <>
                                <h2>{`user name is ${authUser.email}`}</h2>

                                {onCall ? <VideoRoom userName={authUser.email} TOKEN={token} CHANNEL={activeChannel} /> :
                                    <>{activeChannel ? (< button className="join-channel-button" onClick={() => setOnCall(true)}>{`Join ${activeChannel}`} </button>) : ''}</>
                                }
                                {/* <button onClick={userSignOut}>Sign Out</button> */}
                            </>
                        ) : (
                            <button>
                                <Link to="/Login"> Login</Link>
                            </button>
                        )}</div>

                    <ul className="channels-list-inner">
                        {channels.map((channel) => (
                            <li key={channel} onClick={() => setActiveChannel(channel)} className={channel === activeChannel ? 'active-channel' : 'normal-channel'}>
                                {channel}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomePage;



// import { onAuthStateChanged, signOut } from "firebase/auth";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { auth } from "../firebase";

// const HomePage = () => {
//     const [authUser, setAuthUser] = useState(null);

//     useEffect(() => {
//         const listen = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setAuthUser(user);
//             } else {
//                 setAuthUser(null);
//             }
//         });
//         return () => {
//             listen();
//         };
//     }, [authUser]);

//     const userSignOut = () => {
//         signOut(auth);
//     };

//     return (
//         <>
//             <div>
//                 <h2>Dashboard</h2>
//                 {authUser ? (
//                     <>
//                         <h2>{`user name is ${authUser.email}`}</h2>
//                         <button onClick={userSignOut}>Sign Out</button>
//                         <ul>
//                             <li>
//                                 <Link to="/videoroom">Chat Room 1</Link>
//                             </li>
//                             <li>
//                                 <Link to="/videoroom">Chat Room 2</Link>
//                             </li>
//                             <li>
//                                 <Link to="/videoroom">Chat Room 3</Link>
//                             </li>
//                         </ul>
//                     </>
//                 ) : (
//                     <button>
//                         <Link to="/Login"> Login</Link>
//                     </button>
//                 )}
//             </div>
//         </>
//     );
// };

// export default HomePage;

