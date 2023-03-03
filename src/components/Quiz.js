import React, { useState } from 'react';
import axios from "axios";
import { nanoid } from 'nanoid';

export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([]);
    const [isCheckAnswers, setIsCheckAnswers] = React.useState(false);
    const [score, setScore] = React.useState(0);
    React.useEffect(()=> {
        const url = 'https://opentdb.com/api.php?amount=5&category=9'
        axios.get(url).then(response => {
            let responseQuestions = response.data.results;
            const obj = [];
            for (let i = 0; i < responseQuestions.length; i++) {
                let choices = [];
                responseQuestions[i].incorrect_answers.forEach(element => {
                    choices.push({
                        "id": nanoid(),
                        "text": element,
                        "isCorrect": false,
                        "isSelected": false
                    })
                });
                let func = (Math.random() < 0.5) ? 'floor' : 'ceil';
                let randomIndex = Math.floor(Math.random() * choices.length);
                if(func==='ceil') {
                    randomIndex = Math.ceil(Math.random() * choices.length);
                }
                choices.splice(randomIndex, 0, {
                    "id": nanoid(),
                    "text": responseQuestions[i].correct_answer,
                    "isCorrect": true,
                    "isSelected": false
                });
                obj.push({
                    "id": nanoid(),
                    "title": responseQuestions[i].question,
                    "choices": choices
                })
            }
            setQuestions(obj);
        })
    },[])

    function handleClick(questionId, choiceId) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(prevQuestion => {
                if (prevQuestion.id === questionId) {
                    const updatedChoices = prevQuestion.choices.map(choice => {
                        return choice.id === choiceId? {...choice, isSelected: true}: {...choice, isSelected: false}
                    })
                    return {...prevQuestion, choices: updatedChoices};
                } else {
                    return prevQuestion;
                }
            });
        });
    }

    function handleCheckAnswers(){
        let currentScore = 0;
        questions.forEach(question => {
            question.choices.forEach(choice => {
                if(choice.isSelected && choice.isCorrect) {
                    currentScore = currentScore+1;
                }
            })
        })
        setScore(currentScore);
        setIsCheckAnswers(true);
    }
    function handlePlayAgain() {
        setQuestions([]);
        setIsCheckAnswers(false);
        props.handleReset();
    }

    const questionItems = questions.map(question => {
        return (
            <div className="quiz-section" key={question.id}>
                <h3 dangerouslySetInnerHTML={{__html: question.title}}></h3>
                {question.choices.map(choice => {
                    let classes = 'btn';
                    let isChoiceDisabled=false;
                    if(!isCheckAnswers && choice.isSelected) {
                        classes = 'btn selected';
                    }
                    if(isCheckAnswers) {
                        isChoiceDisabled=true;
                        if(choice.isCorrect) {
                            classes = 'btn correct'
                        } else {
                            if(choice.isSelected) {
                                classes = 'btn incorrect'
                            } else {
                                classes = 'btn other'
                            }  
                        }
                    }
                    return <button key={choice.id} 
                        className={classes}
                        disabled={isChoiceDisabled}
                        onClick={() => handleClick(question.id, choice.id)} 
                        dangerouslySetInnerHTML={{__html: choice.text}}>
                    </button>
                })
                }
            </div>
        )        
    })

    const enabled = questions.every(question => question.choices.some(choice => choice.isSelected === true));

    return (
        <div className='quiz-container'>
            {questionItems}
            <div className='actions'>
                {isCheckAnswers ? (
                    <>
                        You scored {score}/{questions.length} correct answers
                        <button className='btn-action' onClick={handlePlayAgain}>Play again</button>
                    </>
                ): <button className='btn-action' onClick={handleCheckAnswers} disabled={!enabled}>Check answers</button> }
            </div>
        </div> 
    )
}