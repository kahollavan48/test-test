import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from "prop-types";

const Register  = ({setAlert,register,isAuthenticated}) => {

    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name,email,password,password2} = formData;
    const onChange = e => setFromData({
        ...formData, [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match!', 'danger');
        }else {
            register({
                name,email,password
            });
            // console.log(formData);
            // const newUser = {
            //     name,
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
        }
    }

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={name} type="text" placeholder="Name" name="name" required/>
                </div>
                <div className="form-group">
                    <input required onChange={e => onChange(e)} value={email} type="email" placeholder="Email Address" name="email"/>
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)} value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)} value={password2}
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register})(Register);