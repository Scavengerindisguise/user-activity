import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Modal from './modal';


class Main extends Component {
    state = {
        users: [],
        isModalOpen: false,
        currentUser: {},
        todayDate: new Date(),
    }

    componentDidMount() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(response => {
                const users = response;
                console.log(users)
                this.setState({ users });
            });
    }

    onSelectUser = (user) => {
        console.log(user);

        this.setState({
            isModalOpen: !this.state.isModalOpen,
            currentUser: user
        });
    }

    onChangeDate = (date) => {
        console.log(date);
        this.setState({
            todayDate: date
        })
    };


    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href='/'>User Activity</a>
                </nav>
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-md-3'>
                            <div className="card">
                                <div className="card-header">
                                    Users
                            </div>
                                <ul className="list-group list-group-flush">
                                    {this.state.users.map(user => {
                                        return <li onClick={() => this.onSelectUser(user)} key={user.id} className="list-group-item">{user.real_name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal onChange={this.onChangeDate} todayDate={this.state.todayDate} isModalOpen={this.state.isModalOpen} currentUser={this.state.currentUser} toggle={this.onSelectUser} />
                {/* <ModalComponent todayDate={this.state.todayDate} isModalOpen = {this.state.isModalOpen} currentUser={this.state.currentUser} toggle={this.toggleModal} /> */}
            </React.Fragment>
        );
    }
}

export default Main;