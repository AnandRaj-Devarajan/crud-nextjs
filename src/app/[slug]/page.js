'use client'
import { Avatar, Button, Card, Flex, Skeleton, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useEffect, useState } from 'react'
import CustomModal from '../components/EditProduct'

const Page = ({ params }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        fetchUser();

    }
    const fetchUser = async () => {
        if (params?.slug) {
            setLoading(true);
            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params?.slug}`);
                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        fetchUser();
    }, [params]);

    return (
        <div>
            {loading ? (
                <Skeleton
                    active
                    avatar
                    paragraph={{
                        rows: 4,
                    }}
                />
            ) :
                <>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        actions={[
                            <Button type="primary" onClick={() => setOpen(true)}>Edit</Button>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={user?.category?.image} alt={user?.category?.name} />}
                            title={<Flex gap="middle" horizontal><Typography>{user?.title}</Typography><Typography>{user?.price}$</Typography></Flex>}
                            description={user?.description}
                        />
                    </Card>
                    <CustomModal
                        open={open}
                        handleClose={handleClose}
                        id={params?.slug}
                        title={user?.title}
                        price={user?.price}
                    />
                </>
            }
        </div>
    )
}

export default Page