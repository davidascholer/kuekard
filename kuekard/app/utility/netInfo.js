import NetInfo, { useNetInfo } from '@react-native-community/netinfo'

export default function(){
        //Print the netinfo object.
        // NetInfo.fetch().then(netInfo => console.log(netInfo));
    
        //Subscribes and unsubscribes so no clean up is necessary
        const netInfo = useNetInfo();

        return netInfo.isInternetReachable;
    
}