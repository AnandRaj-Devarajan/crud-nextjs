"use client"
import React, { useEffect, useState } from "react";
import { Avatar, Button, Layout, Menu, message, Popconfirm, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
import CustomTable from "./components/CustomTable";
import { useRouter } from "next/navigation";
import AddProductModal from "./components/CreateProduct";

export default function Home() {
  const router = useRouter()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const apiData = await res.json();
      setData(apiData);
      setTotalCount(apiData?.length);
    } catch (error) {
      message.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = () => fetchData();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (data) => <Link href={`/${data.id}`}>{data}</Link>,
      onCell: (record) => ({
        onClick: () => router.push(`/${record.id}`),
      }),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (images) => (
        <Avatar src={images[0]} alt={images[0]} width={100} height={100} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm
            title="Are you sure delete this Row"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 10 }}>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const handleClose = () => {
    setModalVisible(false);
    fetchData();
  }
  return (
    <main style={{ marginTop: 5 }}>
      {loading ? <Skeleton /> :
        (
          <>
            <Content
              style={{
                padding: '0 48px',
              }}
            >
              <Layout
                style={{
                  padding: '12px 0'
                }}
              >
                <Content
                  style={{
                    padding: '0 24px',
                    minHeight: 280,
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    <Button type="primary" onClick={() => setModalVisible(true)}>
                      Add Product
                    </Button>
                  </div>
                  <CustomTable data={data} totalCount={totalCount} fetchData={fetchData} columns={columns} />
                </Content>
              </Layout>
            </Content>
            <AddProductModal
              open={modalVisible}
              onCreate={handleCreateProduct}
              onCancel={handleClose}
            />
          </>
        )
      }

    </main>
  );
}

