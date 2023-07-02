import React, {useState} from "react";
import  "./index.css";

function Card(props) {
  function likeHandler() { props.onclick(props.link);msg('l');}
  function keepHandler() { props.onclick(props.link);msg('k');}
  function itemHandler() { props.onclick(props.link);msg('ni');}
  
  function msg(pass) {
    fetch('http://10.0.0.190:8080/api',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify({ id: props.link, msg: pass })
    });
  };
  //function handleScroll() {
  //  console.log('scrollTop: ');
  //  } onScroll={handleScroll}
  return (
    <div  className="card">
         <img className="image" src={props.image} alt="" />
         <a href={props.link} className="name">{props.title}</a>
        <p className="info"><em>{props.pub}</em><em> - </em><em>{props.creator}</em></p>
        <p className="info">{props.topic}</p>
        <p className="info">{props.desc}</p>
        <button onClick={likeHandler} className="btn" >Like</button>
        <button onClick={keepHandler} className="btn" >Keep</button>
        <button onClick={itemHandler} className="btn" >~Item</button>

    </div>

  );
}

export default Card;
