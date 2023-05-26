import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
const PersonList = (props) => {

    const [people, setPeople] = useState([]);
    
    useEffect(()=>{
    	axios.get("http://localhost:8000/api/profiles")
    	.then((res)=>{
	    console.log(res.data);
            setPeople(res.data);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])
    
    return (
        <div>
            {
                people.map((person, index)=>{
                return <p key={index}><Link to={`/profile/${person._id}`} >Edit: {person.name}</Link>  , {person.email} { person.role === "Teacher"?  "ky eshte mjeshtri": ""} <img width='70px' height='70px' src={person.imgUrl}></img>  </p>
                })
            }
        </div>
    )
}
export default PersonList;

