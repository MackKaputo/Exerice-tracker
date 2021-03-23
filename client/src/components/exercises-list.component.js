import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

//local 
//var URL = "http://127.0.0.1"
//minikube
var URL = "http://192.168.39.9"

const Exercise = props => {
    return(
    <tr>
        <td>{ props.exercise.username }</td>
        <td>{ props.exercise.description }</td>
        <td>{ props.exercise.duration }</td>
        <td>{ props.exercise.date.substring(0,10) }</td>
        <td>
            <button className="btn btn-outline-info btn-sm" ><Link to={"/edit/"+props.exercise._id}>edit</Link></button> | 
            <button className="btn btn-outline-danger btn-sm" onClick={ () => {props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>)
}

class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)
        
        this.state = {
            exercises: [],
        }
    }

    componentDidMount() {
        axios.get(`${URL}:1414/exercises/`)
            .then(response => {
                this.setState({
                    exercises: response.data
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteExercise(id) {
        axios.delete(`${URL}:1414/exercises/`+id)
            .then(res => console.log(res.data))
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>description</th>
                            <th>Duration</th>
                            <th>date</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1>Hallo title</h1>
                            </div>
                            <div className="modal-body">
                            <button className="btn btn-outline-info btn-sm" > button </button>
                            </div>
                            <div className="modal-footer">
                                <input className="btn btn-primary" data-dismiss="modal" value="Close"></input>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="#" data-toggle="modal" data-target="#myModal">Open this</a>
            </div>
        )
    }
}

export default ExercisesList