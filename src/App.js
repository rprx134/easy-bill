import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    state= {

    }
    
    componentDidMount = () => {
        document.title = "Easy Bill";
        document.body.style.backgroundColor = '#F0F0F0'
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/login" exact component={Auth} />
                    <Route path="/dashboard" exact component={Dashboard}/>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;