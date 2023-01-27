import { createUid, generateMediaChannelKey } from 'agora-rtc-sdk';

const appId = "822488d93b924e8dbcf45dd5b3950d9f";
const appCertificate = "002f4e252edc42ebb267d13a9a4e13fc";

export const generateTokenHost = async (channelName) => {
    // const channelName = "YOUR_CHANNEL_NAME";
    const uid = createUid(1);
   
    // Generate a token for the user with role 'host'
    const token = generateMediaChannelKey(appId, appCertificate, channelName, uid, "host");

    return token;
};

export const generateTokenAudience = async (channelName) => {
    // const channelName = "YOUR_CHANNEL_NAME";
    const uid = 0;
    console.log(uid);
    // Generate a token for the user with role 'audience'
    const token = generateMediaChannelKey(appId, appCertificate, channelName, uid, "audience");

    return token;
}