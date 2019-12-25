import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.util";

import appLogo from '../../assets/images/todo-icon.png'

import './signin.styles.scss';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.error("Error while signing user")
        }
    };

    return (
        <div className="columns is-vcentered">
            <div className="login column is-4 ">
                <section className="section">
                    <div className="has-text-centered">
                        <img className="login-logo" alt='app-logo' src={appLogo}/>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-right">
                            <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <span className="icon is-small is-right">
                            <i className="fa fa-user"></i>
                         </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-right">
                            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <span className="icon is-small is-right">
                                <i className="fa fa-key"></i>
                             </span>
                        </div>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-primary" onClick={handleSubmit}>Sign in</button>
                    </div>
                    <div className="has-text-centered">
                        <Link to="/signup">Don't you have an account? Sign up now!</Link>
                    </div>
                </section>
            </div>
                <div id="particles-js" className="interactive-bg column is-8">
                </div>
        </div>
    )
};


export default SignIn;
