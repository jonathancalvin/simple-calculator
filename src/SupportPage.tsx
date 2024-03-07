import "./SupportPage.css";
import { useState } from "react";
import SupportForm from "./Components/SupportForm";
interface IUserData{
    firstName: string,
    lastName: string,
    email: string,
    topic: string,
    isValid: boolean,
}
const initialState:IUserData = {
    firstName:  "",
    lastName: "",
    email: "",
    topic: "",
    isValid: false
}
const SupportPage = () => {
    const [userData, setUserData] = useState(initialState);
    const [isSubmitted, setIsSubmitted] = useState("");
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return(
        <div className="form-container">
            <div className="header">
                Support Ticket Form
            </div>
            {/* conditional rendering */}
            {isSubmitted===""?
                <SupportForm 
                    userData={userData} 
                    setUserData={setUserData} 
                    setIsSubmitted = {setIsSubmitted}
                />
            :
            <div className="thank-container">
                <h1>Thank you for sending us your report, we will <br /> track the problem now</h1>
                <p>ticket number: <span>{randomNumber}</span></p>
            </div>
            }


        </div>
    );
};
export default SupportPage;