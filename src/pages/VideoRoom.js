import { Link } from "react-router-dom";
import "./rooms.css";

const VideoRoom =()=>{
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

            </div>
            <button className="back-button">
                <Link to="/">back to dashboard</Link>
            </button>
        </>
    );
}

export default VideoRoom
