import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import axios from 'axios'
import Select from './Select'
import Todo from './Todo'
import Schedule from './Schedule'
import App from './App'
import './Notes.css'

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription("e2df21cecdfa493796fde11201ca47bf", "eastus");
let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
var TextareaAutosize = require('react-textarea-autosize').default;
class Assist extends Component {
    constructor(props){
        super(props)
        this.state = {
            start : true,
            stop : false,
            clear: false,
            submit: true,
            select:null,
            todo:null,
            appoint:null,
            signout:null,
            refresh:null,
            record: '',
            notes: []
        }
        this.onStartClick = this.onStartClick.bind(this)
        this.onStopClick = this.onStopClick.bind(this)
        this.onClearClick = this.onClearClick.bind(this)
        this.onSelectClick = this.onSelectClick.bind(this)
        this.onTodoClick = this.onTodoClick.bind(this)
        this.onAppointClick = this.onAppointClick.bind(this)
        this.onSignoutClick = this.onSignoutClick.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
        this.onRefreshClick= this.onRefreshClick.bind(this)
        this.onNoteClick= this.onNoteClick.bind(this)
        this.changeInput= this.changeInput.bind(this)
    }
    changeInput(event){
        this.setState({
            record:event.target.value
        })
    }
    onNoteClick(props){
        console.log(props)
        const data = {
            id : props
        }
        /* axios.post(`https://sleepy-bastion-25142.herokuapp.com/removenote`,data)
        .then(response => {
            console.log(response.data)
        }) */
        console.log("The user wants to remove notes")
    }
    onSignoutClick(e) {
        e.preventDefault();
        console.log('Notes link was clicked.');
        ReactDOM.render(
            <App />,
            document.getElementById('root')
          );
    }
    onSelectClick(e) {
        e.preventDefault();
        console.log('Select link was clicked.');
        ReactDOM.render(
            <Select />,
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
    onRefreshClick(event){
        event.preventDefault()
        /* axios.get(`https://sleepy-bastion-25142.herokuapp.com/allnotes`)
        .then(response => {
            //console.log(response.data)
            this.setState({
                notes : response.data
            })
            console.log(this.state.notes)
        }) */
        console.log("The user wants to see all notes")
    }
    onSubmitClick(event){
        event.preventDefault()
        //console.log("The user would like to save the note")
        const note = {
            val : this.state.record,
        }
        /* axios.post(`https://sleepy-bastion-25142.herokuapp.com/addnote`,note)
        .then(response => {
            console.log(response.data)
            this.onRefreshClick(event)
        }) */
        console.log("The user wants to add a note")
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
                  record: s,
                  input: s
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
            <div className='notes'>
                <div>
                <ul className='ul'>
                    <li className='li'><button className='selectbtn' onClick={this.onSelectClick} value={this.state.notes}>Home</button></li>
                    <li className='li'><button className='notesbtn'>Notes</button></li>
                    <li className='li'><button className='todobtn' onClick={this.onTodoClick} value={this.state.todo}>To Do List</button></li>
                    <li className='li'><button className='appointbtn' onClick={this.onAppointClick} value={this.state.appoint}>Scheduler</button></li>
                    <li className='li'><button className='signoutbtn' onClick={this.onSignoutClick} value={this.state.signout}>Sign Out</button></li>
                </ul>
                </div>
                <div className='newnote'>
                    <p className='heading'>Make a new note</p>
                    <p>To make a new note:<br />
                        1) Click Start Recording<br />
                        2) When you are done click Stop Recording<br />
                        3) Click Save<br />
                    </p>
                    <button className='recordbtn' onClick={this.onStartClick} value={this.state.start}>Record a Note</button>
                    <button className='stopbtn' onClick={this.onStopClick} value={this.state.stop}>Stop Recording</button>
                    <button className='clearbtn' onClick={this.onClearClick} value={this.state.clear}>Clear</button>
                    <button className='savebtn' onClick={this.onSubmitClick} value={this.state.submit}>Save</button>
                     <br/>
                    <TextareaAutosize
                        className='note'
                        name="form-field-name"
                        value={this.state.record}
                        onChange={this.changeInput}
                    />
                </div>
                <div className='allnotes'>
                    <p className='heading'>Notes</p>
                    <p>To delete a note:<br />
                        1)Click Delete right beside that note<br />
                        2)Click Refresh<br />
                    </p>
                    <div className='oldnote'>
                        <button className='savebtn' onClick={this.onRefreshClick} value={this.state.refresh}>Refresh</button>
                        <br />
                        
                        {this.state.notes.map((item, i) => (
                            <table className='table'>
                                <tr>
                                    <td className='del'>
                                        {item.note}
                                    </td>
                                    <td className='del' key={i} onClick={() => this.onNoteClick(item._id)}>
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

export default Assist