import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import "./index.css";
import { useInView } from 'react-intersection-observer';

function App()
{
      let feed = useRef([]);
      const refetch = useRef(1);
      const page = useRef(1);
      let [feedres, setFeedres] = useState([]);
      
      const { ref, inView } = useInView({
        delay:0,
        threshold: 0,
      });

      async function makeCall() {
        refetch.current = 0;
        const res = await fetch('http://10.0.0.190:8080');
        const data = await res.json(); 
        return data;
      } ;
    // Fetcher decides whether to make the API call OR use the pre-fetched response to push elements for display. Fetched articles are displayed in viewport as user scrolls
    async function fetcher() {
      let element = [];
      let response = [];
      if (refetch.current === 1) {
        response = await makeCall();
        refetch.current = 0;
        feed.current = response; 
      }
      else {
        response = feed.current;
      }
      // For loop decides how many articles are populated in one go
      for (let index = 0; index < 40*page.current; index++) {
        element.push(response[index]);          
      }
      // With every scroll, as the viewport changes more items are loaded
      page.current = page.current+1;
      setFeedres(element);
      
    }
      // If the invisible box is visible postscroll, call more articles for display
    useEffect(() => {
        if (inView) {fetcher();}
    }, [inView]);  
    
    function onclickhandler(checker) {
      feed.current = feed.current.filter(fee => fee._id !== checker);
      //Load n-1 items because otherwise with every click the loaded items will expand by 4x
      page.current=page.current-1;
      //Keep the window from scrolling to top
      const scrollPosition = window.scrollY;
      fetcher();
      window.scrollTo(0, scrollPosition);
    }
    
    return (
      <div>
      {feedres.map(fee => <Card title={fee.title} pub={fee.pub} link = {fee._id} creator = {fee.creator} desc = {fee.desc} image = {fee.image} key={Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)} onclick={onclickhandler} />)}
      <div ref={ref}>
      
    </div>
      </div>
           );
  }

export default App;
