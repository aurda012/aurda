import ThreeDCard from './3d-card-effect';
import { AnimatedPinDemo } from './3d-pin';
import { TabsDemo } from './animated-tabs';
import AnimatedTooltipDemo from './animated-tooltip';
import { AuroraBackgroundDemo } from './aurora-background';
import { BackgroundBeamsDemo } from './background-beams';
import { BackgroundBoxesDemo } from './background-boxes';
import { BackgroundGradientAnimationDemo } from './gradient-animation';
import { BentoGridDemo } from './bento-grid';
import { CanvasRevealEffectDemo } from './canvas-reveal-effect';
import { CardStackDemo } from './card-stack';
import { HeroScrollDemo } from './container-scroll';
import { EvervaultCardDemo } from './evervault-card';
import { GlobeDemo } from './github-globe';
import GoogleGeminiEffectDemo from './google-gemini-effect';
import { HeroHighlightDemo } from './hero-highlight';
import { HeroParallaxDemo } from './hero-parallax';
import { InfiniteMovingCardsDemo } from './infinite-moving-cards';
import { LampDemo } from './lamp-effect';
import { LayoutGridDemo } from './layout-grid';
import MacbookScroll from './macbook-scroll';
import { MeteorsDemo } from './meteor-effect';
import { MultiStepLoaderDemo } from './multi-step-loader';
import { ParallaxScrollDemo } from './parallax-scroll';
import { PlaceholdersAndVanishInputDemo } from './placeholder-vanish';
import { SparklesPreview } from './sparkles';
import { StickyScrollRevealDemo } from './sticky-scroll';
import { SVGMaskEffectDemo } from './svg-mask-effect';
import { TextRevealCardPreview } from './text-reveal-card';
import TracingBeamDemo from './tracing-beam';
import { BackgroundGradientDemo } from './background-gradient';
import { DirectionAwareHoverDemo } from './direction-aware-hover';
import { FollowingPointerDemo } from './following-pointer';

