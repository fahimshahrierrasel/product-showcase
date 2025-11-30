import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const TagForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchTag();
        }
    }, [id]);

    const fetchTag = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/tags/${id}`);
            form.setFieldsValue(response.data);
        } catch (error) {
            message.error('Failed to fetch tag');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/tags/${id}`, values);
                message.success('Tag updated successfully');
            } else {
                await api.post('/tags', values);
                message.success('Tag created successfully');
            }
            navigate('/tags');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title={isEdit ? 'Edit Tag' : 'Create Tag'}>
            {loading && isEdit && !form.getFieldValue('name') ? (
                <Spin />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter tag name' }]}
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tags')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default TagForm;
