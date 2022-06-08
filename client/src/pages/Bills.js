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

const Bills = () => {

    const componentRef = useRef();
    const [billsData, setBillsData] = useState([]);
    const [printBillModal, setPrintBillModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

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
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal'
        },
        {
            title: 'Tax',
            dataIndex: 'tax'
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => (
                <div className='d-flex'>
                    <EyeOutlined className='mx-2' onClick={() => {
                        setPrintBillModal(true)
                        setSelectedBill(record)
                    }} />
                </div>
            )
        }
    ];

    const cartcolumns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (id, record) => <div>
                <b>{record.quantity}</b>
            </div>
        },
        {
            title: 'Total Price',
            dataIndex: '_id',
            render: (id, record) => <div>
                <b>{record.quantity * record.price}</b>
            </div>
        }
    ]

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return <DefaultLayout>
        <div className='d-flex justify-content-between align-items-center'>
            <h3>Bills</h3>
        </div>
        <Table columns={columns} dataSource={billsData} bordered pagination={false}></Table>
        {printBillModal && (
            <Modal
                visible={printBillModal}
                onCancel={() => setPrintBillModal(false)}
                title='Bill Details'
                footer={false}
                width={800}>
                <div className='bill-modal p-4' ref={componentRef}>
                    <div className='d-flex justify-content-between bill-header pb-4'>
                        <div>
                            <h1><b>SR Market</b></h1>
                        </div>
                        <div>
                            <p>Hydrabad</p>
                            <p>Amberpet 500013</p>
                            <p>009212433445</p>
                        </div>
                    </div>
                    <div className='bill-customer-details mt-4'>
                        <p><b>Name:</b> {selectedBill.customerName}</p>
                        <p><b>Phone Number:</b> {selectedBill.customerPhoneNumber}</p>
                        <p><b>Date:</b> {selectedBill.createdAt.toString().substring(0, 10)}</p>
                    </div>
                    <Table className='mt-4' dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false} />
                    <div>
                        <p><b>Sub Total:</b> {selectedBill.subTotal}</p>
                        <p><b>Tax:</b> {selectedBill.tax}</p>
                    </div>
                    <div className='dotted-border my-2'>
                        <h2>Total: {selectedBill.totalAmount} $/-</h2>
                    </div>
                    <div className='text-center'>
                        <p>Thanks</p>
                        <p>Visit Again :)</p>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button type='primary' onClick={handlePrint}>Print Bill!</Button>
                </div>
            </Modal>
        )}
    </DefaultLayout>;
}

export default Bills;