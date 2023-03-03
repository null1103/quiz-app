import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from './components/Quiz.js'
import Welcome from "./components/Welcome.js";
import "./index.scss"

const App = () => {
    const [started, setStarted] = React.useState(false)
    function startQuiz() {
        setStarted(true);
    }
    function resetQuiz() {
        setStarted(false);
    }
    return (
        <div className="container">
            {!started && <Welcome handleStart={startQuiz}/>}
            {started && <Quiz handleReset={resetQuiz} />}
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);