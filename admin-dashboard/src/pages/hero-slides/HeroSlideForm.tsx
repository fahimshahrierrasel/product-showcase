import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Switch, InputNumber, message, Image } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const HeroSlideForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
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
        } catch (error) {
            message.error('Failed to fetch hero slide');
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setImagePreview(url);
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

    return (
        <div>
            <h2>{isEdit ? 'Edit Hero Slide' : 'Create Hero Slide'}</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ order: 0, isActive: true }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Subtitle"
                        name="subtitle"
                        rules={[{ required: true, message: 'Please input the subtitle!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="imageUrl"
                        rules={[
                            { required: true, message: 'Please input the image URL!' },
                            { type: 'url', message: 'Please enter a valid URL!' }
                        ]}
                    >
                        <Input onChange={handleImageUrlChange} placeholder="https://example.com/image.jpg" />
                    </Form.Item>

                    {imagePreview && (
                        <Form.Item label="Image Preview">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'cover' }}
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="CTA Text"
                        name="ctaText"
                        rules={[{ required: true, message: 'Please input the CTA text!' }]}
                    >
                        <Input placeholder="e.g., Shop Now" />
                    </Form.Item>

                    <Form.Item
                        label="CTA Link"
                        name="ctaLink"
                        rules={[{ required: true, message: 'Please input the CTA link!' }]}
                    >
                        <Input placeholder="e.g., /products" />
                    </Form.Item>

                    <Form.Item
                        label="Order"
                        name="order"
                        rules={[{ required: true, message: 'Please input the order!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Active"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

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
        </div>
    );
};

export default HeroSlideForm;
