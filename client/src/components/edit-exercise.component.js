import React, { Component } from "react"
import axios from "axios"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

//local 
//var URL = "http://127.0.0.1:1414"
var URL = process.env.REACT_APP_API
//minikube
//var URL = "http://192.168.39.9:30014"

class EditExercise extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            description:'',
            duration: 0,
            date: new Date(),
            users: [],
        }
    }
    //Is called right before anything load on the page (testing users hard coding:)
    componentDidMount() {
        axios.get(`${URL}/exercises/`+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function(error) {
                console.log(error)
            })

        axios.get(`${URL}/users/`)
            .then(response => {
                //check if the returned response is not empty
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        //Prevent the html default submit behaviour 
        e.preventDefault()

        //and do the following instead:
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        //Send exercise data to server
        axios.post(`${URL}/exercises/update/`+this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err))

        //Then return user to home page "/"
        window.location = "/"
    }

    render() {
        return (
            <div>
                <h3>Edit New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onchangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return (
                                        <option
                                        key={user}
                                        value={user}>{user} 
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate} 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise

