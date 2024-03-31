'use client'
import { Card, Divider, Flex, Select, Typography } from 'antd'
import { Option } from 'antd/es/mentions'
import React from 'react'
import { data } from '../constants'


const page = () => {

  return (
    <>
      {data.payment.deposit.map((item) => (
        <Card key={item.id} title={item.type}>
          {item.custom_input.map((input, index) => (
            <div key={index} >
              {input.type === 'options' && (
                <>
                  <Typography>{input.label}</Typography>
                  <Divider orientation="left"></Divider>
                  <Select defaultValue="" style={{ width: 200, marginBottom: 10 }}>
                    {item.country_sorting.map((country) => (
                      <Option key={country.country} value={country.country}>
                        {country.country}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </div>
          ))}
        </Card>
      ))}
      {data.payment.withdrawl.map((item) => (
        <Card key={item.id} title={item.type}>
          {item.custom_input.map((input, index) => (
            <div key={index} >
              {input.type === 'options' && (
                <>
                  <Typography>{input.label}</Typography>
                  <Divider orientation="left"></Divider>
                  <Select defaultValue="" style={{ width: 200, marginBottom: 10 }}>
                    {item.country_sorting.map((country) => (
                      <Option key={country.country} value={country.country}>
                        {country.country}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </div>
          ))}
        </Card>
      ))}
    </>
  )
}

export default page


