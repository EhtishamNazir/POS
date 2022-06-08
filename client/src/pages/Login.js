import React, { useEffect } from 'react';

import { Button, Col, Form, Input, message, Row } from 'antd';
import '../resources/authentication.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';


function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
        dispatch({ type: 'showLoading' });
        axios.post('/api/users/login', values)
            .then((res) => {
                dispatch({ type: 'hideLoading' });
                message.success('Login successfull');
                localStorage.setItem('pos-user', JSON.stringify(res.data));
                navigate('/');
            }).catch((error) => {
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
                        <h4>Login</h4>
                        <Form.Item name='userId' label='User Id'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='passowrd' label='Password'>
                            <Input type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-end mb-3'>
                            <Link to='/register'>Don't have acccount? Click here to Register</Link>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button htmlType='submit' type='primary'>Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
};

export default Login;