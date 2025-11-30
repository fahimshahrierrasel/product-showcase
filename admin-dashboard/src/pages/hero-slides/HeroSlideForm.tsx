import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Switch, InputNumber, message, Image, Row, Col, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const HeroSlideForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            fetchSlide();
        }
    }, [id]);

    const fetchSlide = async () => {
        try {
            const response = await api.get(`/hero-slides/${id}`);
            form.setFieldsValue(response.data);
            setImagePreview(response.data.imageUrl);
            if (response.data.imageUrl) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: response.data.imageUrl.startsWith('http') ? response.data.imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${response.data.imageUrl}`,
                    },
                ]);
            }
        } catch (error) {
            message.error('Failed to fetch hero slide');
        }
    };

    const handleUploadChange = async ({ file, fileList: newFileList }: any) => {
        setFileList(newFileList);
        
        if (file.status === 'uploading') {
            return;
        }

        if (file.originFileObj) {
             // Upload immediately to get URL
             const formData = new FormData();
             formData.append('image', file.originFileObj);
             
             try {
                 const response = await api.post('/upload', formData, {
                     headers: { 'Content-Type': 'multipart/form-data' }
                 });
                 const imageUrl = response.data.filePath;
                 form.setFieldsValue({ imageUrl });
                 setImagePreview(imageUrl.startsWith('http') ? imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${imageUrl}`);
                 message.success('Image uploaded successfully');
             } catch (error) {
                 message.error('Image upload failed');
                 console.error(error);
             }
        } else if (newFileList.length === 0) {
            form.setFieldsValue({ imageUrl: '' });
            setImagePreview('');
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/hero-slides/${id}`, values);
                message.success('Hero slide updated successfully');
            } else {
                await api.post('/hero-slides', values);
                message.success('Hero slide created successfully');
            }
            navigate('/hero-slides');
        } catch (error: any) {
            message.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} hero slide`);
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Card title={isEdit ? 'Edit Hero Slide' : 'Create Hero Slide'}>
             <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ order: 0, isActive: true }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input placeholder="Slide Title" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Subtitle"
                            name="subtitle"
                            rules={[{ required: true, message: 'Please input the subtitle!' }]}
                        >
                            <Input placeholder="Slide Subtitle" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="CTA Text"
                            name="ctaText"
                            rules={[{ required: true, message: 'Please input the CTA text!' }]}
                        >
                            <Input placeholder="e.g., Shop Now" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="CTA Link"
                            name="ctaLink"
                            rules={[{ required: true, message: 'Please input the CTA link!' }]}
                        >
                            <Input placeholder="e.g., /products" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Order"
                            name="order"
                            rules={[{ required: true, message: 'Please input the order!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Active"
                            name="isActive"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Image"
                            name="imageUrl"
                            rules={[{ required: true, message: 'Please upload an image!' }]}
                            hidden // Hide the actual input, use Upload component
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item label="Slide Image">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false} // Prevent auto upload by antd, handle manually
                                maxCount={1}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                    <Button onClick={() => navigate('/hero-slides')}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default HeroSlideForm;
