import React, { useState } from 'react'
import AgoraRtcEngine, { createUid, generateMediaChannelKey } from 'agora-rtc-sdk-ng';
// import firebase from "firebase/app";
import app from '../firebase';
import firestore from "../firebase";


export default function Form() {

    const [channelName, setChannelName] = useState("");

    const handleChange = (e) => {
        setChannelName(e.target.value);
    }

   const  addChannelToFirestore = async (channelName) => {
        // Add the channel information to Firestore
        await firestore.collection("channels").add({
            name: channelName,
            creator: app.auth().currentUser.uid,
            members: [app.auth().currentUser.uid]
        });
   }
    
   const generateToken = async (channelName, uid) => {
    // Generate a unique user ID
    // const userId = createUid();
    // // Generate a token for the user with role 'host'
    // const token = generateMediaChannelKey(appId, appCertificate, channelName, userId, "host");

    // return token;
};

  const handleSubmit = async (e) => {
        e.preventDefault();
        await AgoraRtcEngine.createChannel(channelName);
        const token = await generateToken(channelName);
        await AgoraRtcEngine.joinChannel(channelName, token);
        // Add the channel to firestore
        await addChannelToFirestore(channelName);
        // Update the UI to show the new channel in a list of available channels
        setChannelName( "" );
    }




    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter channel name"
                value={channelName}
                onChange={handleChange}
            />
            <button type="submit">Create Channel</button>
        </form>

    )
}
