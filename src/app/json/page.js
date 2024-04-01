'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Flex, Input, Row, Select, Space, Switch, Typography } from 'antd'
import { Option } from 'antd/es/mentions'
import { jsonData } from '../constants'
import { CloseOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'


const page = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    setData(jsonData)
  }, [])

  const addItem = () => {
    const newItem = {
      id: data.payment.deposit.length + 1,
      custom_input: [
        {
          type: 'options',
          label: 'card1',
        },
        {
          type: 'options',
          label: 'card1',
        },
      ],
      country_sorting: [
        {
          sort: 1,
          action: true,
          country: 'India',
        },
        {
          sort: 2,
          action: false,
          country: 'USA',
        },
      ],
    };

    setData({
      ...data,
      payment: {
        ...data.payment,
        deposit: [...data.payment.deposit, newItem],
      },
    });
  };
  const removeItem = (itemId) => {
    const updatedDeposit = data.payment.deposit.filter(item => item.id !== itemId);

    setData({
      ...data,
      payment: {
        ...data.payment,
        deposit: updatedDeposit,
      },
    });
  };

  return (
    <>
      <div style={{ marginTop: '5vh' }}>
        <Card>
          <div>
            {
              data?.payment?.deposit.map((item) => (
                < Col span={14} key={item?.id}>
                  <Typography.Title level={5}>Deposit</Typography.Title>
                  <Card style={{ height: '100%', minHeight: '25vh' }}>
                    <Flex horizontal style={{ margin: '-24px', height: '25vh', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', minWidth: '100%' }}>
                      <Flex horizontal wrap='wrap' gap={'middle'} style={{ padding: 10 }} >
                        {item?.custom_input.map((val) =>
                          val?.type === 'options' &&
                          <div>
                            <Typography>{val.label}</Typography>
                            <Select defaultValue={'card1'} style={{ width: 200 }}>
                              <Option value={'card1'}>
                                card1
                              </Option>
                            </Select>
                          </div>
                        )}
                        {item?.country_sorting.map((val) =>
                          val?.["sort"] &&
                          <div>
                            <Typography>{val?.country}</Typography>
                            <Switch checked={val?.action} />
                          </div>
                        )}
                      </Flex>
                      <Divider type='vertical' style={{ height: 'auto' }} />
                      <Flex vertical style={{ minHeight: '100%', justifyContent: 'space-between', alignItems: 'flex-end', padding: '4px', borderLeft: '0.5px solid #0000001f' }}>
                        <Button shape="circle" style={{ border: 'none' }} icon={<CloseOutlined />} onClick={() => removeItem(item?.id)} />
                        <Button shape="circle" style={{ border: 'none' }} icon={<SettingOutlined />} />
                      </Flex>
                    </Flex>
                  </Card>
                </Col>)
              )
            }
          </div>
          <Col span={12}>
            <Button type="primary" style={{ marginTop: 10 }} icon={<PlusOutlined />} onClick={addItem}>
              Add Item
            </Button>
          </Col>
        </Card >
      </div >
    </>
  )
}
export default page
