import React from 'react'
import { Button, Radio } from 'antd'
import PropTypes from 'prop-types';
import InputField from '../../components/InputField'
import { Formik, Form, FastField } from 'formik'

import './login.css'

Register.propTypes = {
    onSubmit: PropTypes.func,
};

Register.defaultProps = {
    onSubmit: null,
}

export default function Register() {
    return (
        <div className='register__container'>
            <h3>Create Account</h3>
            <Formik  
            >
            {formikProps => {
                const { values} = formikProps;
                console.log({values})
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
                            name = "email"
                            component = {InputField}
                        
                            label = "Email"
                            placeholder = "Enter your username" 
                        />

                        <div className='register__password'>
                            <div>
                            <FastField
                                name = "password"
                                component = {InputField}
                            
                                label = "Password"
                                placeholder = "Enter Your Password" 
                            />
                            </div>

                            <div>
                            <FastField
                                name = "re-type_password"
                                component = {InputField}
                            
                                label = "Re-type Password"
                                placeholder = "Type Password again" 
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
                        <Button htmlType='submit' className='register__btn-submit'>Submit</Button>
                    </Form>
                )
            }}
        </Formik>
        </div>  
    )
}
