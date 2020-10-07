import React, {Component, CSSProperties,} from 'react';
import lottie, {AnimationConfigWithData, AnimationItem,} from 'lottie-web';
import {IPropsLottieBase} from "../interfaces/IPropsLottieBase";
import {getSize} from "../functions/getSize";


export interface PropsLottie extends IPropsLottieBase {
    animationData: any;
}

export class Lottie extends Component<PropsLottie> {

    private el: HTMLDivElement | null = null;
    private animationItem!: AnimationItem;

    componentDidMount() {
        this.renderProps(this.props)
    }

    renderProps(props: PropsLottie) {
        const {
            animationData,
            animationConfig,
        } = props;

        const config: AnimationConfigWithData = {
            ...animationConfig,
            animationData,
            container: this.el as HTMLDivElement,
            renderer: 'svg',
        }

        this.animationItem = lottie.loadAnimation(config);
        this.registerEvents();
    }
    componentWillUpdate(nextProps:PropsLottie /* , nextState */) {
        /* Recreate the animation handle if the data is changed */
        if (this.props.animationData !== nextProps.animationData) {
            this.deregisterEvents();
            this.destroy();

            this.renderProps(nextProps);
        }
    }

    componentWillUnmount() {
        this.deregisterEvents();
        this.destroy();
    }

    destroy() {
        this.animationItem.destroy();

    }

    componentDidUpdate() {
        this.setSubframe();
        if (this.props.isStopped) {
            this.stop();
        } else {
            this.play();
        }

        this.pause();
        this.setSpeed();
        this.setDirection();
    }

    setSubframe() {
        if (typeof this.props.subframe !== 'undefined') {
            this.animationItem.setSubframe(this.props.subframe)
        }
    }

    setSpeed() {
        if (typeof this.props.speed !== 'undefined'
            && this.animationItem.playSpeed !== this.props.speed) {
            this.animationItem.setSpeed(this.props.speed);
        }
    }

    setDirection() {
        if (typeof this.props.direction !== 'undefined'
            && this.animationItem.playDirection !== this.props.direction) {
            this.animationItem.setDirection(this.props.direction);
        }
    }

    stop() {
        this.animationItem.stop()
    }

    play() {
        this.animationItem.play()
    }

    pause() {
        if (this.props.isPaused && !this.animationItem.isPaused) {
            this.animationItem.pause();
        } else if (!this.props.isPaused && this.animationItem.isPaused) {
            this.animationItem.pause();
        }
    }


    registerEvents() {
        this.props.animationEventListener?.forEach((event) =>
            this.animationItem.addEventListener(event.name, event.callback)
        );
        this.props.eventListener?.forEach((event) =>
            (this.el as HTMLDivElement).addEventListener(event.name, event.callback)
        );
    }

    deregisterEvents() {
        this.props.animationEventListener?.forEach(
            (event) =>
                this.animationItem.removeEventListener(event.name, event.callback)
        );
        this.props.eventListener?.forEach((event) =>
            (this.el as HTMLDivElement).removeEventListener(event.name, event.callback)
        );
    }

    render() {
        const {width, height, style, className} = this.props;
        let combinedStyle: CSSProperties = {
            width: getSize(width),
            height: getSize(height),
            overflow: 'hidden',
            margin: '0 auto',
            outline: 'none',
        }
        if (style) {
            combinedStyle = {...combinedStyle, ...style}
        }
        return <div
            className={className}
            ref={(c) => {
                this.el = c;
            }}
            style={combinedStyle}
        />;
    }


}
