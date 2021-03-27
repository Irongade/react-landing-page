import React, {useState, useEffect} from 'react';
import {NavLink,useHistory} from "react-router-dom";
import {ReactComponent as UpArrow} from "../assets/up-arrow-circle.svg";
import gsap from "gsap";

let tl = gsap.timeline();

const Header = ({dimensions}) => {
  const [menuState, setMenuState] = useState({menuOpened: false})
  const history = useHistory();

  useEffect(() => {

    // for page changes
    history.listen(() => {
      setMenuState({menuOpened: false})
    })


    if(menuState.menuOpened === true) {
      // run open menu anim

      // prep body for animation
      tl.to("body", {
        duration: 0.01, css: {overflow: "hidden"}
      })
      .to(".App", { // bring menu down
        duration: 1,
        y: dimensions.width <= 654 ? "70vh" : dimensions.height / 2,
        ease: "expo.inOut"
      })
      .to(".hamburger-menu span", { // for the two nav lines
        duration: .6,
        delay: -1,
        scaleX: 0,
        transformOrigin: "50% 0%",
        ease: "expo.inOut"
      })
      .to("#Path_1", { // for the animation of the svgs
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 5,
          strokeDashoffset: 10
        }
      })
      .to("#Path_2", {
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 20,
          strokeDashoffset: 10
        }
      })
      .to("#Line_1", {
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 18,
          strokeDashoffset: 40
        }
      })
      .to("#circle", {
        duration: .6,
        delay: -.8,
        css: {
          strokeDashoffset: 0
        }
      })
      .to(".hamburger-menu-close", { // for the hamburger svg parent div
        duration: .6,
        delay: -.8,
        css: {
          display: "block"
        }
      })

    } else {
      // run close menu animation

      tl.to(".App", {
        duration: 1,
        y: 0,
        ease: "expo.inOut"
      })
      .to("#circle", {
        duration: .6,
        delay: -.6,
        css: {
          strokeDasharray: 227,
          strokeDashoffset: -193
        }
      })
      .to("#Path_1", {
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 10,
          strokeDashoffset: 10
        }
      })
      .to("#Path_2", {
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 10,
          strokeDashoffset: 10
        }
      })
      .to("#Line_1", {
        duration: .4,
        delay: -.6,
        css: {
          strokeDasharray: 40,
          strokeDashoffset: 40
        }
      })
      .to(".hamburger-menu span", { // bringing back the two nav lines
        duration: .6,
        delay: -.4,
        scaleX: 1,
        transformOrigin: "50% 0%",
        ease: "expo.inOut"
      })
      .to(".hamburger-menu-close", {
        css: {
          display: "none"
        }
      })
      .to("body", {
        css: {
          overflow: "auto"
        }
      })
    }

  }, [menuState.menuOpened])


  return (
    <div className="header">
        <div className="container">
            <div className="row v-center space-between">
              <div className="logo">
                  <NavLink to="/"> AGENCY </NavLink>
              </div>
              <div className="nav-toggle">
                <div onClick={() => setMenuState({menuOpened: true})} className="hamburger-menu">
                  <span></span>
                  <span></span>
                </div>
                <div onClick={() => setMenuState({menuOpened: false})} className="hamburger-menu-close">
                  <UpArrow />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header;
