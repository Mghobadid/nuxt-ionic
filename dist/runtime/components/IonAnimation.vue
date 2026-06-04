<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { createAnimation } from "@ionic/vue";
const props = defineProps({
  id: { type: String, required: false, default: "" },
  duration: { type: Number, required: false, default: 1e3 },
  iterations: { type: Number, required: false, default: 1 },
  easing: { type: String, required: false, default: "linear" },
  fill: { type: String, required: false, default: "auto" },
  direction: { type: String, required: false, default: "normal" },
  from: { type: [Object, Array, null], required: false, default: null },
  fromTo: { type: [Object, Array, null], required: false, default: null },
  keyframes: { type: [Array, null], required: false, default: null },
  playOnMount: { type: Boolean, required: false, default: false },
  playOnVisible: { type: Boolean, required: false, default: false },
  beforeStyles: { type: [Object, null], required: false, default: null },
  beforeAddClass: { type: [String, Array, null], required: false, default: null },
  beforeClearStyles: { type: [Array, null], required: false, default: null },
  afterStyles: { type: [Object, null], required: false, default: null },
  afterAddClass: { type: [String, Array, null], required: false, default: null },
  afterClearStyles: { type: [Array, null], required: false, default: null }
});
const element = ref(null);
const animation = ref(null);
let observer;
onMounted(() => {
  animation.value = createAnimation(props.id).addElement(element.value).duration(props.duration).iterations(props.iterations).easing(props.easing).fill(props.fill).direction(props.direction).beforeStyles(props.beforeStyles ?? {}).beforeAddClass(props.beforeAddClass ?? []).beforeClearStyles(props.beforeClearStyles ?? []).afterStyles(props.afterStyles ?? {}).afterAddClass(props.afterAddClass ?? []).afterClearStyles(props.afterClearStyles ?? []);
  const hasKeyframes = Array.isArray(props.keyframes) && props.keyframes.length > 0;
  if (hasKeyframes) {
    animation.value.keyframes(props.keyframes);
  }
  if (props.from !== null && !hasKeyframes) {
    if (Array.isArray(props.from)) {
      props.from.forEach(({ property, fromValue }) => {
        animation.value.from(property, fromValue);
      });
    } else {
      animation.value.from(props.from.property, props.from.fromValue);
    }
  }
  if (props.fromTo !== null && !hasKeyframes) {
    if (Array.isArray(props.fromTo)) {
      props.fromTo.forEach(({ property, fromValue, toValue }) => {
        animation.value.fromTo(property, fromValue, toValue);
      });
    } else {
      animation.value.fromTo(props.fromTo.property, props.fromTo.fromValue, props.fromTo.toValue);
    }
  }
  if (props.playOnVisible && !props.playOnMount) {
    observer = new IntersectionObserver(
      () => {
        animation.value.play();
        observer.disconnect();
      },
      {
        // Use viewport as root element
        root: null,
        rootMargin: "0px",
        threshold: 0.5
      }
    );
    observer.observe(element.value);
  } else if (props.playOnMount) animation.value.play();
});
onBeforeUnmount(() => {
  animation.value?.destroy();
  if (observer) observer.disconnect();
});
</script>

<template>
  <div ref="element">
    <slot :animation="animation" />
  </div>
</template>
