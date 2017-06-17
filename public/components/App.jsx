/**
 * Created by jyot on 6/5/17.
 */
'use strict';

import React from 'react';
import UsernameInput from './UsernameInput.jsx';
import ChatList from './ChatList.jsx';
import '../stylesheets/app.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {usernameSubmitted: false, username: ''};
        this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    }

    usernameSubmitHandler(username) {
        this.setState({usernameSubmitted: true, username: username});
    }

    render() {
        if (this.state.usernameSubmitted)
            return (
                <ChatList username={this.state.username}/>
            );
        else return (
            <UsernameInput usernameSubmitHandler={username => this.usernameSubmitHandler(username)}/>
        );
    }
}