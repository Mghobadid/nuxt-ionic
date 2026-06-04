import type { Animation, AnimationDirection, AnimationFill, AnimationKeyFrames } from '@ionic/vue';
interface AnimationFromObject {
    property: string;
    fromValue: string;
}
interface AnimationFromToObject {
    property: string;
    fromValue: string;
    toValue: string;
}
type AnimationStyles = {
    [key: string]: any;
};
interface AnimationOptions {
    id?: string;
    duration?: number;
    iterations?: number;
    easing?: string;
    fill?: AnimationFill;
    direction?: AnimationDirection;
    from?: AnimationFromObject | AnimationFromObject[] | null;
    fromTo?: AnimationFromToObject | AnimationFromToObject[] | null;
    keyframes?: AnimationKeyFrames | null;
    playOnMount?: boolean;
    playOnVisible?: boolean;
    beforeStyles?: AnimationStyles | null;
    beforeAddClass?: string | string[] | null;
    beforeClearStyles?: string[] | null;
    afterStyles?: AnimationStyles | null;
    afterAddClass?: string | string[] | null;
    afterClearStyles?: string[] | null;
}
declare var __VLS_1: {
    animation: {
        parentAnimation: /*elided*/ any | undefined;
        elements: HTMLElement[];
        childAnimations: /*elided*/ any[];
        id: string | undefined;
        play: (opts?: import("@ionic/core/dist/types/utils/animation/animation-interface").AnimationPlayOptions) => Promise<void>;
        pause: () => void;
        stop: () => void;
        destroy: (clearStyleSheets?: boolean) => void;
        progressStart: (forceLinearEasing?: boolean, step?: number) => Animation;
        progressStep: (step: number) => Animation;
        progressEnd: (playTo: 0 | 1 | undefined, step: number, dur?: number) => Animation;
        from: (property: string, value: string | number) => Animation;
        to: (property: string, value: string | number) => Animation;
        fromTo: (property: string, fromValue: string | number, toValue: string | number) => Animation;
        keyframes: (keyframes: AnimationKeyFrames) => Animation;
        addAnimation: (animationToAdd: Animation | Animation[]) => Animation;
        addElement: (el: Element | Element[] | Node | Node[] | NodeList) => Animation;
        iterations: (iterations: number) => Animation;
        fill: (fill: AnimationFill | undefined) => Animation;
        direction: (direction: AnimationDirection | undefined) => Animation;
        duration: (duration: number | undefined) => Animation;
        easing: (easing: string | undefined) => Animation;
        delay: (delay: number | undefined) => Animation;
        getKeyframes: () => AnimationKeyFrames;
        getDirection: () => AnimationDirection;
        getFill: () => AnimationFill;
        getDelay: () => number;
        getIterations: () => number;
        getEasing: () => string;
        getDuration: () => number;
        getWebAnimations: () => globalThis.Animation[];
        afterAddRead: (readFn: () => void) => Animation;
        afterAddWrite: (writeFn: () => void) => Animation;
        afterClearStyles: (propertyNames: string[]) => Animation;
        afterStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        afterAddClass: (className: string | string[]) => Animation;
        afterRemoveClass: (className: string | string[]) => Animation;
        beforeAddRead: (readFn: () => void) => Animation;
        beforeAddWrite: (writeFn: () => void) => Animation;
        beforeClearStyles: (propertyNames: string[]) => Animation;
        beforeStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        beforeAddClass: (className: string | string[]) => Animation;
        beforeRemoveClass: (className: string | string[]) => Animation;
        onFinish: (callback: import("@ionic/core").AnimationLifecycle, opts?: import("@ionic/core").AnimationCallbackOptions) => Animation;
        isRunning: () => boolean;
        parent: (animation: Animation) => Animation;
        update: (deep: boolean, toggleAnimationName: boolean, step?: number) => Animation;
        animationFinish: () => void;
    } | null;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<AnimationOptions, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AnimationOptions> & Readonly<{}>, {
    id: string;
    fill: AnimationFill;
    duration: number;
    iterations: number;
    easing: string;
    direction: AnimationDirection;
    from: AnimationFromObject | AnimationFromObject[] | null;
    fromTo: AnimationFromToObject | AnimationFromToObject[] | null;
    keyframes: AnimationKeyFrames | null;
    playOnMount: boolean;
    playOnVisible: boolean;
    beforeStyles: AnimationStyles | null;
    beforeAddClass: string | string[] | null;
    beforeClearStyles: string[] | null;
    afterStyles: AnimationStyles | null;
    afterAddClass: string | string[] | null;
    afterClearStyles: string[] | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
