import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const ProfileForm = () => {
    const navigate = useNavigate()
    //keep track of what is being typed via useState hook
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [imgUrl, setImg] = useState("");
    const [role, setRole] = useState("");
    const [betaPlanBelt, setbetaPlanBelt] = useState(false);
    const [cDegree, setcDegree] = useState(false);
    const [validation,setValidation]=useState({})




    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/profiles', {
            name,    
            email,
            imgUrl,
            role,
            betaPlanBelt,
            cDegree    // this is shortcut syntax for lastName: lastName
        })
            .then(res=>{
                console.log(res); // always console log to get used to tracking your data!
                console.log(res.data);
navigate("/profile")
            })
            .catch(err=>setValidation(err.response.data.errors))
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Name</label><br/>
                { validation.name? validation.name.message : ""}
                {/* When the user types in this input, our onChange synthetic event 
                    runs this arrow function, setting that event's target's (input) 
                    value (what's typed into the input) to our updated state   */}
                <input type="text" onChange = {(e)=>setName(e.target.value)}/>
            </p>
            <p>
            { validation.email? validation.email.message : ""}
                <label>Email</label><br/>
                <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>
            { validation.imgUrl? validation.imgUrl.message : ""}
                <label>Image Url</label><br/>
                <input type="text" onChange = {(e)=>setImg(e.target.value)}/>
            </p>
            <p>
            { validation.role? validation.role.message : ""}
                <label>Role</label><br/>

                <select onChange = {(e)=>setRole(e.target.value)}>
                    <option value={"Teacher"}>Teacher</option>
                    <option value={"Student"}>Student</option>
                    <option value={"Intern"}>Intern</option>
                </select>

            </p>

            <p>
            { validation.betaPlanBelt? validation.betaPlanBelt.message : ""}
                <label>BetaPlan Belt</label><br/>
                <input type="checkbox" onChange = {(e)=>setbetaPlanBelt(!betaPlanBelt)}/>
            </p>
            <p>
            { validation.cDegree? validation.cDegree.message : ""}
                <label>College Degree</label><br/>
                <input type="checkbox" onChange = {(e)=>setcDegree(!cDegree)}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
export default ProfileForm;

