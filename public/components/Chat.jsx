'use strict';

import React from "react";

import Message from "./Message.jsx";
import ChatInput from "./ChatInput.jsx";
import "../stylesheets/chat.css";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {messages: []};

        const chattingWith = this.props.chattingWith;
        const self = this;

        this.props.client.on('message', function (topic, message) {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.from === chattingWith) {
                const formattedMessage = Object.assign({fromMe: false}, parsedMessage);
                self.addMessage(formattedMessage);
            }
        });

        this.sendHandler = this.sendHandler.bind(this);
    }

    componentDidUpdate() {
        // There is a new message in the state, scroll to bottom of list
        const objDiv = document.getElementById('messageList');
        objDiv.scrollIntoView(false);
    }

    sendHandler(message) {
        const messageObject = {
            from: this.props.username,
            message
        };

        this.props.client.publish(this.props.chattingWith, JSON.stringify(messageObject));

        messageObject.fromMe = true;
        this.addMessage(messageObject);
    }

    addMessage(message) {
        const messages = this.state.messages.concat(message);
        this.setState({messages});
    }

    render() {
        const messages = this.state.messages.map((message, i) => {
            return (
                <Message
                    key={i}
                    username={message.from}
                    message={message.message}
                    fromMe={message.fromMe}/>
            );
        });

        return (
            <div style={{textAlign: 'center', paddingTop: '2%'}}>
                <h3 className='title'>You are chatting with {this.props.chattingWith}</h3>
                <div id='messageList'>
                    { messages }
                </div>
                <ChatInput onSend={this.sendHandler}/>
            </div>
        );
    }
}