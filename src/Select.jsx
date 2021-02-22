import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Notes from './Notes'
import Todo from './Todo'
import Schedule from './Schedule'
import App from './App'
import './Select.css'

class Select extends Component {
    constructor(props){
        super(props)
        this.state = {
            notes:null,
            todo:null,
            signout:null,
            appoint:null
        }
        this.onNotesClick = this.onNotesClick.bind(this)
        this.onTodoClick = this.onTodoClick.bind(this)
        this.onAppointClick = this.onAppointClick.bind(this)
        this.onSignoutClick = this.onSignoutClick.bind(this)
    }
    onSignoutClick(e) {
        e.preventDefault();
        console.log('Notes link was clicked.');
        ReactDOM.render(
            <App />,
            document.getElementById('root')
          );
    }
    onNotesClick(e) {
        e.preventDefault();
        console.log('Notes link was clicked.');
        ReactDOM.render(
            <Notes />,
            document.getElementById('root')
          );
    }
    onTodoClick(e) {
        e.preventDefault();
        console.log('Todo link was clicked.');
        ReactDOM.render(
            <Todo />,
            document.getElementById('root')
          );
    }
    onAppointClick(e) {
        e.preventDefault();
        console.log('Appoint link was clicked.');
        ReactDOM.render(
            <Schedule />,
            document.getElementById('root')
          );
    }
    render() {
        return (
            <div className='maindiv'>
                <ul className='ul'>
                    <li className='li'><button className='selectbtn'>Home</button></li>
                    <li className='li'><button className='notesbtn' onClick={this.onNotesClick} value={this.state.notes}>Notes</button></li>
                    <li className='li'><button className='todobtn' onClick={this.onTodoClick} value={this.state.todo}>To Do List</button></li>
                    <li className='li'><button className='appointbtn' onClick={this.onAppointClick} value={this.state.appoint}>Scheduler</button></li>
                    <li className='li'><button className='signoutbtn' onClick={this.onSignoutClick} value={this.state.signout}>Sign Out</button></li>
                </ul>
            </div>
        )
    }
}

export default Select;