import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import Button from "./Button";

const btnValues = [
    ["C", " ± ", "%", "÷"],
    [7, 8, 9, "×"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const Calculator = () => {
    const [btnNum, setBtnNum] = useState("");
    const [btnNum2, setBtnNum2] = useState("");
    const [symbol, setSymbol] = useState("");
    const [result, setResult] = useState("");

    const reset = () => {
        setBtnNum("");
        setBtnNum2("");
        setResult("");
        setSymbol("");
    };

    const calculate = () => {
        const num1 = parseFloat(btnNum);
        const num2 = parseFloat(btnNum2);
        let res;
        switch (symbol) {
            case "÷": res = num1 / num2; break;
            case "×": res = num1 * num2; break;
            case "-": res = num1 - num2; break;
            case "+": res = num1 + num2; break;
            default: break;
        }
        setResult(res);
        setBtnNum(res.toString());
        setBtnNum2("");
        setSymbol("");
    };

    const handleButtonClick = (val) => {
        if (val === 'C') return reset();
        if (val === '=') return calculate();
        if (val === '%') return setResult((parseFloat(btnNum) / 100).toString());

        if (!btnNum && isNaN(val)) return;
        if (!btnNum && val === '.') return setBtnNum('0.');
        if (btnNum && symbol && !btnNum2 && val === '.') return setBtnNum2('0.');

        if (btnNum && !symbol && val === '.') {
            if (btnNum.includes('.')) return;
            return setBtnNum(prevValue => prevValue + '.');
        }

        if (btnNum && symbol && btnNum2 && val === '.') {
            if (btnNum2.includes('.')) return;
            return setBtnNum2(prevValue => prevValue + '.');
        }

        if (btnNum && btnNum2 && val === ' ± ') return setBtnNum2((prevValue => (parseFloat(prevValue) * -1).toString()));
        if (btnNum && !btnNum2 && val === ' ± ') return setBtnNum((prevValue => (parseFloat(prevValue) * -1).toString()));

        if (!isNaN(val) && !symbol) {
            if ((val === '0' && !btnNum) || (val === '0' && btnNum === '0')) return;
            return setBtnNum(prevValue => prevValue === '0' ? val.toString() : prevValue + val);
        }

        if (!isNaN(val) && symbol) {
            if ((val === '0' && !btnNum2) || (val === '0' && btnNum2 === '0')) return;
            return setBtnNum2(prevValue => prevValue === '0' ? val.toString() : prevValue + val);
        }

        if (isNaN(val) && val !== ' ± ' && val !== '.') return setSymbol(val);
    };


    return (
        <div className="main-container">
            <Display text={result || btnNum2 || btnNum || "0"} />
            <Keypad>
                {btnValues.flat().map((value, i) => (
                    <Button
                        className={value === 0 ? "long-btn" : "btn"}
                        key={i}
                        value={value}
                        onClick={() => handleButtonClick(value)}
                    />
                ))}
            </Keypad>
        </div>
    );
};

export default Calculator;
