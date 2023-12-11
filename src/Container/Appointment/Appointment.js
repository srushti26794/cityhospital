import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function Appointment(props) {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const appointSchema = yup.object({
        name : yup.string().required("Enter your name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        email : yup.string().required("Enter youe email").email("Enter valid email"),
        phone : yup.string().required("Enter your phone number"),
        date : yup.string().required("Please select date"),
        department : yup.string().required("Enter department"),
        file : yup.string().required("Please upload prescription photo"),
        message : yup.string().required("Enter message")
    })

    let formikObj = useFormik({
        initialValues: {
            name : '',
            email : '',
            phone : '',
            date : '',
            department : '',
            file : '',
            message : ''
        },
        validationSchema: appointSchema,
        onSubmit: values => {
         console.log(values);
        },
    })

    let {handleSubmit, handleChange, handleBlur, touched, errors, values} = formikObj;

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <h2>Make an Appointment</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <form onSubmit={handleSubmit} method="post" role="form" className="php-email-form">
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <span>{errors.name && touched.name ? errors.name : null}</span>
                            <div className="validate" />
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <span>{errors.email && touched.email ? errors.email : null}</span>
                            <div className="validate" />
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <span>{errors.phone && touched.phone ? errors.phone : null}</span>
                            <div className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 form-group mt-3">
                            <input onChange={handleChange} onBlur={handleBlur} value={values.date} type="date" name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <span>{errors.date && touched.date ? errors.date : null}</span>
                            <div className="validate" />
                        </div>
                        <div className="col-md-4 form-group mt-3">
                            <select onChange={handleChange} onBlur={handleBlur} value={values.department} name="department" id="department" className="form-select">
                                <option value>Select Department</option>
                                <option value="Department 1">Department 1</option>
                                <option value="Department 2">Department 2</option>
                                <option value="Department 3">Department 3</option>
                            </select>
                            <span>{errors.department && touched.department ? errors.department : null}</span>
                            <div className="validate" />
                        </div>
                        <div className="col-md-4 form-group mt-3">
                            <input onChange={handleChange} onBlur={handleBlur} value={values.file} type='file' name='file'></input>
                            <div className="validate" />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <textarea onChange={handleChange} onBlur={handleBlur} value={values.message} className="form-control" name="message" rows={5} placeholder="Message (Optional)" defaultValue={""} />
                        <span>{errors.message && touched.message ? errors.message : null}</span>
                        <div className="validate" />
                    </div>
                    <div className="mb-3">
                        <div className="loading">Loading</div>
                        <div className="error-message" />
                        <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                    </div>
                    <div className="text-center"><button type="submit">Make an Appointment</button></div>
                </form>
            </div>
        </section>

    );
}

export default Appointment;