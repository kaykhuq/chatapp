import React from 'react';
import io from 'socket.io-client';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
        super(props);
       // this.socket = io('localhost:8080');
        this.sendMessage = (ev) => {
            this.props.socket.emit("SEND_MESSAGE", {
                author: this.props.username,
                message: this.props.message
            })
        }
    }
    render() {
        const username = this.props.username;
        const message = this.props.message;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    global chat
                                </div>
                                <hr />
                                <Message author={username} message={message} socket={this.props.socket}/>
                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" onChange={this.props.onUserChange} name="username" className='form-control' />
                                <br />
                                <input type="text" value={this.props.message} placeholder="Message" onChange={this.props.onMessageChange} name="message" className='form-control' />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
