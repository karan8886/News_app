import React, {useState} from "react";
import  "./index.css";
//const cors = require('cors');

function Card(props) {
  //console.log(props.link);
  //console.log(props.title);
  //const [show, setShow] = useState(props);
  function likeHandler() { props.onclick(props.link);msg('l');}
  function keepHandler() { props.onclick(props.link);msg('k');}
  //function authHandler() { props.onclick(props.link);msg('na');}
  //function topicHandler() { props.onclick(props.link);msg('nt');}
  function itemHandler() { props.onclick(props.link);msg('ni');}
  
  function msg(pass) {
    fetch('http://10.0.0.190:8080/api',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify({ id: props.link, msg: pass })
    });
    //console.log("outside fetch");
  };
  function handleScroll() {
    console.log('scrollTop: ');
    }
  return (
    <div onScroll={handleScroll} className="card">
         <img className="image" src={props.image} alt="" />
         <a href={props.link} className="name">{props.title}</a>
        <p className="info"><em>{props.pub}</em><em> - </em><em>{props.creator}</em></p>
        <p className="info">{props.desc}</p>
        <button onClick={likeHandler} className="btn" >Like</button>
        <button onClick={keepHandler} className="btn" >Keep</button>
        {/*<button onClick={authHandler} className="btn" >~Author</button>
        <button onClick={topicHandler} className="btn" >~Topic</button>*/}
        <button onClick={itemHandler} className="btn" >~Item</button>

    </div>

  );
}

export default Card;
