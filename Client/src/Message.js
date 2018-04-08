import React, { Component } from 'react';
import io from 'socket.io-client';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        //this.socket = io('localhost:8080');
        this.props.socket.on("RECEIVE_MESSAGE", function (data) {
            addMessage(data)
        });
        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
        }
    }
    render() {
        return (
            <div className="messages">
                {this.state.messages.map((message) => {
                    return (
                        <div >{message.author}:{message.message}</div>
                    )
                })
                }
            </div>
        );
    }
}

export default Message;
