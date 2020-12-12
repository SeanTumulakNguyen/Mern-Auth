import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const { email, password, buttonText } = values

    const handleChange = (name) => (e) => {
        // console.log(e.target.value)
        setValues({...values, [name]: e.target.value })

    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Submitted' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response)

                // save th response (user, token) localstorage / cookie
                setValues({ ...values,  email: '', password: '', buttonText: 'Submitted' })
                toast.success(`Hey ${response.data.user.name}, Welcome back!`)
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
        })
    }

    const signinForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} value={email} type='text' className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} value={password} type='password' className='form-control' />
            </div>
            <div>
                <button className='btn btn-primary float-right' onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className='col-md-6 offset-md-3'>
            <ToastContainer />
            <h1 className='p-5 text-center'>Signup</h1>
            {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin