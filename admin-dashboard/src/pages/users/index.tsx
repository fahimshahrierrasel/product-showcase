import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'user';
    isActive: boolean;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            onOk: async () => {
                try {
                    await api.delete(`/users/${id}`);
                    message.success('User deleted successfully');
                    fetchUsers();
                } catch (error) {
                    message.error('Failed to delete user');
                }
            },
        });
    };

    const getRoleBadge = (role: string) => {
        const colors: Record<string, string> = {
            admin: 'red',
            editor: 'blue',
            user: 'default',
        };
        return <Tag color={colors[role] || 'default'}>{role.toUpperCase()}</Tag>;
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => getRoleBadge(role),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/users/edit/${record.id}`)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Users</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/users/create')}>
                    Add User
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                scroll={{ x: 800 }}
            />
        </div>
    );
};

export default UserList;
