import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, message, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    sku: string;
    image: string;
    isActive: boolean;
    isFeatured: boolean;
    category?: { name: string };
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            message.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            onOk: async () => {
                try {
                    await api.delete(`/products/${id}`);
                    message.success('Product deleted successfully');
                    fetchProducts();
                } catch (error) {
                    message.error('Failed to delete product');
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image src={image} width={50} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price}`,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            key: 'category',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: any, record: Product) => (
                <Space>
                    {record.isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
                    {record.isFeatured && <Tag color="gold">Featured</Tag>}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/products/edit/${record.id}`)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Products</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/products/create')}>
                    Add Product
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={products}
                rowKey="id"
                loading={loading}
                scroll={{ x: 800 }}
            />
        </div>
    );
};

export default ProductList;
