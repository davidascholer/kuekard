import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

function KeyboardHidden({ handleKeyboardShown, handleKeyboardHidden, children }) {
    const [keyboardShown, setKeyboardShown] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardShown(true);
            if (handleKeyboardShown)
                handleKeyboardShown();
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardShown(false);
            if (handleKeyboardHidden)
                handleKeyboardHidden();
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <>
            {!keyboardShown &&
                <>
                    {children}
                </>
            }
        </>
    );
}


export default KeyboardHidden;