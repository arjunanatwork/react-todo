import React from 'react';
import Header from "../header/header.component";
import SideBar from "../sidebar/sidebar.component";

import './home.styles.scss';

const Home = () => {

    return (
        <div className="root-child">
            <Header/>
            <div className="section">
                <div className="container">
                    <SideBar/>
                </div>
            </div>
        </div>
    )
}

export default Home;

