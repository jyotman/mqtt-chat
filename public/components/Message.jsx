'use strict';

import React from "react";

export default class Chat extends React.Component {

    render() {
        const message = this.props.fromMe ? 'right' : 'left';
        const messageBody = this.props.fromMe ? 'messageRight' : 'messageLeft';

        return (
            <div className={message}>
                <div className="username">
                    { this.props.username }
                </div>
                <div className={messageBody}>
                    { this.props.message }
                </div>
            </div>
        );
    }
}