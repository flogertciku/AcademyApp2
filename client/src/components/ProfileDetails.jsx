import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams,Link} from "react-router-dom";
const ProfileDetail = (props) => {
    const [person, setPerson] = useState({})
    const {id} = useParams(); 
    const [update,setUpdate]=useState(true)
    useEffect(() => {
        axios.get("http://localhost:8000/api/profiles/" + id)
            .then( res => {
                console.log(res.data);
                setPerson(res.data);
            })
            .catch( err => console.log(err) );
    }, [update]);
    const onCheckBelt = (e)=>{
      console.log(e.target.value)
        axios.patch('http://localhost:8000/api/profiles/' + id, {
            betaPlanBelt: e.target.checked,   
        }).then(person => setUpdate(!update))
    }
    const onCheck = (e)=>{
      console.log("onCheck")
        axios.patch('http://localhost:8000/api/profiles/' + id, {
            cDegree: e.target.checked,   
        }).then(person => setUpdate(!update))
    }

    return (
        <div>
            <p>First Name: {person.name}</p>
            <p>Img: <img src={person.imgUrl} alt="" /> </p>
            <p>
                <label>BetaPlan Belt</label><br/>
                <input type="checkbox" checked={person.betaPlanBelt} value={person.betaPlanBelt} onChange = { e => onCheckBelt(e)}/>
            </p>
            <p>
                <label>College Degree</label><br/>
                <input type="checkbox"  checked={person.cDegree} onChange = {e => onCheck(e)}/>
            </p>
            <Link to={`/edit/${person._id}`}>Edit Profile  </Link>
        </div>
    );
}
export default ProfileDetail;

