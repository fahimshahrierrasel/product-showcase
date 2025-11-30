import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

const { Title } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.post('/users/login', values);
            const { user, token } = response.data;
            login(user, token);
            message.success('Login successful');
            navigate('/');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <Card style={{ width: 300 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3}>Admin Login</Title>
                </div>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
