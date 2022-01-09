import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import {loadWeb3, loadAccount, checkCompanyExists} from "../services/web3";

class Landing extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wallet: ''};
    }

    async loginHandler (event) {
        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});
        const result = await checkCompanyExists();
        if(result) {
            window.location.href='/dashboard/';
        }
        else {
            window.alert('Please register your company first or connnect with other wallet address.');
        }
    }
    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-clipboard auth-icon"/>
                                </div>
                                <h3 className="mb-4">Welcome to Invoice Management System</h3>
                                <Link to="/signup" className="btn btn-primary shadow-2 mb-4">Sign up</Link>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.loginHandler.bind(this)}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Landing;