import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, message, Card, Spin, Row, Col, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
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
    const [fileList, setFileList] = useState<any[]>([]);

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
            
            if (product.image) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${product.image}`,
                    },
                ]);
            }
        } catch (error) {
            message.error('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const formData = new FormData();
            
            // Append name first for filename generation
            formData.append('name', values.name);
            
            // Append other fields
            Object.keys(values).forEach(key => {
                if (key !== 'image' && key !== 'name' && key !== 'tagIds') {
                    formData.append(key, values[key]);
                }
            });

            // Handle tags
            if (values.tagIds) {
                 values.tagIds.forEach((tagId: string) => formData.append('tagIds[]', tagId));
            }

            // Handle Image
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            } else if (fileList.length > 0 && fileList[0].url) {
                 // Keep existing image if no new file uploaded
                 // We might need to send the existing image path or handle it in backend
                 // For now, if no new file, we don't append 'image' so backend keeps old one
                 // But we need to make sure backend doesn't clear it if missing.
                 // Assuming backend updates only provided fields.
                 formData.append('image', fileList[0].url);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            if (isEdit) {
                await api.put(`/products/${id}`, formData, config);
                message.success('Product updated successfully');
            } else {
                await api.post('/products', formData, config);
                message.success('Product created successfully');
            }
            navigate('/products');
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Product Name" />
                            </Form.Item>
                        </Col>
                        
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please enter description' }]}
                            >
                                <TextArea rows={4} placeholder="Product Description" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
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
                        </Col>

                        <Col span={12}>
                             <Form.Item name="tagIds" label="Tags">
                                <Select mode="multiple" placeholder="Select tags">
                                    {tags.map((tag) => (
                                        <Option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                         <Col span={12}>
                            <Form.Item label="Image">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false} // Prevent auto upload
                                    maxCount={1}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="isActive" valuePropName="checked" label="Active">
                                <Switch />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="isFeatured" valuePropName="checked" label="Featured">
                                <Switch />
                            </Form.Item>
                        </Col>
                        
                         <Col span={8}>
                            <Form.Item name="isStockAvailable" valuePropName="checked" label="In Stock">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            {isEdit ? 'Update Product' : 'Create Product'}
                        </Button>
                        <Button style={{ marginTop: 8 }} block onClick={() => navigate('/products')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default ProductForm;
