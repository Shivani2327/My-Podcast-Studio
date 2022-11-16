
import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react'
import'./addpodcast.css';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
const AddPodcast = () => {

  const [selFile, setSelFile] = useState("");
  const [selImage, setSelImage] = useState("");

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          text: 'File uploaded'
        })
      }
    });
  };

  const uploadImage = (e) => {
    const image = e.target.files[0];
    setSelImage(image.name);
    const fd = new FormData();
    fd.append("myfile", image);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          text: 'image uploaded'
        })
      }
    });
  };

  const userSubmit = async (formdata, { resetForm, setSubmitting, }) => {
    setSubmitting(true);
    formdata.image = selImage;
    formdata.file = selFile;
    console.log(formdata)

    const response = await fetch('http://localhost:5000/podcast/add', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json'
      }
    });


    console.log(response.status);
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Uploaded',
        text: 'Podcast Uploaded successfully'
      })
    }

    setSubmitting(false)
    resetForm();

  }

  const myValidation = Yup.object().shape({
    username: Yup.string().min(3, 'Too short').max(10, 'Too Long').required('title Required')
  })

  
  return (
    <motion.div
      initial={{ scale: 0.5, x: '100%', opacity: 0 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      
      className='podcast-container' >
      <div className='col-md-4 mx-auto'>
      <div className="card podcast-card">
        <div className="card-body">
          <h3 className='text-center'>AddPodcast Here</h3>
          <Formik
            initialValues={{ 
              uploadedBy:'',
              createdAt:new Date(),
              title : ''  
            }}
            onSubmit={userSubmit}
            // validationSchema={myValidation}
          >
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <label>title</label>
                <input type="text" className='form-control mb-3' name="title" value={values.title} onChange={handleChange}></input>
                <p className='mb-3 message'>{errors.username}</p>
                <label>image</label>
                <input type="file" className='form-control mb-3' onChange={uploadImage} ></input>
                <label>file</label>
                <input type="file" className='form-control mb-3' onChange={uploadFile}></input>



                <label>uploadedBy</label>
                <input type="text" className='form-control mb-3' name="uploadedBy" value={values.uploadedBy} onChange={handleChange}></input>

                
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

export default AddPodcast;

