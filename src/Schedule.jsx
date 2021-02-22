import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom'
import Todo from './Todo'
import Notes from './Notes'
import Select from './Select'
import App from './App'
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";

class Schedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes:null,
      select:null,
      todo:null,
      signout:null
    }
    this.onSelectClick = this.onSelectClick.bind(this)
    this.onNotesClick = this.onNotesClick.bind(this)
    this.onTodoClick = this.onTodoClick.bind(this)
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
    console.log('Select link was clicked.');
    ReactDOM.render(
        <Notes />,
        document.getElementById('root')
      );
}
onSelectClick(e) {
    e.preventDefault();
    console.log('Todo link was clicked.');
    ReactDOM.render(
        <Select />,
        document.getElementById('root')
      );
}
onTodoClick(e) {
    e.preventDefault();
    console.log('Appoint link was clicked.');
    ReactDOM.render(
        <Todo />,
        document.getElementById('root')
      );
}

  render() {
    return (
      <div className='schedule'>
        <div>
          <ul className='ul'>
              <li className='li'><button className='selectbtn' onClick={this.onSelectClick} value={this.state.select}>Home</button></li>
              <li className='li'><button className='notesbtn' onClick={this.onNotesClick} value={this.state.notes}>Notes</button></li>
              <li className='li'><button className='todobtn' onClick={this.onTodoClick} value={this.state.todo}>To Do List</button></li>
              <li className='li'><button className='appointbtn'>Scheduler</button></li>
              <li className='li'><button className='signoutbtn' onClick={this.onSignoutClick} value={this.state.signout}>Sign Out</button></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Schedule;