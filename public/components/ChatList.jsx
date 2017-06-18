'use strict';

import React from "react";
import Chat from "./Chat.jsx";

const mqtt = require('mqtt'),
    axios = require('axios');

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        const username = this.props.username;

        const client = mqtt.connect('ws://mqtt-chat.tk:8883', {
            clientId: username
        });

        this.state = {client: client, chattingWith: '', openChat: false};

        client.on('connect', function (connack) {
            console.log('Client Connected');
            if (client.connected)
                client.subscribe(username);
        });

        this.chattingWithChangeHandler = this.chattingWithChangeHandler.bind(this);
        this.onChattingWithSubmit = this.onChattingWithSubmit.bind(this);
    }

    chattingWithChangeHandler(event) {
        this.setState({client: this.state.client, chattingWith: event.target.value, openChat: false});
    }

    onChattingWithSubmit(event) {
        event.preventDefault();
        const chattingWith = this.state.chattingWith;
        if (chattingWith === this.props.username)
            return alert('You can\'t chat with yourself!');
        axios.post('/user/chat', {username: this.props.username, chatWithUsername: chattingWith}).then((result) => {
            if (result.data.success !== true)
                return alert(result.data.error);
            this.setState({client: this.state.client, chattingWith: chattingWith, openChat: true});
        });
    }

    render() {
        if (this.state.openChat === false)
            return (
                <div style={{textAlign: 'center', paddingTop: '2%'}}>
                    <h3 className="title">Welcome {this.props.username}, enter a username to chat with...</h3>
                    <form onSubmit={this.onChattingWithSubmit}>
                        <div className='field has-addons has-addons-centered'>
                            <p className='control'>
                                <input className='input' type='text' placeholder='username'
                                       onChange={this.chattingWithChangeHandler} required/>
                            </p>
                        </div>
                        <input type='submit' className='button' value='Submit'/>
                    </form>
                </div>
            );
        else
            return (
                <Chat client={this.state.client} chattingWith={this.state.chattingWith} username={this.props.username}/>
            );
    }
}