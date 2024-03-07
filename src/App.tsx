import { useReducer } from "react";
import DigitButton from "./Components/DigitButton";
import OperatorButton from "./Components/OperatorButton";
import "./App.css";
import { Link } from "react-router-dom";
interface ICalculatorState {
  history: string,
  val1: string,
  val2: string,
  operator: string
}
type CalculatorAction =
  | { type: "add-digit", payload: string }
  | { type: "choose-operator", payload: string }
  | { type: "clear" }
  | { type: "delete-digit" }
  | { type: "evaluate" };

function evaluate(val1: string, operator: string, val2: string): string {
  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);

  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "X":
      return (num1 * num2).toString();
    case "/":
      return num2 !== 0 ? (num1 / num2).toString() : "Err";
    default:
      return "Error: Invalid operator";
  }
}

function reducer(state: ICalculatorState, action: CalculatorAction): ICalculatorState{
  if(state.val1 == "Err"){
    if(action.type === "clear"){
      return initialState;
    }
    else{
      return state;
    }
  }
  switch(action.type){
    case 'add-digit':
      if(action.payload === "0" && (state.val1 === "0" || state.val2 === "0")){
        return state;
      }
      return {
        ...state,
        val1: state.operator? state.val1: state.val1 + action.payload,
        val2: state.operator? state.val2 + action.payload : state.val2
      }
    case "choose-operator":
      if(state.operator !== ""&& state.val1 !== "" && state.val2 !== ""){
        return{
          history: `${evaluate(state.val1, state.operator, state.val2)}`,
          val1: `${evaluate(state.val1, state.operator, state.val2)}`,
          val2: "",
          operator: action.payload,
        }
      }
      return {
        ...state,
        operator: action.payload
      };
    case "evaluate":
      const result = evaluate(state.val1, state.operator, state.val2);
      return {
        history: result === "Err" ? "" : result,
        val1: result === "Err" ? "Err" : result,
        val2: "",
        operator: "",
      };
    case "clear":
      return initialState;
    case "delete-digit":
      if (state.val2 !== "") {
        return { ...state, val2: state.val2.slice(0, -1) };
      } else if (state.operator !== "") {
        return { ...state, operator: "" };
      } else if (state.val1 !== "") {
        return { ...state, val1: state.val1.slice(0, -1) };
      }
      return { ...state };
    default:
      return state;
    }
}
const initialState: ICalculatorState = {
  history: "",
  val1: "",
  val2: "",
  operator: ""
}
function App(){
  const [{history, val1, val2, operator}, dispatch] = useReducer(reducer, initialState);
  return(
    <div className="calculator-layout">
      <div className="output-layer">
        <div className="history">
          {history}
        </div>
        <div className="current">
            {val1} {operator} {val2} 
        </div>
      </div>
      <div className="input-layer">
        <button onClick={() => dispatch({type: 'clear'})}>C</button>
        <button onClick={() => dispatch({type:"delete-digit"})}>DEL</button>
        <button className="support-button"><Link to="/Support Page">?</Link></button>
        <OperatorButton dispatch={dispatch} operator="/" />
        <DigitButton dispatch={dispatch} digit="1"></DigitButton>
        <DigitButton dispatch={dispatch} digit="2"></DigitButton>
        <DigitButton dispatch={dispatch} digit="3"></DigitButton>
        <OperatorButton dispatch={dispatch} operator="X" />
        <DigitButton dispatch={dispatch} digit="4"></DigitButton>
        <DigitButton dispatch={dispatch} digit="5"></DigitButton>
        <DigitButton dispatch={dispatch} digit="6"></DigitButton>
        <OperatorButton dispatch={dispatch} operator="-" />
        <DigitButton dispatch={dispatch} digit="7"></DigitButton>
        <DigitButton dispatch={dispatch} digit="8"></DigitButton>
        <DigitButton dispatch={dispatch} digit="9"></DigitButton>
        <OperatorButton dispatch={dispatch} operator="+" />
        <DigitButton dispatch={dispatch} digit="0"></DigitButton>
        {/* TIdak menggunakan component OperatorButton karena memiliki hanya memiliki tipe action yang berbeda "evaluate" */}
        <button className="span-2 operator" onClick={() => dispatch({type: "evaluate"})}>=</button>
      </div>
    </div>
  )
}
export default App