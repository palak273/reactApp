import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import App from './App'
import axios from 'axios'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            signup:null,
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSignUpClick = this.onSignUpClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }
    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    onSignUpClick(event) {
        event.preventDefault()
        const registered = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        /* axios.post('https://sleepy-bastion-25142.herokuapp.com/signup',registered)
        .then(response => console.log(response.data)) */
        console.log("The user wants to signup")

        this.setState({
            username:'',
            email:'',
            password:''
        })
    }
    
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );
    }
    render() {
        return (
            <div className="login-page">
                <div className="form">
                <form className="register-form">
                    <input className='input' type="text" placeholder="Username" onChange = {this.changeUsername}
                            value = {this.state.username}/>
                    <input className='input' type="text" placeholder="Email address" onChange = {this.changeEmail}
                            value = {this.state.email}/>
                    <input className='input' type="password" placeholder="Password" onChange = {this.changePassword}
                            value = {this.state.password}/>
                    <button onClick={this.onSignUpClick} value={this.state.signup} className='signupbtn'>Sign Up</button>
                    <p className="message">Already registered? 
                    <a href="#" className='create' onClick={this.handleClick}>Sign In</a>
                    </p>
                </form>
                </div>
            </div>
        );
    }
}

export default Register