import React, { Component } from 'react';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';
import Login from './components/Login/Login';
import AdminPage from './containers/AdminPage';
import './App.css';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';

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
        this.setState({user: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <Auth/>
            </div>
        );
    }

}
export default App;