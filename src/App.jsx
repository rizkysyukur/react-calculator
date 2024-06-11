import React from "react";
import Calculator from "./components/Calculator"


const App = () => (
    <div className="App">
        <div className="title">
            <p className="line-1 anim-typewriter">REACT CALCULATOR</p>
        </div>
        <div className="calculator">
            <Calculator />
        </div>
    </div>

);


export default App;
