import {AnimationDirection} from "lottie-web";
import {CSSProperties} from 'react';
import {ILottieEvent} from "./ILottieEvent";

export interface IPropsLottieBase {
    isStopped?: boolean;
    isPaused?: boolean;
    speed?: number;
    height?: number | string;
    width?: number | string;
    direction?: AnimationDirection;
    subframe?: boolean;
    style?: CSSProperties;
    className?: string;
    animationEventListener?: Array<ILottieEvent>
    eventListener?: Array<{ name: string; callback: (args: any) => void }>
}
