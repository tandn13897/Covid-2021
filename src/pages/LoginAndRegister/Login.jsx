import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router'
import {  useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form, FastField } from 'formik'
import PropTypes from 'prop-types';
import InputField from '../../components/InputField'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'


import { GlobalActions } from '../../redux/slices/RootAction'
import './login.css'

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    onSubmit: null,
}

export default function LoginForm() {
    // const error = useSelector(state => state.GlobalReducer.error)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required.'),

        password: Yup.string().required('This field is required.')
    })

    const handleSubmit = (values) =>  {
        console.log('ID là', values.username)
        console.log('Pass là', values.password)
            if ( values.username === 'admin' && values.password === '123')
                {
                    dispatch(GlobalActions.getUserName('admin'))
                    dispatch(GlobalActions.getUserPassword('123'))
                    localStorage.setItem('user', 'admin')
                    localStorage.setItem('password', '123')
                    history.push('/')
                }
            else
                {
                    dispatch(GlobalActions.getError('Account or password incorrect'))
                }
    }

    const handleGoToHomePage = () => {
        history.push('/')
    }
    
    return (
        <div className='login__container'>
            <h3>Welcome</h3>
            <div className='login__avatar'>
                <Avatar 
                    icon={<UserOutlined 
                            style={{fontSize:70, color:'snow'}}/>} size={80}
                    style={{backgroundColor:'skyblue'}}
                />
            </div>
            <Formik
            initialValues = {initialValues}
            validationSchema = {validationSchema}
            onSubmit = {values => handleSubmit(values)}  
            >
            {formikProps => {
                const { values, errors} = formikProps;
                console.log({values, errors})
                return (
                    <Form>
                        <FastField
                            name = "username"
                            component = {InputField}
                            
                            label = "Username"
                            placeholder = "Enter your username" 
                        />

                        <FastField
                            name = "password"
                            component = {InputField}
                            
                            label = "Password"
                            placeholder = "Enter your password"
                            type = 'password'
                        />
                        <Button htmlType='submit' className='login__btn-submit'>LOGIN</Button>
                        <Button onClick={handleGoToHomePage} className='login__btn-homepage'>Go to Homepage</Button>
                    </Form>
                )
            }}
        </Formik>
        </div>     
    )
}
