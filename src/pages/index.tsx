import React, { type ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import './homepageStyles.css'; // Create this file if it doesn't exist


import styles from './index.module.css';
import './gradient-animation.css'; // or './gradient-animation.scss'
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const interactiveRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const interBubble = interactiveRef.current;
    if (!interBubble) return;

    // --- Get bubble dimensions ---
    // We get it once on mount. If the size changes dynamically (e.g., viewport resize causing vmax change),
    // you might need a resize listener to update these offsets.
    const bubbleWidth = interBubble.offsetWidth;
    const bubbleHeight = interBubble.offsetHeight;
    const offsetX = bubbleWidth / 2;
    const offsetY = bubbleHeight / 2;
    // --- End of getting dimensions ---


    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      // Added null check for safety, although should be set by listener first
      if (tgX === null || tgY === null) {
        animationFrameId.current = requestAnimationFrame(move);
        return;
      }

      curX += (tgX - curX) / 20; // Smooth interpolation
      curY += (tgY - curY) / 20; // Smooth interpolation

      // --- Adjust translation to center the bubble ---
      const transformX = curX - offsetX;
      const transformY = curY - offsetY;
      // --- End of adjustment ---

      // Apply the adjusted transform
      interBubble.style.transform = `translate(${Math.round(transformX)}px, ${Math.round(transformY)}px)`;

      animationFrameId.current = requestAnimationFrame(move);
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    // Initialize target coordinates to avoid jump on first move
    // You could maybe set initial tgX/tgY to center of header or 0,0
    // For now, let's let it start wherever it calculates first
    // tgX = window.innerWidth / 2; // Example initial position
    // tgY = window.innerHeight / 2; // Example initial position

    window.addEventListener('mousemove', handleMouseMove);

    // Start the animation loop
    move(); // Call move directly, no need for the null check wrapper here

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []); // Empty dependency array

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', top: '0', left: '0', height: '0', width: '0' }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive" ref={interactiveRef}></div>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="title-box"> {/* Added this wrapper div */}
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start
          </Link>
        </div>
        </div> {/* Close wrapper div */}
      </div>
    </header>
  );
}

// Keep the rest of your Home component the same
export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}