import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

import DefaultLayout from '../components/DefaultLayout';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import {
    EyeOutlined
} from '@ant-design/icons';

import '../resources/item.css';

const Customers = () => {

    const [billsData, setBillsData] = useState([]);

    const dispatch = useDispatch();

    const getAllBills = () => {

        dispatch({ type: 'showLoading' });

        axios.get("/api/bills/get-all-bills").then((response) => {
            dispatch({ type: 'hideLoading' });
            const data = response.data;
            data.reverse();
            setBillsData(data);
        }).catch((error) => {
            dispatch({ type: 'hideLoading' });
            console.log(error);
        })
    };

    useEffect(() => {
        getAllBills();
    }, []);

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'customerPhoneNumber'
        },
        {
            title: 'Created On',
            dataIndex: 'createdAt',
            render: (value) => <span>{value.toString().substring(0, 10)}</span>
        },
    ];

    return <DefaultLayout>
        <div className='d-flex justify-content-between align-items-center'>
            <h3>Customers</h3>
        </div>
        <Table columns={columns} dataSource={billsData} bordered pagination={false}></Table>
    </DefaultLayout>;
}

export default Customers;