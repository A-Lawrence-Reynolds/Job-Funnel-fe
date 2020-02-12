import React, {useState, useEffect} from 'react';
import JobDetails from './JobDetails';
import axiosWithAuth from "../../../utils/axiosWithAuth"

import { Link } from "react-router-dom";
import { connect } from "react-redux"

function JobCard(props) {
    console.log('job id?', props)

    const user_id = props.currentUser.id
    const job_id = props.id;
    
    const [saved, setSaved] = useState({
        user_id: user_id,
        job_id: job_id,
        status: "saved"
    })

    
    
    const handleSave = () => {
        console.log('saved ', saved)
        axiosWithAuth().post('/saved/', saved)
        .then(response => {
            console.log('handle save job response', response.data)
            setSaved({...saved})
            console.log('saved', saved)
            
        })
        .catch(error => {
            console.error(error)
        })

    }

    return (
        <div className="jobCard">
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 15px', }}> 
                <h4>Your Skills match 6/7</h4>
            </div>
            <div className="card-image">
                <img className="image" src="http://pngimg.com/uploads/microsoft/microsoft_PNG18.png"/>
            </div>
            <div className="card-text">
                <h3>{props.title}</h3>
                <p>{props.company}</p>
                <span>📍 {props.location}</span>
            </div>
            <div className='jobButtons' >
                <button onClick={handleSave}>Save</button>
                <Link to={`/Dashboard/Job/${props.id}`}>
                    <button>View</button>
                </Link>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentUser: state.AppReducer.currentUser,
    }
  }
  
  export default connect(mapStateToProps, {})(JobCard)


