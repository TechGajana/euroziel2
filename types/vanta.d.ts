// types/vanta.d.ts
declare module 'vanta/dist/vanta.clouds.min' {
  import * as THREE from 'three';

  interface CloudsOptions {
    el: HTMLElement | null;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
    quantity?: number;
    texturePath?: string;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  export default function CLOUDS(options: CloudsOptions): VantaEffect;
}