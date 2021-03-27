import React, {useEffect, useState} from 'react';
import { Route } from "react-router-dom"
import gsap from "gsap"
import './styles/App.scss';

import Header from "./components/header"
import Navigation from "./components/navigation"

// pages 
import Home from "./pages/home"
import CaseStudies from "./pages/caseStudies";
import Approach from "./pages/approach";
import Services from "./pages/services";
import About from "./pages/about";

const routes = [
  {path: "/", name: "Home", Component: Home},
  {path: "/case-studies", name: "Case Studies", Component: CaseStudies},
  {path: "/approach", name: "Approach", Component: Approach},
  {path: "/services", name: "Services", Component: Services},
  {path: "/about", name: "About", Component: About},
];

// to prevent multiple rerendering
function debounce(fn,ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments)
    }, ms)
  }
  
}

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {

    let vh = dimensions.height * .01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

     // prevent flashing
     gsap.to("body", {
      css: {visibility: "visible"}
    })

    // check if page is being resized

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 1000)

    window.addEventListener("resize", debouncedHandleResize)

    return () => {
      window.removeEventListener("resize", debouncedHandleResize)
    }

  })

  
  return (
    <>
      <Header dimensions={dimensions} />
      <div className="App">
        {
          routes.map(({path, Component}) => (
            <Route key={path} exact path={path}>
              <Component />
            </Route>
          ))
        }
      </div>
      <Navigation />
    </>
  );
}

export default App;
