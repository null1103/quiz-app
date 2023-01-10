import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from './components/quiz/Quiz.js'

const App = () => {
    return (
        <Quiz />
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);