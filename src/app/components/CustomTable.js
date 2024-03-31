import { Table } from 'antd';
import { useState } from 'react';

const CustomTable = ({ data, totalCount, fetchData,columns }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: totalCount
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    fetchData(pagination.current, pagination.pageSize, sorter);
  };


  return (
    <Table
      rowKey="id"
      dataSource={data}
      pagination={pagination}
      loading={!data}
      onChange={handleTableChange}
      columns={columns}
    />
  );
};

export default CustomTable;
