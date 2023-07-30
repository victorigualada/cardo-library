import React, {useEffect, useState} from 'react';
import {Button, Form, Popconfirm, Table, Typography} from 'antd';
import { Book } from './types/book.type';
import EditableCell from './EditableCell';
import {OperationsRow, TableContainer} from './styles';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import axios, {AxiosRequestConfig} from 'axios';
import { TableBook } from './types/table-book.type';
import {useAuth} from '../../shared/hooks/useAuth';

const apiUrl: string = `${process.env.REACT_APP_API_URL!}/books`;

const findHighestId = (data: TableBook[]) => (
  Math.max(...data.map(book => book.id))
);

const BookTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<TableBook[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const { authenticatedUser } = useAuth();

  const isEditing = (record: TableBook) => record.key === editingKey;

  useEffect(() => {
    axios.get(`${apiUrl}`, getRequestConfig())
      .then((response) => {
        const parsedData = response.data.map((row: Book) => {
          return { key: row.id.toString(), ...row }
        });
        setData(parsedData);
      });
  }, []);

  const getRequestConfig = (extraOptions?: any): AxiosRequestConfig => {
    const user = localStorage.getItem('user');
    const { jwtToken } = user && JSON.parse(user || '{}') || { jwtToken: ''};

    return {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/octet-stream',
      },
      ...extraOptions
    };
  }

  const add = () => {
    const newKey = (findHighestId(data) + 1).toString();
    const newData = {
      key: newKey,
      title: ``,
      author: '',
      year: 2023,
      ISBN: '',
    } as TableBook;
    setData([...data, newData]);
    setEditingKey(newKey);
  }

  const edit = (record: Partial<TableBook> & { key: string }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const updateRecord = async (record: TableBook) => {
    try {
      const row = (await form.validateFields()) as TableBook;

      if (record.id) {
        await axios.patch(`${apiUrl}/${record.id}`, row, getRequestConfig());
      } else {
        await axios.post(`${apiUrl}`, row, getRequestConfig());
      }
      save(record.key, row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  const removeRecord = async (record: TableBook) => {
    await axios.delete(`${apiUrl}/${record.id}`, getRequestConfig());
    save(record.key);
  }

  const save = async (key: React.Key, row?: TableBook) => {
    const newData: TableBook[] = [...data];
    const index = newData.findIndex((item: TableBook) => key === item.key);

    const shouldEdit = index > -1 && row;
    const shouldRemove = index > -1 && !row;
    const shouldCreate = index === -1 && row;

    if (shouldEdit) {
      const item: TableBook = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    }

    if (shouldRemove) {
      newData.splice(index, 1);
    }

    if (shouldCreate) {
      await axios.post(`${apiUrl}`, row, getRequestConfig());
      newData.push(row);
    }

    setData(newData);
    setEditingKey('');
  };

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      width: '45%',
      editable: true,
    },
    {
      title: 'author',
      dataIndex: 'author',
      width: '35%',
      editable: true,
    },
    {
      title: 'year',
      dataIndex: 'year',
      width: '7%',
      editable: true,
    },
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: TableBook) => {
        const editable = isEditing(record);
        console.log(authenticatedUser);
        if (!authenticatedUser) {
          return <></>
        }
        return editable ? (
          <span>
            <Typography.Link onClick={() => updateRecord(record)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <OperationsRow>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <AiFillEdit />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => removeRecord(record)}>
              <Typography.Link disabled={editingKey !== ''}>
                <AiFillDelete color={'red'}/>
              </Typography.Link>
            </Popconfirm>
          </OperationsRow>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableBook) => ({
        record,
        inputType: col.dataIndex === 'year' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <TableContainer>

      { authenticatedUser &&
        <Button onClick={add} type="primary" style={{ backgroundColor: 'var(--color-secondary)', marginBottom: '1rem' }}>
          Add a book
        </Button>
      }
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </TableContainer>

  );
};

export default BookTable;