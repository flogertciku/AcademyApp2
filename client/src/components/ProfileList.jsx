import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
const PersonList = (props) => {
    const navivgate= useNavigate()
    const [people, setPeople] = useState([]);
    useEffect(()=>{

        const userToken = localStorage.getItem('token');
        console.log(userToken)
        // axios.defaults.headers.common['userToken'] = `Bearer ${userToken}`;
    	axios.get("http://localhost:8000/api/profiles",{withCredentials: true})
    	.then((res)=>{
	    console.log(res.data);
            setPeople(res.data);
	})
    	.catch((err)=>{
            console.log(err.response.status)
            err.response.status === 401 ? navivgate("/auth") : console.log(err)
            
    	})
    }, [])
const logout=()=>{
        console.log("test")
        axios.post("http://localhost:8000/api/logout",{},{withCredentials: 'same-origin'})
        .then(e=>{
            navivgate("/auth")
        })
    }
    return (
        <div>
            <button onClick={logout}>logout</button>
            {
                people.map((person, index)=>{
                return <p key={index}><Link to={`/profile/${person._id}`} >Edit: {person.name}</Link>  , {person.email} { person.role === "Teacher"?  "ky eshte mjeshtri": ""} <img width='70px' height='70px' src={person.imgUrl}></img>  </p>
                })
            }
        </div>
    )
}
export default PersonList;

