import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import "./index.css";
import { useInView } from 'react-intersection-observer';

function App()
{
      //const feeder = [{title:"onewa", creator : "twowa", pubdate : "threewa"},{title:"onema", creator : "twoma", pubdate : "threema"},{title:"oneka", creator : "twoka", pubdate : "threeka"}];
      //this.state = {feedor: [{title:"onewa", creator : "twowa", pubdate : "threewa"},{title:"onema", creator : "twoma", pubdate : "threema"},{title:"oneka", creator : "twoka", pubdate : "threeka"}]};
      //let [feed, setFeed] = useState([]);
      let feed = useRef([]);
      //let [refetch, setFetch] = useState(true);
      const refetch = useRef(1);
      let clkcall = useRef(1);
      const page = useRef(1);
      //let [page, setPage] = useState(1);
      let [feedres, setFeedres] = useState([]);
      //let feedres = useRef([]);

      const { ref, inView, entry } = useInView({
        /* Optional options */
        delay:0,
        threshold: 0,
      });

      async function makeCall() {
        refetch.current = 0;
        const res = await fetch('http://10.0.0.190:8080');
        console.log("Making call");
        const data = await res.json(); 
        //data = await res.json();
        //setFeed(data);
        //fetcher();
        return data;
    } ;
    
    async function fetcher() {
      let element = [];
      let response = [];
      console.log(refetch.current);
      console.log("Entering to call");
      if (refetch.current === 1) {
        response = await makeCall();
        refetch.current = 0;
        feed.current = response; 
      }
      else {
        response = feed.current;
        console.log(feed[0]);
        console.log("Else triggered");
      }
      //console.log("just b4 for");
      console.log(page);
      for (let index = 0; index < 4*page.current; index++) {
        //console.log(response);
        console.log("response");
        element.push(response[index]);          
      }
      console.log(element);
      //console.log("page here");
      page.current = page.current+1;
      setFeedres(element);
      //feedres.current = element;
      //setFetch(false);
      //console.log(feedres[0]);
    }

    /*if (refetch.current = 0 && {inView}) {
      setPage(page+1);
      //page.current = page.current+1;
      console.log({inView});
      console.log("Inview");
    }*/
    useEffect(() => {
        //const response = async () => {await makeCall(); setFeed(response);}
        //makeCall();
        //if (inView) {page.current=page.current+1;}  
        console.log("In use efect"); 
        if (inView) {fetcher();}
        console.log(inView);      
    }, [inView]);  
    
    function onclickhandler(checker) {
      //const feedmod = feed.current.filter(fee => fee._id !== checker); 
      //setFeed(feedmod);
      feed.current = feed.current.filter(fee => fee._id !== checker);
      clkcall.current = clkcall.current+1;
      page.current=page.current-1;
      fetcher();
      //setFetch(prevCheck => !prevCheck);
      //console.log(feedmod);
    }
    
    //console.log({inView}); 

    //let idg = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
    return (
      <div>
      {feedres.map(fee => <Card title={fee.title} pub={fee.pub} link = {fee._id} creator = {fee.creator} desc = {fee.desc} image = {fee.image} key={Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)} onclick={onclickhandler} />)}
      <div ref={ref}>
      
    </div>
      </div>
           );
  }

export default App;

      /*{feed.map(fee => <Card title={fee[4]} link = {fee[0]} creator = {fee[6]} pubdate={fee[5]} desc = {fee[7]} id={fee[0]} key={fee[1]} onclick={onclickhandler} />)}*/

/*<h2>{`Header inside viewport ${inView}.`}</h2>*/
//const baseURL = "/api";
//{feed.map(fee => <Card title={fee.title} creator = {fee.creator} pubdate={fee.pubdate} onclick={onclickhandler} />)}


//  const [post, setPost] = React.useState(null);

//  React.useEffect(() => {
//    axios.get(baseURL).then((response) => {
//      setPost(response);
//    });
//  }, []);

//  if (!post) return null;

// <Card title="La la" creator="Ba ba" pubdate="Ja ja" />

// <p className="card">"walahala"</p>

    //fetch('http://localhost:8080').then((response) => { return response.json()}).then((data) => setFeed(data));
        //console.log("Ran once");
        //console.log(Object.keys(feed[1]));  
      //}, []);  
    
