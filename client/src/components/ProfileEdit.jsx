import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams,Link,useNavigate, Form, Navigate} from "react-router-dom";

const ProfileEdit = (props) => {
    const navigate = useNavigate()
    const [person, setPerson] = useState({})
    const {id} = useParams(); 
    const [update,setUpdate]=useState(true)
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [imgUrl, setImg] = useState("");
    const [role, setRole] = useState("");
    const [betaPlanBelt, setbetaPlanBelt] = useState(false);
    const [cDegree, setcDegree] = useState(false);
    const [validation,setValidation]=useState({})
    useEffect(() => {
        axios.get("http://localhost:8000/api/profiles/" + id)
            .then( res => {
                console.log(res.data);
                setEmail(res.data.email);
                setImg(res.data.imgUrl)
                setName(res.data.name)
                setRole(res.data.role)
                setbetaPlanBelt(res.data.betaPlanBelt)
                setcDegree(res.data.cDegree)
            })
            .catch( err => console.log(err) );
    }, [update]);
    // const onCheckBelt = (e)=>{
    //   console.log(e.target.value)
    //     axios.patch('http://localhost:8000/api/profiles/' + id, {
    //         betaPlanBelt: e.target.checked,   
    //     }).then(person => setUpdate(!update))
    // }
    // const onCheck = (e)=>{
    //   console.log("onCheck")
    //     axios.patch('http://localhost:8000/api/profiles/' + id, {
    //         cDegree: e.target.checked,   
    //     }).then(person => setUpdate(!update))
    // }
    const submitForm = (e)=>{
        console.log("onCheck")
          axios.patch('http://localhost:8000/api/edit/' + id, {
            name,    
            email,
            imgUrl,
            role,
            betaPlanBelt,
            cDegree  
          }).then(profile=>navigate("/Profile"))
          .catch(err=>{ setValidation(err.response.data.errors ) })
      }

    return (
        <div>
           
           <p>
                <label>Name</label><br/>
                { validation.name? validation.name.message : ""}
                {/* When the user types in this input, our onChange synthetic event 
                    runs this arrow function, setting that event's target's (input) 
                    value (what's typed into the input) to our updated state   */}
                <input type="text" value={name}  onChange = {(e)=>setName( e.target.value )}/>
            </p>
            <p>
            { validation.email? validation.email.message : ""}
                <label>Email</label><br/>
                <input type="text" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>
            { validation.imgUrl? validation.imgUrl.message : ""}
                <label>Image Url</label><br/>
                <input type="text" value={imgUrl}  onChange = {(e)=>setImg(e.target.value)}/>
            </p>
            <p>
            { validation.role? validation.role.message : ""}
                <label>Role</label><br/>

                <select value={role} onChange = {(e)=>setRole(e.target.value)}>
                    <option value={"Teacher"}>Teacher</option>
                    <option value={"Student"}>Student</option>
                    <option value={"Intern"}>Intern</option>
                </select>

            </p>

            
            <p>
                <label>BetaPlan Belt</label><br/>
                <input  type="checkbox" checked={betaPlanBelt} value={betaPlanBelt} onChange = { (e)=>setbetaPlanBelt(e.target.value)}/>
            </p>
            <p>
                <label>College Degree</label><br/>
                <input type="checkbox"  checked={cDegree} value={cDegree} onChange = {(e)=>setcDegree(e.target.value)}/>
            </p>
           <button onClick={submitForm}>Edit</button>
        </div>
        
    );
}
export default ProfileEdit;

