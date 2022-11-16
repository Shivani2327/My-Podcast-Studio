import { ErrorMessage, Formik } from 'formik';
import React from 'react'
import'./signup.css';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
const Signup = () => {

    //step 1:create a function for submission
    const userSubmit = async (formdata, { resetForm, setSubmitting, }) => {
        setSubmitting(true);
        // setTimeout(() => {     
        console.log(formdata)

        //for sending request to backend
        //1. url
        //2. request method
        //3.data
        //4.data format - json
        ///await keyword will wait for the response....but then will not wait..
        //.that's y we are using await instead of then and catch..
        const response = await fetch('http://localhost:5000/user/add', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //reading response status


        console.log(response.status);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Registered',
                text: 'User registered successfully'
            })
        }

        setSubmitting(false)
        resetForm();
        // }, 1000 )
    }

    const myValidation = Yup.object().shape({
        username: Yup.string().min(3, 'Too short').max(10, 'Too Long').required('Username Required')
    })


    return (
        
        <motion.div
        
            initial={{ scale: 0.5, x: '1000%', opacity: 0 }}
            animate={{ scale: 1, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className='signup-background'>
            <div className='col-md-4 mx-auto'>
            <div className="card">
                <div className="card-body">
                    <h3 className='text-center'>Signup Here</h3>
                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        onSubmit={userSubmit}
                        validationSchema={myValidation}
                    >
                        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <label>Username</label>
                                <input type="text" className='form-control mb-3' name="username" value={values.username} onChange={handleChange}></input>
                                <p className='mb-3 message'>{errors.username}</p>
                                <label>Email</label>
                                <input type="text" className='form-control mb-3' name="email" value={values.email} onChange={handleChange} ></input>
                                <label>Password</label>
                                <input type="password" className='form-control mb-3' name="password" value={values.password} onChange={handleChange}></input>

                                <button disabled={isSubmitting} type='submit' className='btn btn-primary'>
                                    {
                                        isSubmitting ?
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            ""
                                    }
                                    &nbsp;&nbsp;Submit
                                </button>
                            </form>
                        )}

                    </Formik>
                </div>
            </div>
            </div>
        </motion.div>
    )
}

export default Signup;

//200 - successful
//500 - server side error
//400 - error