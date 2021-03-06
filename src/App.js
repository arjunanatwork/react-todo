import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import {createStructuredSelector} from "reselect";

import { selectCurrentUser } from "./redux/user/user.selector";

import SignIn from "./pages/signin/signin.component";
import SignUp from "./pages/signup/signup.component";
import {setCurrentUser} from "./redux/user/user.action";
import Home from "./pages/home/home.component";

import './App.scss';
import 'bulma-helpers/css/bulma-helpers.min.css'

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({id:snapshot.id, ...snapshot.data()})
                })
            } else {
                setCurrentUser(userAuth)
            }
        });
        console.log("App props", this.props)
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => this.props.currentUser ? (<Redirect to={'/home'} />) :(<SignIn/>)} />
                <Route path="/signin" render={() => this.props.currentUser ? (<Redirect to={'/home'}/>) : (<SignIn/>)} />
                <Route path="/signup" render={() => this.props.currentUser ? (<Redirect to={'/home'}/>) : (<SignUp/>)}/>
                <Route path="/home" render={() => this.props.currentUser ? (<Home />) : (<SignIn/>)}/>
            </Switch>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
