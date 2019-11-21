import React, { Component } from 'react';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';
import Login from './components/Login/Login';
import AdminPage from './containers/AdminPage';
import './App.css';

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
                <NavigationItems/>
                {this.state.loginStatus ? <AdminPage /> : 
                    <Login loginSubmitHandler={this.loginSubmit}
                            userOnChange={this.userChangeHandler}/>}
            </div>
        );
    }

}
export default App;