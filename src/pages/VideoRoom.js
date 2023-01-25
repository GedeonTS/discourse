import { Link } from "react-router-dom";
import AgoraRTC, {createClient} from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import "./rooms.css";
//  
import AudioPlayer from "../components/AudioPlayer";
const APP_ID = "822488d93b924e8dbcf45dd5b3950d9f";
const TOKEN ="007eJxTYJjGVnTOQ+S+7WHff/q+S261OT/547wqjv/558hcRmEHTjkFBgsjIxMLixRL4yRLI5NUi5Sk5DQT05QU0yRjS1ODFMu0opXnkhsCGRlUDmQyMjJAIIjPxpCYUpSZmsPAAABEgh9N";
const CHANNEL = "adriel"

AgoraRTC.setLogLevel(4);

let agoraCommandQueue = Promise.resolve();

const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
    const client = createClient({
        mode: "rtc",
        codec: "vp8",
    });

    let tracks;

    const waitForConnectionState = (connectionState) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (client.connectionState === connectionState) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    };

    const connect = async () => {
        await waitForConnectionState("DISCONNECTED");

        const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);

        console.log(uid)

        client.on("user-published", (user, mediaType) => {
            client.subscribe(user, mediaType).then(() => {
                if (mediaType === "video") {
                    onVideoTrack(user);
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });
        });

        client.on("user-left", (user) => {
            onUserDisconnected(user);
        });

        tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        await client.publish(tracks);

        return {
            tracks,
            uid,
        };
    };

    const disconnect = async () => {
        await waitForConnectionState("CONNECTED");
        client.removeAllListeners();
        for (let track of tracks) {
            track.stop();
            track.close();
        }
        await client.unpublish(tracks);
        await client.leave();
    };

    return {
        disconnect,
        connect,
    };
};

   

const VideoRoom =()=>{
    const [users, setUsers]=useState([])
    const [uid, setUid]=useState(null)

    useEffect(() => {
        const onVideoTrack = (user) => {
            setUsers((previousUsers) => [...previousUsers, user]);
        };

        const onUserDisconnected = (user) => {
            setUsers((previousUsers) =>
                previousUsers.filter((u) => u.uid !== user.uid)
            );
        };

        const { connect, disconnect } = createAgoraClient({
            onVideoTrack,
            onUserDisconnected,
        });

        const setup = async () => {
            const { tracks, uid } = await connect();
            setUid(uid);
            setUsers((previousUsers) => [
                ...previousUsers,
                {
                    uid,
                    audioTrack: tracks[0],
                    videoTrack: tracks[1],
                },
            ]);
        };

        const cleanup = async () => {
            await disconnect();
            setUid(null);
            setUsers([]);
        };

        // setup();
        agoraCommandQueue = agoraCommandQueue.then(setup);

        return () => {
            // cleanup();
            agoraCommandQueue = agoraCommandQueue.then(cleanup);
        };
    }, []);
    
    return (
        <>
            <h1 className="room-heading">This is the video room</h1>
            <div className="room-container">
                <ul className="video-list">
                    <li className="video-item">
                        <p>Video Contaier 1</p>
                        <p>username1</p>
                    </li>
                    <li className="video-item">
                        <p>Video container 2</p>
                        <p>username2</p>
                    </li>
                    <li className="video-item">
                        <p>Video container 3</p>
                        <p>username3</p>
                    </li>
                </ul>

                <ul className="chat-log">
                    <h3>Chat log</h3>
                    <li className="chat-item">
                        <p>username1</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, excepturi.</p>
                        <p>date stamp1</p>
                    </li>
                    <li className="chat-item">
                        <p>username2</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quae?</p>
                        <p>date stamp2</p>
                    </li>
                    <li className="chat-item">
                        <p>username3</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, alias.</p>
                        <p>datestamp3</p>
                    </li>
                </ul>


                {users.map((user)=>{ 
                    return(

                        <div>
                            {uid}
                            <AudioPlayer key={user.uid} user={user}/>
                        </div>

                    )
                })}
                
            </div>
            <button>
                <Link to="/">back to dashboard</Link>
            </button>
        </>
    );
}

export default VideoRoom

