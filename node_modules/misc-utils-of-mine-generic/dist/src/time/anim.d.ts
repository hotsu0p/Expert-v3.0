import { Fn } from '../type';
declare type Timing = (n: number, c?: number, d?: number, x?: number, y?: number) => number;
declare type TimingObject = {
    fn: (duration: number) => Timing;
};
interface AnimateOptions {
    duration: number;
    draw: (n: number) => void;
    timing: Timing | TimingObject;
    lapse?: number;
    end?: Fn;
}
export declare function animate({ duration, draw, timing, lapse, end }: AnimateOptions): Promise<void>;
export declare namespace easing {
    /**
     * Imagine we are dropping a ball. It falls down, then bounces back a few times and stops. The bounce function does the same, but in the reverse order: “bouncing” starts immediately.
     * */
    const bounceEasyOut: () => Timing;
    /**
     * parabolic curve
     */
    function quad(timeFraction: number): number;
    /**
     * “bow shooting”. First we “pull the bowstring”, and then “shoot”.
     * @param x “elasticity coefficient”. The distance of “bowstring pulling” is defined by it. Default value 1.5.
     */
    const back: (x?: number) => (timeFraction: number) => number;
    /**
     * @param x “initial range”
     */
    const elastic: (x?: number) => (timeFraction: number) => number;
    const bounceEaseInOut: () => Timing;
    const easeInQuad: () => Timing;
    const easeOutQuad: () => Timing;
    const easeInOutQuad: () => Timing;
    const easeInElastic: () => Timing;
    const easeOutBounce: () => TimingObject;
    const easeInCubic: () => Timing;
    const easeOutCubic: () => Timing;
    const easeInOutCubic: () => Timing;
    const easeInQuart: Timing;
    const easeInOutQuart: Timing;
    const easeInQuint: Timing;
    const easeOutQuint: () => Timing;
    const easeInExpo: () => Timing;
    const easeInOutQuint: () => Timing;
    const easeInSine: () => Timing;
    const easeInOutElastic: () => Timing;
    const easeOutElastic: () => Timing;
    const easeInOutExpo: () => Timing;
    const easeInOutBack: () => Timing;
    const easeOutBack: () => Timing;
    const easeInBounce: () => TimingObject;
    const easeInOutBounce: () => Timing;
}
export {};
