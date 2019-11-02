import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import './App.css';
import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import {setCurrentUser} from "./redux/user/user.action";

class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({id:snapshot.id, ...snapshot.data()})
                })
            } else {
                setCurrentUser(userAuth)
            }
        })
        console.log("App props", this.props)
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => this.props.currentUser ? (<Redirect to={'/home'}/>) :(<Redirect to={'/signin'}/>)}/>
                    <Route path="/signin" render={() => this.props.currentUser ? (<Redirect to={'/home'}/>) : (<SignIn/>)}/>
                    <Route path="/signup" component={SignUp}/>
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
