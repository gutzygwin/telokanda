import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInAndUp from './components/auth/SignInAndUp';
import './index.css';
import './App.css';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/about/About';
import Advert from './components/advert/Advert';
import Contact from './components/contact/Contact';
import Task from './components/task/Task';
import TaskDetails from './components/task/TaskDetails';
import AdvertDetails from './components/advert/AdvertDetails';
import CreateTask from './components/task/CreateTask';
import CreateAdvert from './components/advert/CreateAdvert';
import Wallet from './components/wallet/Wallet';

class App extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={SignInAndUp} />
                    <Route exact path="/register" component={SignInAndUp} />
                    <React.Fragment>
                            <Navbar />
                            <div className={"content_wrapper"}>
                                <Route exact path='/' component={Dashboard} />
                                <Route path='/about' component={About} />
                                <Route exact path='/advert' component={Advert} />
                                <Route path='/advert/:id' component={AdvertDetails} />
                                <Route path='/contact' component={Contact} />
                                <Route exact path='/task' component={Task} />
                                <Route path='/task/:id' component={TaskDetails} />
                                <Route path='/create-task' component={CreateTask} />
                                <Route path='/create-advert' component={CreateAdvert} />
                                <Route path='/wallet' component={Wallet} />
                            </div>
                    </React.Fragment>
                </Switch>
            </Router>
        )
    }
}

export default App