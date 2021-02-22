import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Register from './Register'
import Select from './Select'
import axios from 'axios'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            signin:null,
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSignInClick = this.onSignInClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    onSignInClick(event) {
        event.preventDefault()
        const registered = {
            username : this.state.username,
            password : this.state.password
        }
        axios.post(`https://sleepy-bastion-25142.herokuapp.com/signin`,registered)
        .then(response => {
            console.log(response)
            if(response.status===200){
                ReactDOM.render(
                    <Select />,
                    document.getElementById('root')
                  );
            }
            //axios.get("/me")
        })
        console.log("THe user wants to signin")
        this.setState({
            username:'',
            password:''
        })
    }
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        ReactDOM.render(
            <Register />,
            document.getElementById('root')
          );
    }
    render() {
        return (
            <div className="login-page">
                <div className="form">
                <form className="login-form">
                    <input className='input' type="text" placeholder="Username" onChange = {this.changeUsername}
                            value = {this.state.username}/>
                    <input className='input' type="password" placeholder="Password" onChange = {this.changePassword}
                            value = {this.state.password}/>
                    <button onClick={this.onSignInClick} value={this.state.signin} className='signinbtn'>Sign In</button>
                    <p className="message">Not registered? 
                    <a href="#" className='create' onClick={this.handleClick}>Sign Up</a>
                    </p>
                </form>
                </div>
            </div>
        );
    }
}

export default App;