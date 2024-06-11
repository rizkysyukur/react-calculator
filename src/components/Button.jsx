const Button = ({ value, className, onClick }) => {
    const getAdditionalClass = (val) => {
        switch (val) {
            case "C": return "red-btn";
            case " ± ":
            case "%": return "blue-btn";
            case "÷":
            case "×":
            case "+":
            case "-": return "green-btn";
            case "=": return "yellow-btn";
            default: return "";
        }
    };

    return (
        <div onClick={onClick} className={`${className} ${getAdditionalClass(value)}`}>
            {value}
        </div>
    );
};

export default Button;
