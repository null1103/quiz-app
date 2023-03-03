import React from "react";

export default function Welcome(props){
    return(
        <div className="quiz-welcome">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-description">Description goes here</p>
            <button className="quiz-start" onClick={props.handleStart}>Start Quiz</button>
        </div>
    )
}