import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, message, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    order: number;
    isActive: boolean;
}

const HeroSlideList: React.FC = () => {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSlides = async () => {
        setLoading(true);
        try {
            const response = await api.get('/hero-slides');
            setSlides(response.data);
        } catch (error) {
            message.error('Failed to fetch hero slides');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this hero slide?',
            onOk: async () => {
                try {
                    await api.delete(`/hero-slides/${id}`);
                    message.success('Hero slide deleted successfully');
                    fetchSlides();
                } catch (error) {
                    message.error('Failed to delete hero slide');
                }
            },
        });
    };

    const columns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            width: 80,
            sorter: (a: HeroSlide, b: HeroSlide) => a.order - b.order,
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 100,
            render: (imageUrl: string) => <Image src={imageUrl} width={80} height={50} style={{ objectFit: 'cover' }} />,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Subtitle',
            dataIndex: 'subtitle',
            key: 'subtitle',
        },
        {
            title: 'CTA Text',
            dataIndex: 'ctaText',
            key: 'ctaText',
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
            render: (_: any, record: HeroSlide) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/hero-slides/edit/${record.id}`)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Hero Slides</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/hero-slides/create')}>
                    Add Hero Slide
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={slides}
                rowKey="id"
                loading={loading}
                scroll={{ x: 1000 }}
            />
        </div>
    );
};

export default HeroSlideList;
