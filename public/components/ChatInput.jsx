'use strict';

import React from "react";

export default class ChatInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chatInput: ''};

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(event) {
        this.setState({chatInput: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({chatInput: ''});
        this.props.onSend(this.state.chatInput);
    }

    render() {
        return (
            <div className="messageInputBackground">
                <form style={{position: 'fixed', bottom: '5px', width: '100%'}} onSubmit={this.onSubmit}>
                    <div className='field has-addons has-addons-centered'>
                        <p className='control' style={{width: '80%'}}>
                            <input className='input' type='text' value={this.state.chatInput}
                                   placeholder='Type a message...'
                                   onChange={this.onTextChange} required/>
                        </p>
                        <p className="control">
                            <input type='submit' className='button' value='Send'/>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}