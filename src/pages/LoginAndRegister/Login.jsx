import React, {useState, useEffect} from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router'
import { useSelector ,useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form, FastField } from 'formik'
import PropTypes from 'prop-types';
import InputField from '../../components/InputField'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'


import { GlobalActions } from '../../redux/slices/RootAction'
import './login.css'

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    onSubmit: null,
}

export default function LoginForm() {
    const [accounts, setAccounts] = useState([])
    const error = useSelector(state => state.GlobalReducer.error)
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
        const element = accounts.findIndex(
            (account) => account.username === values.username && account.password === values.password
        )
        if (element >= 0) {
            dispatch(GlobalActions.getUserName(accounts[element].username))
            dispatch(GlobalActions.getUserPassword(accounts[element].password))
            localStorage.setItem('token', accounts[element].username)
            dispatch(GlobalActions.getUserLogin(true))
            history.push('/')
        } else {
            dispatch(GlobalActions.getError('Account or password incorrect'))
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
                // console.log({values, errors})
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
                        <span style = {{color:'red'}}>{error}</span>
                        <Button htmlType='submit' className='login__btn-submit'>LOGIN</Button>
                    </Form>
                )
            }}
        </Formik>
        </div>     
    )
}
