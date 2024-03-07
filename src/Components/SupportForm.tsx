import { useState } from "react";
interface IUserData{
    firstName: string,
    lastName: string,
    email: string,
    topic: string,
    isValid: boolean,
}
interface propsComponent {
    userData: IUserData;
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
    setIsSubmitted: React.Dispatch<React.SetStateAction<string>>;
}
// Component SupportForm digunakan untuk menampilkan body dari SupportPage jika user belum mengirim form. 
const SupportForm = ({userData, setUserData, setIsSubmitted}:propsComponent) => {
    const {firstName, lastName, email,topic, isValid} = userData;
    const [description, setDescription] = useState("");
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        //passing  isValid: isFormvalid({ ...prevData, [name]: value }) dilakukan agar data yg divalidasi adalah data terbaru
        setUserData((prevData) => ({...prevData, [name]: value, isValid: isFormvalid({ ...prevData, [name]: value })} ))
    }
    const isFormvalid = (newestData: IUserData): boolean => {
        const { firstName, lastName, email, topic } = newestData;
        return firstName !== "" && lastName !== "" && email !== "" && topic !== "";
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted("submitted");
    };
    return(
        <form onSubmit={handleSubmit}>
            <div className="left-section">
                <div className="name-section">
                    <label htmlFor="">Name <span>{(firstName&&lastName)!==""?"":"*"}</span> </label>
                    <div>
                        <input 
                            type="text" 
                            name="firstName"
                            required
                            onChange={handleChange}
                            value={firstName}
                        />
                        <label htmlFor="">First</label>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            name="lastName" 
                            required
                            onChange={handleChange}
                            value={lastName}
                        />
                        <label htmlFor="">Last  </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Email <span>{email!==""?"":"*"}</span></label>
                    <input 
                        type="email" 
                        name="email" 
                        required
                        onChange={handleChange}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="">Topic <span>{topic!==""?"":"*"}</span></label>
                    <div>
                        <label htmlFor="">What can we help you today?</label>
                        <div className="radio-container">
                            <input 
                                type="radio"
                                name="topic"
                                required
                                value="General"
                                onChange={handleChange}
                            />General
                            <input 
                                type="radio"
                                name="topic"
                                required
                                value="Bug"
                                onChange={handleChange}
                            />Bug
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-section">
                <label htmlFor="">Description<span>optional</span> </label>
                <textarea 
                    name="description" 
                    placeholder="Description Report" 
                    value={description}
                    onChange={e =>setDescription(e.target.value)}
                >
                    TESTING
                </textarea>
                <div className="SEND-container">
                    <button type="submit" disabled={!isValid}>SEND</button>
                </div>
            </div>
        </form>               
    );
};
export default SupportForm;