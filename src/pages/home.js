import React, { useEffect, useState } from "react";
import IntroOverlay from "../components/introOverlay";
import Banner from "../components/banner";
import Cases from "../components/cases";
import gsap from "gsap";

const tl = gsap.timeline();

const homeAnimation = (completeAnimation) => {
  tl.from(".line span", {
    duration: 1.8,
    y: 100,
    ease: "power4.out",
    delay: 1,
    skewY: 7,
    stagger: {
      amount: 0.3
    }
  })
  .to(".overlay-top", {
    duration: 1.6,
    height: 0,
    ease: "expo.inOut",
    stagger: {
      amount: 0.4
    }
  })
  .to(".overlay-bottom", {
    duration: 1.6,
    width: 0,
    ease: "expo.inOut",
    delay: -0.8,
    stagger: {
      amount: 0.4
    }
  })
  .to(".intro-overlay", {
    css: {display: "none"}
  })
  .from(".case-image img", {
    duration: 1.6,
    scale: 1.4,
    ease: "expo.inOut",
    delay: -2,
    stagger: {
      amount: 0.4
    },
    onComplete: completeAnimation
  })
}


const Home = () => {

  const [animationComplete, setAnimationComplete] = useState(false);

  const completeAnimation = () => {
    setAnimationComplete(true);
  }

  useEffect(() => {
    //timleline

    homeAnimation(completeAnimation);

  }, [])

  return (
    <>
      {
        animationComplete === false ? <IntroOverlay /> : null
      }
      <Banner />
      <Cases />
    </>
  );
};

export default Home;
