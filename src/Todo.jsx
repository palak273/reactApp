import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import axios from 'axios'
import Select from './Select'
import Notes from './Notes'
import Schedule from './Schedule'
import App from './App'
import './Todo.css'

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription("e2df21cecdfa493796fde11201ca47bf", "eastus");
let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
var TextareaAutosize = require('react-textarea-autosize').default;
class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            start : true,
            stop : false,
            clear: false,
            submit: true,
            notes:null,
            select:null,
            appoint:null,
            signout:null,
            record: '',
            todo: []
        }
        this.onStartClick = this.onStartClick.bind(this)
        this.onStopClick = this.onStopClick.bind(this)
        this.onClearClick = this.onClearClick.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
        this.onSelectClick = this.onSelectClick.bind(this)
        this.onNotesClick = this.onNotesClick.bind(this)
        this.onAppointClick = this.onAppointClick.bind(this)
        this.onSignoutClick = this.onSignoutClick.bind(this)
        this.onRefreshClick= this.onRefreshClick.bind(this)
        this.onTodoClick= this.onTodoClick.bind(this)
        this.changeInput= this.changeInput.bind(this)
    }
    changeInput(event){
        this.setState({
            record:event.target.value
        })
    }
    onTodoClick(props){
        console.log(props)
        const data = {
            id : props
        }
        /* axios.post(`https://sleepy-bastion-25142.herokuapp.com/removetodo`,data)
        .then(response => {
            console.log(response.data)
        })
        .then(axios.get(`https://sleepy-bastion-25142.herokuapp.com/alltodos`)
        .then(response => {
            //console.log(response.data)
            this.setState({
                todo : response.data
            })
            console.log(this.state.todo)
        })) */
        console.log("The user wants to remove to do")
    }

    onRefreshClick(event){
        event.preventDefault()
        /* axios.get(`https://sleepy-bastion-25142.herokuapp.com/alltodos`)
        .then(response => {
            //console.log(response.data)
            this.setState({
                todo : response.data
            })
            console.log(this.state.todo)
        }) */
        console.log("The user wants to see all to dos")
    }
    onSubmitClick(event){
        event.preventDefault()
        //console.log("The user would like to save the note")
        const todo = {
            val : this.state.record,
        }
        /* axios.post(`https://sleepy-bastion-25142.herokuapp.com/addtodo`,todo)
        .then(response => {
            console.log("Added")
            this.onClearClick(event)
            this.onRefreshClick(event)
        }) */
        console.log("The user wants to add a to do")
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
    onAppointClick(e) {
        e.preventDefault();
        console.log('Appoint link was clicked.');
        ReactDOM.render(
            <Schedule />,
            document.getElementById('root')
          );
    }
    onClearClick(event){
        this.setState({
            record:''
        })
    }
    onStopClick(event){
        recognizer.stopContinuousRecognitionAsync(
            function(result) {
                console.log("stopContinuousRecognitionAsync");
              },
              function (error) {
                  console.log("stopContinuousRecognitionAsync error = " + error);
                  
                  //recognizer.close();
                  //recognizer = undefined;
                }
            );
    }
    onStartClick(event){
        event.preventDefault();
        console.log('Speak into your microphone.');
        var s = "";
        recognizer.sessionStarted = (sender, eventInfo) => {
            console.log(eventInfo);
        };

        recognizer.sessionStopped = (sender, eventInfo) => {
            console.log(eventInfo);
        };

        recognizer.canceled = (sender, eventInfo) => {
            console.log(eventInfo);
        };

        recognizer.speechStartDetected = (sender, eventInfo) => {
            console.log(eventInfo);
        };

        recognizer.speechEndDetected = (sender, eventInfo) => {
            console.log(eventInfo);
        };
        recognizer.recognized = (sender, eventInfo) => {
              if(eventInfo.result.text!==undefined) s = s+eventInfo.result.text;
              console.log("Speech recognized, reason code = " + eventInfo.result.text);
              this.setState({
                  record: s
              })
            
        };

        // Start recognizing speech
        recognizer.startContinuousRecognitionAsync(
            function(result) {
              console.log("startContinuousRecognitionAsync result = " + result);
            },
            function (error) {
                console.log("startContinuousRecognitionAsync error = " + error);

                recognizer.close();
                recognizer = undefined;
        });
    }
    render() {
        return(
            <div className='todos'>
                <div>
                <ul className='ul'>
                    <li className='li'><button className='selectbtn' onClick={this.onSelectClick} value={this.state.select}>Home</button></li>
                    <li className='li'><button className='notesbtn' onClick={this.onNotesClick} value={this.state.notes}>Notes</button></li>
                    <li className='li'><button className='todobtn'>To Do List</button></li>
                    <li className='li'><button className='appointbtn' onClick={this.onAppointClick} value={this.state.appoint}>Scheduler</button></li>
                    <li className='li'><button className='signoutbtn' onClick={this.onSignoutClick} value={this.state.signout}>Sign Out</button></li>
                </ul>
                </div>
                <h1 className='heading'>To Do List</h1>
                <div className='newtodo'>
                <TextareaAutosize
                        className='todo'
                        name="form-field-name"
                        value={this.state.record}
                        onChange={this.changeInput}
                    />
                    <button className='btn' onClick={this.onStartClick} value={this.state.start}>Record Todo</button>
                    <button className='btn' onClick={this.onStopClick} value={this.state.stop}>Stop Recording</button>
                    <button className='btn' onClick={this.onClearClick} value={this.state.clear}>Clear</button>
                    <button className='btn' onClick={this.onSubmitClick} value={this.state.submit}>Save</button>
                </div>
                <div className='todolist'>
                <h2>To delete a To Do:<br />
                        1)Click Delete right beside that note<br />
                        2)Click Refresh<br />
                    </h2>
                    <div>
                        <button className='btn' onClick={this.onRefreshClick} value={this.state.refresh}>Refresh</button>
                        <br />
                        
                        {this.state.todo.map((item, i) => (
                            <table className='table'>
                                <tr>
                                    <td className='del'>
                                        {item.todo}
                                    </td>
                                    <td className='del' key={i} onClick={() => this.onTodoClick(item._id)}>
                                        Delete
                                    </td>
                                </tr>   
                            </table>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo