/*
Scale the view and rotate it 90° so it's invisible, update the Card configuration, then translate the view another 90° and scale back. 
*/
import React, { useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback, Easing } from "react-native";

const CardFlip = ({ componentOne, componentTwo }) => {

    //Animation variables
    const flipAnim = useRef(new Animated.Value(0)).current;
    const growAnim = useRef(new Animated.Value(0)).current;
    const animationTime = 400;
    const globalTimingValues = {
        duration: animationTime / 2,
        easing: Easing.linear,
        useNativeDriver: true
    }
    //Local variables
    const [cardSide, setCardSide] = useState("front");

    const flip = () => {
        //Rotates 90°
        Animated.parallel([
            Animated.timing(flipAnim, {
                toValue: 1,
                ...globalTimingValues
            }),
            //Scales
            Animated.timing(growAnim, {
                toValue: 1,
                ...globalTimingValues
            })
        ]).start(() => {

            //Update the configuration
            flipAnim.setValue(-1);
            if (cardSide === "front")
                setCardSide("back");
            else
                setCardSide("front");

            Animated.parallel([
                //Rotates the view back 90°
                Animated.timing(flipAnim, {
                    toValue: 0,
                    ...globalTimingValues
                }),
                //Scales back
                Animated.timing(growAnim, {
                    toValue: 0,
                    ...globalTimingValues
                })
            ]).start();
        })
    };

    return (
            <TouchableWithoutFeedback onPress={() => flip()} >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    rotateY: flipAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "90deg"]
                                    })
                                },
                                {
                                    scale: growAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.08]
                                    })
                                },
                            ],
                            backfaceVisibility: 'true'
                        }
                    ]}
                >
                    {cardSide === "front" && componentOne}
                    {cardSide === "back" && componentTwo}
                </Animated.View>
            </TouchableWithoutFeedback>
    );
}

export default CardFlip;