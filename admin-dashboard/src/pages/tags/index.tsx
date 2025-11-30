import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

const TagList: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tags');
            setTags(response.data);
        } catch (error) {
            message.error('Failed to fetch tags');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this tag?',
            onOk: async () => {
                try {
                    await api.delete(`/tags/${id}`);
                    message.success('Tag deleted successfully');
                    fetchTags();
                } catch (error) {
                    message.error('Failed to delete tag');
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
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Tag) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/tags/edit/${record.id}`)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Tags</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/tags/create')}>
                    Add Tag
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={tags}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default TagList;
