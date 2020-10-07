import React, {CSSProperties, useEffect, useRef, useState,} from 'react';
import lottie, {AnimationConfigWithData, AnimationItem,} from 'lottie-web';
import {IAnimationConfig} from "../interfaces/AnimationConfig";
import {IPropsLottieBase} from "../interfaces/IPropsLottieBase";
import {getSize} from "../functions/getSize";


export interface PropsLottie extends IPropsLottieBase {
    animationData: any;
}

export const Lottie = ({
                           animationData,
                           animationConfig,
                           isPaused,
                           isStopped,
                           speed,
                           direction,
                           subframe,
                           animationEventListener,
                           eventListener,
                           className,
                           style,
                           width,
                           height,
                       }: PropsLottie) => {
    const lottieRenderRef = useRef<HTMLDivElement>(null);
    const [animationItem, setAnimationItem] = useState<AnimationItem>();
    const [combinedStyle, setCombinedStyle] = useState<CSSProperties>();

    useEffect(() => {
        if (lottieRenderRef.current && !animationItem) {
            const config: AnimationConfigWithData = {
                ...animationConfig,
                animationData,
                container: lottieRenderRef.current,
                loop: true,
                renderer: 'svg',
            }

            const animation = lottie.loadAnimation(config);

            // loop error https://github.com/airbnb/lottie-web/issues/1217
            if(animationConfig?.loop === false) {
                animation.loop = false
            }
            setAnimationItem(animation)
        }
        return () => {
            if (animationItem) {
                animationItem.destroy();
            }
        }
    }, [animationConfig, animationData, animationItem, setAnimationItem]);

    useEffect(() => {
        if (animationItem && typeof isPaused !== 'undefined') {
            if (isPaused && !animationItem.isPaused) {
                animationItem.pause();
            } else if (isPaused && animationItem.isPaused) {
                animationItem.play();
            }
        }
    }, [animationItem, isPaused]);

    useEffect(() => {
        if (animationItem && typeof isStopped !== 'undefined') {
            if (isStopped) {
                animationItem.stop();
            }
        }
    }, [animationItem, isStopped]);

    useEffect(() => {
        if (animationItem && typeof speed !== 'undefined') {
            animationItem.setSpeed(speed);
        }
    }, [animationItem, speed]);

    useEffect(() => {
        if (animationItem && typeof direction !== 'undefined') {
            animationItem.setDirection(direction);
        }
    }, [animationItem, direction]);

    useEffect(() => {
        if (animationItem && typeof subframe !== 'undefined') {
            animationItem.setSubframe(subframe);
        }
    }, [animationItem, subframe]);

    useEffect(() => {
        if (animationItem
            && typeof animationEventListener !== 'undefined'
            && Array.isArray(animationEventListener)
            && animationEventListener.length > 0
        ) {
            animationEventListener.forEach((event) => animationItem.addEventListener(event.name, event.callback));
            return () => {
                animationEventListener.forEach((event) => animationItem.removeEventListener(event.name, event.callback));
            }
        }
        return () => {
        }
    }, [animationItem, animationEventListener]);

    useEffect(() => {
        const currentRef = lottieRenderRef.current;
        if (currentRef
            && typeof eventListener !== 'undefined'
            && Array.isArray(eventListener)
            && eventListener.length > 0
        ) {
            eventListener.forEach((event) => currentRef.addEventListener(event.name, event.callback));
        }
        return () => {
            if (currentRef
                && typeof eventListener !== 'undefined'
                && Array.isArray(eventListener)
                && eventListener.length > 0
            ) {
                eventListener.forEach((event) => currentRef.removeEventListener(event.name, event.callback));
            }
        }
    }, [animationItem, eventListener]);

    useEffect(() => {
        if (animationItem) {
            let mergedStyle: CSSProperties = {
                width: getSize(width),
                height: getSize(height),
                overflow: 'hidden',
                margin: '0 auto',
                outline: 'none',
            }
            if (style) {
                mergedStyle = {...mergedStyle, ...style}
            }
            setCombinedStyle(mergedStyle)
        }
    }, [animationItem, eventListener, height, style, width]);

    return (
        <div
            className={className}
            ref={lottieRenderRef}
            style={combinedStyle}
        />
    )
}
