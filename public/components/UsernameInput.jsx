'use strict';

import React from "react";
import "../stylesheets/usernameInput.css";

const axios = require('axios');

export default class UsernameInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: ''};

        // bind the 'this' keyword to the event handlers
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.onUsernameSubmit = this.onUsernameSubmit.bind(this);
    }

    usernameChangeHandler(event) {
        this.setState({username: event.target.value});
    }

    onUsernameSubmit(event) {
        event.preventDefault();
        const username = this.state.username;
        axios.post('/user', {username: username}).then((result) => {
            if (result.data.success === false)
                return alert('This username is already active. Choose some other name.');
            this.props.usernameSubmitHandler(username);
        });
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#00d1b2', paddingTop: '2%', paddingBottom: '2%', textAlign: 'center'}}>
                    <h2 className='title is-2'>Chat MQTT</h2>
                    <h4 className='subtitle is-4'>Real Time Chat based on MQTT protocol</h4>
                </div>

                <h5 className="title is-5" style={{textAlign: 'center', marginTop: '5%'}}>Enter a username to get
                    started</h5>

                <form onSubmit={this.onUsernameSubmit} style={{textAlign: 'center'}}>
                    <div className='field has-addons has-addons-centered'>
                        <p className='control'>
                            <input className='input' type='text' placeholder='username'
                                   onChange={this.usernameChangeHandler} required/>
                        </p>
                    </div>
                    <input type='submit' className='button' value='Submit'/>
                </form>

                <h4 className="title is-4" style={{marginLeft: '5%', marginTop: '7%'}}>About</h4>

                <p style={{marginLeft: '5%', marginRight: '5%', marginTop: '-1%'}}>This is a one on one real time chat
                    app based on the MQTT protocol. It uses <a href="https://github.com/mcollina/aedes">Aedes</a> as the
                    MQTT broker and <a href="https://github.com/mqttjs/MQTT.js">MQTT.js</a> as the client library. Each
                    username is unique and is allowed to chat with only one other username at a time.</p>
            </div>
        );
    }
}