import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import './App.scss';
import 'bulma-helpers/css/bulma-helpers.min.css'
import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import {setCurrentUser} from "./redux/user/user.action";
import Home from "./components/home/home.component";

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
                <Route path="/signup" component={SignUp}/>
                <Route path="/home" component={Home}/>
            </Switch>
        );
    }

}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
