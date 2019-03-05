import React, {Component} from 'react';

class FormMessage extends Component {

    constructor(props){
        super(props);
        this.state = { username: '', content: '' };
    }

    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:4000/messages', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                this.props.socket.emit('new message', data);
                this.setState({ content: '' });
            })
    }

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={event => this.handleChange(event)}/>
                <textarea name="content" value={this.state.content} onChange={event => this.handleChange(event)}></textarea>
                <input type="submit"/>
            </form>
        );
    }
}

export default FormMessage;