export const components = [
  {
    name: 'Macbook Scroll',
    description:
      'Scroll through the page and see the image come out of the screen.',
    path: '/awesome-ui/macbook-scroll',
    image: '/components/macbook-scroll.webp',
    component: <MacbookScroll />,
  },
  {
    name: '3D Card Effect',
    description:
      'A card perspective effect, hover over the card to elevate card elements.',
    path: '/awesome-ui/3d-card-effect',
    image: '/components/3d-card.webp',
    component: <ThreeDCard />,
  },
  {
    name: 'Google Gemini Effect',
    description: 'An effect of SVGs as seen on the Google Gemini Website.',
    path: '/awesome-ui/google-gemini-effect',
    image: '/components/google-gemini.png',
    component: <GoogleGeminiEffectDemo />,
  },
  {
    name: 'Tracing Beam',
    description:
      'A Beam that follows the path of an SVG as the user scrolls. Adjusts beam length with scroll speed.',
    path: '/awesome-ui/tracing-beam',
    image: '/components/tracing-beam.webp',
    component: <TracingBeamDemo />,
  },
  {
    name: 'Aurora Background',
    description:
      'A subtle Aurora or Southern Lights background for your website.',
    path: '/awesome-ui/aurora-background',
    image: '/components/aurora-background.webp',
    component: <AuroraBackgroundDemo />,
  },
  {
    name: 'Animated Tooltip',
    description: 'A cool tooltip that reveals on hover, follows mouse pointer.',
    path: '/awesome-ui/animated-tooltip',
    image: '/components/animated-tooltip.webp',
    component: <AnimatedTooltipDemo />,
  },
  {
    name: 'Background Beams',
    description:
      'Multiple background beams that follow a path of SVG, makes a good hero section background.',
    path: '/awesome-ui/background-beams',
    image: '/components/background-beams.webp',
    component: <BackgroundBeamsDemo />,
  },
  {
    name: 'Gradient Animation',
    description:
      'A smooth and elegant background gradient animation that changes the gradient position over time.',
    path: '/awesome-ui/gradient-animation',
    image: '/components/background-gradient-animation.webp',
    component: <BackgroundGradientAnimationDemo />,
  },
  {
    name: 'Bento Grid',
    description:
      'A skewed grid layout with Title, description and a header component',
    path: '/awesome-ui/bento-grid',
    image: '/components/bento-grid.webp',
    component: <BentoGridDemo />,
  },
  {
    name: 'Canvas Reveal Effect',
    description:
      "A dot background that expands on hover, as seen on Clerk's website",
    path: '/awesome-ui/canvas-reveal-effect',
    image: '/components/canvas-reveal-effect.webp',
    component: <CanvasRevealEffectDemo />,
  },
  {
    name: 'Card Stack',
    description:
      'Cards stack on top of each other after some interval. Perfect for showing testimonials.',
    path: '/awesome-ui/card-stack',
    image: '/components/card-stack.webp',
    component: <CardStackDemo />,
  },
  {
    name: 'Container Scroll Animation',
    description:
      'A scroll animation that rotates in 3d on scroll. Perfect for hero or marketing sections.',
    path: '/awesome-ui/container-scroll-animation',
    image: '/components/container-scroll.webp',
    component: <HeroScrollDemo />,
  },
  {
    name: 'Evervault Card',
    description:
      'A cool card with amazing hover effect, reveals encrypted text and a mixed gradient.',
    path: '/awesome-ui/evervault-card',
    image: '/components/evervault-card.webp',
    component: <EvervaultCardDemo />,
  },
  {
    name: 'Github Globe',
    description:
      "A globe animation as seen on GitHub's homepage. Interactive and customizable.",
    path: '/awesome-ui/github-globe',
    image: '/components/github-globe.webp',
    component: <GlobeDemo />,
  },
  {
    name: 'Hero Highlight',
    description:
      'A background effect with a text highlight component, perfect for hero sections.',
    path: '/awesome-ui/hero-highlight',
    image: '/components/hero-highlight.webp',
    component: <HeroHighlightDemo />,
  },
  {
    name: 'Hero Parallax',
    description:
      'A scroll effect with rotation, translation and opacity animations.',
    path: '/awesome-ui/hero-parallax',
    image: '/components/hero-parallax.webp',
    component: <HeroParallaxDemo />,
  },
  {
    name: 'Infinite Moving Cards',
    description:
      'A customizable group of cards that move infinitely in a loop. Made with Framer Motion and Tailwind CSS.',
    path: '/awesome-ui/infinite-moving-cards',
    image: '/components/infinite-moving-cards.webp',
    component: <InfiniteMovingCardsDemo />,
  },
  {
    name: 'Lamp Effect',
    description: 'A lamp effect as seen on linear, great for section headers.',
    path: '/awesome-ui/lamp-effect',
    image: '/components/lamp-effect.webp',
    component: <LampDemo />,
  },
  {
    name: 'Layout Grid',
    description:
      'A layout effect that animates the grid item on click, powered by framer motion layout.',
    path: '/awesome-ui/layout-grid',
    image: '/components/layout-grid.webp',
    component: <LayoutGridDemo />,
  },
  {
    name: 'Meteor Effect',
    description:
      'A group of beams in the background of a container, sort of like meteors.',
    path: '/awesome-ui/meteor-effect',
    image: '/components/meteor-effect.webp',
    component: <MeteorsDemo />,
  },
  {
    name: 'Parallax Grid Scroll',
    description:
      'A grid where two columns scroll in oposite directions, giving a parallax effect.',
    path: '/awesome-ui/parallax-scroll',
    image: '/components/parallax-scroll.webp',
    component: <ParallaxScrollDemo />,
  },
  {
    name: 'Placeholder Vanish',
    description: 'Sliding in placeholders and vanish effect of input on submit',
    path: '/awesome-ui/placeholder-vanish',
    image: '/components/placeholder-vanish.webp',
    component: <PlaceholdersAndVanishInputDemo />,
  },
  {
    name: 'Sparkles',
    description:
      'A configurable sparkles component that can be used as a background or as a standalone component.',
    path: '/awesome-ui/sparkles',
    image: '/components/sparkles.png',
    component: <SparklesPreview />,
  },
  {
    name: 'Sticky Scroll Reveal',
    description:
      'A sticky container that sticks while scrolling, text reveals on scroll',
    path: '/awesome-ui/sticky-scroll-reveal',
    image: '/components/sticky-scroll.webp',
    component: <StickyScrollRevealDemo />,
  },
  {
    name: 'Animated Tabs',
    description:
      'Tabs to switch content, click on a tab to check background animation.',
    path: '/awesome-ui/animated-tabs',
    image: '/components/tabs.webp',
    component: <TabsDemo />,
  },
  {
    name: 'Text Reveal Card',
    description:
      'Mousemove effect to reveal text content at the bottom of the card.',
    path: '/awesome-ui/text-reveal-card',
    image: '/components/text-reveal-card.webp',
    component: <TextRevealCardPreview />,
  },
  {
    name: 'Multi-Step Loader',
    description:
      'Mousemove effect to reveal text content at the bottom of the card.',
    path: '/awesome-ui/multi-step-loader',
    image: '/components/multi-step-loader.webp',
    component: <MultiStepLoaderDemo />,
  },
  {
    name: '3D Animated Pin',
    description:
      'A gradient pin that animates on hover, perfect for product links.',
    path: '/awesome-ui/3d-animated-pin',
    image: '/components/3d-pin.webp',
    component: <AnimatedPinDemo />,
  },
  {
    name: 'Background Boxes',
    description:
      'A full width background box container that highlights on hover',
    path: '/awesome-ui/background-boxes',
    image: '/components/background-boxes.webp',
    component: <BackgroundBoxesDemo />,
  },
  {
    name: 'Background Gradient',
    description:
      'An animated gradient that sits at the background of a card, button or anything.',
    path: '/awesome-ui/background-gradient',
    image: '/components/background-gradient.webp',
    component: <BackgroundGradientDemo />,
  },
  {
    name: 'Direction Aware Hover',
    description:
      'A direction aware hover effect using Framer Motion, Tailwindcss and good old javascript.',
    path: '/awesome-ui/direction-aware-hover',
    image: '/components/direction-aware-hover.webp',
    component: <DirectionAwareHoverDemo />,
  },
  {
    name: 'Following Pointer',
    description:
      'A custom pointer that follows mouse arrow and animates in pointer and content.',
    path: '/awesome-ui/following-pointer',
    image: '/components/following-pointer.webp',
    component: <FollowingPointerDemo />,
  },
];
