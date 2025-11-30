import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, message, Card, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const { TextArea } = Input;
const { Option } = Select;

const ProductForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchTags();
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            message.error('Failed to fetch categories');
        }
    };

    const fetchTags = async () => {
        try {
            const response = await api.get('/tags');
            setTags(response.data);
        } catch (error) {
            message.error('Failed to fetch tags');
        }
    };

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/products/${id}`);
            const product = response.data;
            // Transform tags to array of IDs
            const tagIds = product.tags?.map((tag: any) => tag.id) || [];
            form.setFieldsValue({ ...product, tagIds });
        } catch (error) {
            message.error('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/products/${id}`, values);
                message.success('Product updated successfully');
            } else {
                await api.post('/products', values);
                message.success('Product created successfully');
            }
            navigate('/products');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title={isEdit ? 'Edit Product' : 'Create Product'}>
            {loading && isEdit && !form.getFieldValue('name') ? (
                <Spin />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isActive: true, isStockAvailable: true }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[{ required: true, message: 'Please enter slug' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter price' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image URL"
                        rules={[{ required: true, message: 'Please enter image URL' }]}
                    >
                        <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="tagIds" label="Tags">
                        <Select mode="multiple" placeholder="Select tags">
                            {tags.map((tag) => (
                                <Option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="isActive" valuePropName="checked" label="Active">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="isFeatured" valuePropName="checked" label="Featured">
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate('/products')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default ProductForm;
