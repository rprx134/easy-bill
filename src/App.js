import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {

    state = {
        loginStatus: false,
        user: null,
        password: null
    }

    componentDidMount = () => {
        document.title = "Easy Bill";
        document.bgColor = "#FBFBFD";
    }

    loginSubmit = () => {
        this.setState({ loginStatus: true });
    }

    userChangeHandler = (event) => {
        this.setState({ user: event.target.value });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/login" exact component={Auth} />
                    <Route path="/dashboard" exact component={Dashboard} />
                </div>
            </BrowserRouter>
        );
    }
}
export default App;