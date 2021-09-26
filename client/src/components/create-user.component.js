import React, { Component } from "react"
import axios from "axios"

//local 
//var URL = "http://127.0.0.1:1414"
var URL = process.env.REACT_APP_API
//minikube
//var URL = "http://192.168.39.9:30014"

class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
        }
    }

    onSubmit(e){
        //Prevent the html default submit behaviour 
        e.preventDefault()

        //and do the following instead:
        const user = {
            username: this.state.username,
        }

        console.log(user)

        //send user to the backend
        axios.post(`${URL}/users/add`, user)
            .then(res => {
                console.log(res.data)
                if(!res.error) {
                    alert("User successfully created")
                }
            })
            .catch((err) => console.log(err))

        //Then make the form blank to allow further registration
        this.setState({
            username: '',
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Create New user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser