import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            message.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            onOk: async () => {
                try {
                    await api.delete(`/categories/${id}`);
                    message.success('Category deleted successfully');
                    fetchCategories();
                } catch (error) {
                    message.error('Failed to delete category');
                }
            },
        });
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
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Category) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/categories/edit/${record.id}`)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Categories</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/categories/create')}>
                    Add Category
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={categories}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default CategoryList;
