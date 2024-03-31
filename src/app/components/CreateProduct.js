import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';

const AddProductModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    const handleOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            values.price = Number(price);
            values.description = "A description";
            values.categoryId = 1;
            values.images = ["https://placeimg.com/640/480/any"];
            console.log(values, 's')
            const res = await fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (res.ok) {
                message.success('Product created successfully');
                onCreate(values);
                form.resetFields();
                setTitle('');
                setPrice('');
                onCancel()
            } else {
                throw new Error('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            message.error('Failed to create product');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal
            open={open}
            title="Add New Product"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            confirmLoading={loading}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[
                    { required: true, message: 'Please enter the price' },
                    // { type: 'number', message: 'Price must be a positive number' },
                ]}>
                    <Input type="number" value={price} onChange={(e) => {
                        setPrice(Number(e.target.value))
                        // const inputValue = parseFloat(e.target.value);
                        // console.log(typeof inputValue);
                        // setPrice(isNaN(inputValue) ? '' : inputValue);
                        // console.log(typeof price, typeof e.target.value);
                        // setPrice(parseFloat(e.target.value))
                    }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
