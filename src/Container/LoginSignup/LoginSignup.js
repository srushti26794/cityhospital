import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import "./LoginSignup.css"
import { useFormik } from 'formik';

function LoginSignup(props) {
    const [type, setType] = useState('login');
    console.log(type);

    const handleSignup = () => {
        setType('signup')
        // console.log(type);
    }

    const handleLogin = () => {
        setType('login');
        // console.log(type);
    }

    const handleForgot = () => {
        setType('forgot');
    }

    console.log(type);

    return (
        <section id='LoginSignup'>
            <Container>

                <div className="section-title">
                    {
                        type === 'signup' ? <h2>Sign Up</h2> : <h2>Login</h2>
                    }

                </div>

                <form action method='post' className='SignupForm'>
                    <div className='row'>
                        <div className='sign_up'>
                            {
                                type === 'signup'
                                    ? <><input type="text" name="name" className="form-control signup" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <div className="validate" /></> : null
                            }


                            <input type="email" className="form-control signup" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div className="validate" />

                            {
                                type === 'forgot'
                                    ? null
                                    : <><input type="password" className="form-control signup" name="password" id="password" placeholder="Enter Password" data-rule="password" data-msg="Please enter a valid password" />
                                        <div className="validate" /></>
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
                </form>

            </Container>
        </section>
    );
}

export default LoginSignup;