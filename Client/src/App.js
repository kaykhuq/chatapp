import React, { Component } from 'react';
import Chat from './Chat';
import io from 'socket.io-client';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', message: '', listUsers: [], logoutUsers: [], userLogout: '' };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.socket = io('localhost:8080');
    this.socket.on("server-send-list-user", function (data) {
      addUser(data);
    });
    const addUser = data => {
      this.setState({ listUsers: [...this.state.listUsers, data] });
    }

    this.socket.on("server-send-user-logout", function (data) {
      addLogoutUser(data);
      console.log(data + " disconnected");
      // this.handleLogoutUser = () => {
      //   this.setState((user) => { return { listUsers: user.listUsers.filter(name => name !== this.state.userLogout) } })
      // }
      // this.setState({ logoutUsers: this.state.userLogout });
    })
    window.onbeforeunload = () => {
      this.socket.emit("Logout");
    }


    const addLogoutUser = data => {
      this.setState({ logoutUsers: [...this.state.logoutUsers, data] });
    }

  }

  handleUserChange(e) {
    this.setState({ username: e.target.value });
  }
  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }
  render() {
    return (
      <div className="ChatApp">
        <div className="Chat">
          <Chat username={this.state.username} message={this.state.message} socket={this.socket}
            onUserChange={this.handleUserChange} onMessageChange={this.handleMessageChange} />
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Panel Heading</div>
          <div className="panel-body-left">
            {this.state.listUsers.map(user => {
              return (
                <div>{user} is online</div>
              );
            })}
          </div>
          <div className="panel-body-right">
            {this.state.logoutUsers.map(user => {
              return (
                <div>{user} is disconnected</div>
              );
            })}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
