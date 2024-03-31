import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';

const CustomModal = ({ id, open, handleClose, title, price }) => {

    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        setNewTitle(title);
        setNewPrice(price);

    }, [open])

    const submit = async () => {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                price: newPrice
            })
        });
        const result = await res.json();
        if (result) {
            handleClose();
            setNewTitle('');
            setNewPrice('');
        }
        console.log(result, 'lllll');
    };

    return (
        <>
            <Modal
                title="Edit User"
                open={open}
                onOk={submit}
                onCancel={handleClose}
            >
                <Form
                    name="basic"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input
                            name="tile"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <Input
                            name="price"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default CustomModal;