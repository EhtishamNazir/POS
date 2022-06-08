import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import DefaultLayout from '../components/DefaultLayout';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';

import '../resources/item.css';

const Items = () => {

    const [addEditModal, setAddEditModal] = useState(false);
    const [itemsData, setItemsData] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const dispatch = useDispatch();

    const getAllItems = () => {

        dispatch({ type: 'showLoading' });

        axios.get("/api/items/get-all-items").then((response) => {
            setItemsData(response.data);
            dispatch({ type: 'hideLoading' });
        }).catch((error) => {
            console.log(error);
            dispatch({ type: 'hideLoading' });
        })
    };

    const deleteItem = (record) => {

        dispatch({ type: 'showLoading' });

        axios.post("/api/items/delete-item", { itemId: record._id }).then((response) => {
            dispatch({ type: 'hideLoading' });
            message.success('Item deleted successfully');
            getAllItems();
        }).catch((error) => {
            console.log(error);
            dispatch({ type: 'hideLoading' });
            message.error('Something went wrong');
        })
    };

    useEffect(() => {
        getAllItems();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => <img src={image} height='60' width='60' alt='' />
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => (
                <div className='d-flex'>
                    <EditOutlined className='mx-2' onClick={() => {
                        setEditItem(record);
                        setAddEditModal(true)
                    }} />
                    <DeleteOutlined className='mx-2' onClick={() => deleteItem(record)} />
                </div>
            )
        }
    ];

    const onFinish = (values) => {
        if (editItem === null) {
            axios.post("/api/items/add-item", values).then((response) => {
                dispatch({ type: 'hideLoading' });
                message.success('Item added successfully');
                setAddEditModal(false);
                getAllItems();
            }).catch((error) => {
                console.log(error);
                dispatch({ type: 'hideLoading' });
                message.error('Something went wrong');
            })
        } else {
            axios.post("/api/items/edit-item", { ...values, itemId: editItem._id }).then((response) => {
                dispatch({ type: 'hideLoading' });
                message.success('Item updated successfully');
                setAddEditModal(false);
                setEditItem(null);
                getAllItems();
                console.log(response);
            }).catch((error) => {
                console.log(error);
                dispatch({ type: 'hideLoading' });
                message.error('Something went wrong');
            })
        }
    }

    return <DefaultLayout>
        <div className='d-flex justify-content-between align-items-center'>
            <h3>Items</h3>
            <Button type='primary' onClick={() => setAddEditModal(true)}>Add Item</Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered pagination={false}></Table>
        {addEditModal && <Modal onCancel={() => {
            setAddEditModal(false)
            setEditItem(null)
        }} visible={addEditModal} title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`} footer={false}>
            <Form initialValues={editItem} layout='vertical' onFinish={onFinish}>
                <Form.Item name='name' label='Name'>
                    <Input />
                </Form.Item>
                <Form.Item name='price' label='Price'>
                    <Input />
                </Form.Item>
                <Form.Item name='image' label='Image URL'>
                    <Input />
                </Form.Item>
                <Form.Item name='category' label='Category'>
                    <Select>
                        <Select.Option value='fruits'>Fruits</Select.Option>
                        <Select.Option value='vegetables'>Vegetables</Select.Option>
                        <Select.Option value='meat'>Meat</Select.Option>
                    </Select>
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <Button htmlType='submit' type='primary'>SAVE</Button>
                </div>
            </Form>
        </Modal>

        }
    </DefaultLayout>;
}

export default Items;