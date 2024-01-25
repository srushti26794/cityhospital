import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import "./LoginSignup.css"
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgetRequest, loginRequest, signupRequest } from '../../redux/action/auth.action';


function LoginSignup(props) {
    const [type, setType] = useState('login');
    // console.log(type);

    const dispatch = useDispatch();

    const handleSignup = () => {
        setType('signup')
    }

    const handleLogin = () => {
        setType('login');
    }

    const handleForgot = () => {
        setType('forgot');
    }

    let authSchema = {}, initialVal = {};

    if(type === 'signup'){
        authSchema = yup.object({
            name: yup.string().required("Enter your name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/[^\w]/, 'Password requires a symbol'),
            confPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        })
        initialVal = ({
            name: '',
            email: '',
            password: '',
            confPassword: ''
        })
    } else if (type === 'login'){
        authSchema = yup.object({
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().required("Enter your password")
        })

        initialVal = ({
            email: '',
            password: '',
        })
    } else {
        authSchema = yup.object({
            email: yup.string().required("Enter your email").email("Enter valid email")
        })

        initialVal = ({
            email: '',
        })
    }

    

    let formikObj = useFormik({
        initialValues: initialVal,
        validationSchema: authSchema,
        onSubmit: values => {
            
            if(type === 'signup'){
                dispatch(signupRequest(values))
            } else if(type === 'login'){
                dispatch(loginRequest(values))
            }else{
                dispatch(forgetRequest(values))
            }
    
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values } = formikObj;

    return (
        <section id='LoginSignup'>
            <Container>

                <div className="section-title">
                    {
                        type === 'forgot' ? <h2>Forgot password</h2> : type === 'signup' ? <h2>Sign Up</h2> : <h2>Login</h2>
                    }

                </div>

                <form onSubmit={handleSubmit} method='post' className='SignupForm'>
                    <div className='row'>
                        <div className='login-signup-form'>

                            <div className='sign_up'>
                                {
                                    type === 'signup'
                                        ? <><input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" name="name" className="form-control signup" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                            <span>{errors.name && touched.name ? errors.name : null}</span>
                                            <div className="validate" /></> : null
                                }


                                <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className="form-control signup" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                <span>{errors.email && touched.email ? errors.email : null}</span>
                                <div className="validate" />

                                {
                                    type === 'forgot'
                                        ? null
                                        : <><input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className="form-control signup" name="password" id="password" placeholder="Enter Password" data-rule="password" data-msg="Please enter a valid password" />
                                            <span>{errors.password && touched.password ? errors.password : null}</span>
                                            <div className="validate" /></>
                                }

                                {
                                    type === 'signup' ? <><input onChange={handleChange} onBlur={handleBlur} value={values.confPassword} type="password" className="form-control signup" name="confPassword" id="confPassword" placeholder="Confirm Password" data-rule="password" data-msg="Please enter a valid password" />
                                        <span>{errors.confPassword && touched.confPassword ? errors.confPassword : null}</span><div className="validate" /></> : null
                                }

                                {
                                    type === 'forgot'
                                        ? <><div className="text-center"><button className='signUpBtn' type="submit">Find account</button></div>
                                            <p className='haveAcc'><a href='#' onClick={handleLogin}>Login</a></p></>

                                        : type === 'signup'
                                            ? <><div className="text-center"><button className='signUpBtn' type="submit">Sign up</button></div>
                                                <p className='haveAcc'>Already have an account? <a href='#' onClick={handleLogin}>Login</a></p></>
                                            : <><div className="text-center"><button className='loginBtn' type="submit">Login</button></div>
                                                <p className='haveAcc'><a href='#' onClick={handleForgot}>Forgot password?</a></p>
                                                <p><a href='#' onClick={handleSignup}>Create a new account?</a></p></>
                                }
                            </div>
                        </div>
                    </div>
                </form>

            </Container>
        </section>
    );
}

export default LoginSignup;