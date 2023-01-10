import React, { useState } from 'react';
import './Quiz.css';

export default function Quiz() {
    const questions = [
        {
            "title": "Who taught Care of Magical Creatures while Hagrid was away?",
            "choices": [
                {
                    "text": "Professor Grubbly-Plank",
                    "isCorrect": true
                },
                {
                    "text": "Professor Sprout",
                    "isCorrect": false
                },
                {
                    "text": "Professor Marchbanks",
                    "isCorrect": false
                },
                {
                    "text": "Professor Tofty",
                    "isCorrect": false
                }
            ]
        },
        {
            "title": "Which of the following is a truth serum?",
            "choices": [
                {
                    "text": "Felix Felicis",
                    "isCorrect": false
                },
                {
                    "text": "Veritaserum",
                    "isCorrect": true
                },
                {
                    "text": "Amortentia",
                    "isCorrect": false
                },
                {
                    "text": "Babbling Beverage",
                    "isCorrect": false
                }
            ]
        }
        ,
        {
            "title": "What date was Harry born?",
            "choices": [
                {
                    "text": "July 31, 1981",
                    "isCorrect": true
                },
                {
                    "text": "July 30, 1981",
                    "isCorrect": false
                },
                {
                    "text": "July 30, 1980",
                    "isCorrect": false
                },
                {
                    "text": "July 31, 1980",
                    "isCorrect": false
                }
            ]
        }
    ];
    const [finished, setFinished] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const handleChoiceClick = (isCorrect) => {
        if(isCorrect) {
            setScore(score+1);
        }
        const nextIndex = currentIndex + 1;
        if(nextIndex<questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            setFinished(true);
        }
    };
    const handleRestart = () => {
        setScore(0);
        setCurrentIndex(0);
        setFinished(false);
    };
    return(
        <div className='container'>
            {finished ? (
                <div className='score-section'>
                    You scored {score}/{questions.length}
                    <button onClick={() => handleRestart()}>Restart</button>
                </div>
            ):(
                <div>
                    <div className='question-section'>
                        <div className='count'>Question {currentIndex+1}/{questions.length}</div>
                        <div className='question-title'>{questions[currentIndex].title}</div>
                    </div>
                    <div className='choice-section'>
                        {questions[currentIndex].choices.map(choice =>(
                            <button onClick={() => handleChoiceClick(choice.isCorrect)}>{choice.text}</button>
                        ))}
                        
                    </div>
                </div>
            )}
        </div>
    )
}