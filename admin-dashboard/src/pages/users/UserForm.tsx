import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Select, Switch, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const { Option } = Select;

const UserForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await api.get(`/users/${id}`);
            form.setFieldsValue(response.data);
        } catch (error) {
            message.error('Failed to fetch user');
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (isEdit) {
                // Don't send password if it's empty during edit
                const updateData = { ...values };
                if (!updateData.password) {
                    delete updateData.password;
                }
                await api.put(`/users/${id}`, updateData);
                message.success('User updated successfully');
            } else {
                await api.post('/users/register', values);
                message.success('User created successfully');
            }
            navigate('/users');
        } catch (error: any) {
            message.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ role: 'editor', isActive: true }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input the email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: !isEdit, message: 'Please input the password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password placeholder={isEdit ? 'Leave blank to keep current password' : ''} />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select>
                            <Option value="admin">Admin</Option>
                            <Option value="editor">Editor</Option>
                        </Select>
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
                        <Button onClick={() => navigate('/users')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UserForm;
