import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    state = {

    }

    componentDidMount = () => {
        document.title = "Easy Bill";
        document.body.style.backgroundColor = '#F0F0F0'
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => (
                    <Redirect to="/login" />
                )} />
                <Route path="/login" exact component={Auth} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route render={
                    () => {
                        const returnItem = window.sessionStorage.getItem("token") ? <Redirect to="/dashboard" /> :  <Redirect to="/login" />;
                        return returnItem;
                    }
                } />
            </Switch>
        );
    }
}
export default App;