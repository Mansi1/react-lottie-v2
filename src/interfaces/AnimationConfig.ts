import {AnimationSegment, SVGRendererConfig} from "lottie-web";

export interface IAnimationConfig {
    loop?: boolean | number;
    autoplay?: boolean;
    initialSegment?: AnimationSegment;
    name?: string;
    assetsPath?: string;
    rendererSettings?: SVGRendererConfig;
}
