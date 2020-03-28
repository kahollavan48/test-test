import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login  = ({login,isAuthenticated}) => {

    const [formData, setFromData] = useState({
        email: '',
        password: ''
    });

    const {email,password} = formData;
    const onChange = e => setFromData({
        ...formData, [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);

            // console.log(formData);
            // const newUser = {
            //     email,
            //     password
            // }
            // try{
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users',body,config);
            //     console.log(res)
            // }catch(err){
            //     console.error(err.response.data);
            // }
    };

    // redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Login Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input required
                           onChange={e => onChange(e)}
                           value={email}
                           type="email"
                           placeholder="Email Address"
                           name="email"/>
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={password}
                        type="password"
                        placeholder="Confirm Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);