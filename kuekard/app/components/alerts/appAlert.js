import { Alert } from "react-native";

const appAlert = (title, msg, cancelText, approveText, callbackApproved, callbackCancelled=()=>{} ) => {

    Alert.alert(
        title,
        msg,
        [
            {
                text: cancelText,
                onPress: callbackCancelled,
                style: "cancel"
            },
            { text: approveText, onPress: callbackApproved }
        ]
    );
}

export {
    appAlert,
}