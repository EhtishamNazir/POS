import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Button, Col, Form, Input, message, Row } from 'antd';
import '../resources/authentication.css';


function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
        dispatch({ type: 'showLoading' });
        axios.post('/api/users/register', values).then((res) => {
            dispatch({ type: 'hideLoading' });
            message.success('Registration successfull, Please wait for verification')
        }).catch(() => {
            dispatch({ type: 'hideLoading' });
            message.error('Something went wrong');
        })
    }

    useEffect(() => {
        if (localStorage.getItem('pos-user')) {
            navigate('/');
        }
    }, []);

    return (
        <div className='authentication'>
            <Row>
                <Col lg={8} xs={22}>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1 className='text-center'><b>POS</b></h1>
                        <h4>Register</h4>
                        <Form.Item name='name' label='Name'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='userId' label='User Id'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password'>
                            <Input type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-end mb-3'>
                            <Link to='/login'>Already have an account? Click here to Login</Link>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button htmlType='submit' type='primary'>Register</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
};

export default Register;