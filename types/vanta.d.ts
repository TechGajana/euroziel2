declare module 'vanta/dist/vanta.clouds.min' {
  interface CloudsOptions {
    el: HTMLElement | null;
    THREE: object;
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

declare module 'vanta/dist/vanta.birds.min' {
  interface BirdsOptions {
    el: HTMLElement | null;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color1?: number;
    color2?: number;
    colorMode?: 'variance' | 'gradient' | 'solid';
    quantity?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    cohesion?: number;
    separation?: number;
    alignment?: number;
  }
  interface VantaEffect {
    destroy: () => void;
  }
  export default function BIRDS(options: BirdsOptions): VantaEffect;
}