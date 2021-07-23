import React, {useEffect, useState} from 'react'
import { Button, Radio, Modal } from 'antd'
import PropTypes from 'prop-types';
import InputField from '../../components/InputField'
import { Formik, Form, FastField } from 'formik'
import { useSelector ,useDispatch } from 'react-redux'
import { GlobalActions } from '../../redux/slices/RootAction'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
import axios from 'axios'

import './login.css'

Register.propTypes = {
    onSubmit: PropTypes.func,
};

Register.defaultProps = {
    onSubmit: null,
}

function success() {
    Modal.success({
        content: 'Register Success',
    });
}

export default function Register() {
    const [accounts, setAccounts] = useState([])
    const error = useSelector(state => state.GlobalReducer.error)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialValues = {
        username: '',
        password: '',
        email:''
    }

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("First Name is Required.")
            .min(1, "First Name is Too Short."),
        last_name: Yup.string()
            .required("Last Name is Required.")
            .min(1, "Last Name is Too Short."),
        username: Yup.string()
            .required("Username is Required."),
        email: Yup.string().email().required("Email is Required."),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const handleSubmit = (values) => {
        const element = accounts.findIndex(
            (account) => account.username === values.username && account.email === values.email
        )
        if ( element > 0) {
            return dispatch(GlobalActions.getError('Account or email already exists'))
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:3000/accounts',
                data: values
            })
            success()
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/accounts')
            .then(res => {
                setAccounts(res.data)
            })  
            .catch(err => alert(err))
    })

    return (
        <div className='register__container'>
            <h3>Create Account</h3>
            <Formik  
            initialValues={initialValues}
            validationSchema = {validationSchema}
            onSubmit = {values => handleSubmit(values)}
            >
            {formikProps => {
                const { values, errors } = formikProps;
                // console.log({values})
                return (
                    <Form>
                        <div className='register__name'>
                            <div>
                            <FastField
                                name = "first_name"
                                component = {InputField}
                            
                                label = "First Name"
                                placeholder = "Your First Name" 
                            />
                            </div>

                            <div>
                            <FastField
                                name = "last_name"
                                component = {InputField}
                            
                                label = "Last Name"
                                placeholder = "Your Last Name" 
                            />
                            </div>
                        </div>

                        <FastField
                            name = "username"
                            component = {InputField}
                        
                            label = "Username"
                            placeholder = "Enter your username" 
                        />

                        <FastField
                            name = "email"
                            component = {InputField}
                        
                            label = "Email"
                            placeholder = "Enter your email" 
                        />

                        <div className='register__password'>
                            <div>
                            <FastField
                                name = "password"
                                component = {InputField}
                            
                                label = "Password"
                                placeholder = "Enter Your Password" 
                                type = 'password'
                            />
                            </div>

                            <div>
                            <FastField
                                name = "confirmPassword"
                                component = {InputField}
                            
                                label = "Confirm Password"
                                placeholder = "Type Password again" 
                                type = 'password'
                            />
                            </div>
                        </div>

                        <div className='register__gender'>
                            <h5>Gender:</h5>
                            <Radio.Group style={{display:'flex'}}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Radio.Group>
                        </div>
                        <span style = {{color:'red'}}>{error}</span>
                        <Button htmlType='submit' className='register__btn-submit'>Submit</Button>
                    </Form>
                )
            }}
        </Formik>
        </div>  
    )
}
