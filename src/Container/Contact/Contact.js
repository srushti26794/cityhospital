import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function Contact(props) {

    const contactSchema = yup.object({
        name : yup.string().required("Please enter name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        email : yup.string().required("Please enter email").email("Please enter valid email"),
        subject : yup.string().required("Please enter subject"),
        message : yup.string("Please enter message").required().min(5, "Enter minimun 5 letter").max(10, "Only 10 letter allowed")
    })

    const formikObj = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: contactSchema,
        onSubmit: values => {
         console.log(values);
        },
      });

      let {handleSubmit, handleChange, handleBlur, touched, errors, values} = formikObj

      console.log(touched, errors);

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-title">
                    <h2>Contact</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="info">
                            <div className="address">
                                <i className="bi bi-geo-alt" />
                                <h4>Location:</h4>
                                <p> F-505, Inovative Plazza New Delhi, India</p>
                            </div>
                            <div className="email">
                                <i className="bi bi-envelope" />
                                <h4>Email:</h4>
                                <p>cityhospital@example.com</p>
                            </div>
                            <div className="phone">
                                <i className="bi bi-phone" />
                                <h4>Call:</h4>
                                <p>+91 9988776655</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-5 mt-lg-0">
                        <form onSubmit={handleSubmit} method="post" role="form" className="php-email-form">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                                    <span>{errors.name && touched.name ? errors.name : null}</span>
                                </div>
                                
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                    <span>{errors.email && touched.email ? errors.email : null}</span>
                                </div>
                                
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" onChange={handleChange} onBlur={handleBlur} value={values.subject} />
                                <span>{errors.subject && touched.subject ? errors.subject : null}</span>
                            </div>
                            
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" rows={5} placeholder="Message" onChange={handleChange} onBlur={handleBlur} value={values.message} />
                                <span>{errors.message && touched.message ? errors.message : null}</span>
                            </div>
                            
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message" />
                                <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div>
                            <div className="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Contact;