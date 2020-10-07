import {AnimationEventCallback, AnimationEventName} from "lottie-web";

export interface ILottieEvent {
    name: AnimationEventName,
    callback: AnimationEventCallback
}
