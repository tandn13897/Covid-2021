import React, {useEffect} from 'react'
import { Button, Radio, Modal } from 'antd'
import PropTypes from 'prop-types';
import InputField from '../../components/InputField'
import { Formik, Form, FastField } from 'formik'
import { useSelector ,useDispatch } from 'react-redux'
import { GlobalActions } from '../../redux/slices/RootAction'
import { AccountAction } from '../../redux/slices/slicesDetails/AccountsSlice'
import { useHistory } from 'react-router'
import * as Yup from 'yup'

import './login.css'

Register.propTypes = {
    onSubmit: PropTypes.func,
};

Register.defaultProps = {
    onSubmit: null,
}

export default function Register() {
    const accounts = useSelector(state => state.AccountReducer.accountList)
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

    const handleLogIn = (username, password) => {
        dispatch(GlobalActions.getUserName(username))
        dispatch(GlobalActions.getUserPassword(password))
        localStorage.setItem('token', username)
        dispatch(GlobalActions.getUserLogin(true))
        setTimeout(history.push('/'), 2000)
    }

    const handleSubmit = (values) => {
        const element = accounts.findIndex(
            (account) => account.username === values.username || account.email === values.email
        )
        if ( element >= 0) {
            return dispatch(GlobalActions.getError('Account or email already exists'))
        } else {
            dispatch(AccountAction.addNewAccounts(values))
            console.log(accounts)
            Modal.success({
                content: 'Register Success',
                onOk:handleLogIn(values.username, values.password)
                });
            }
    }

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
