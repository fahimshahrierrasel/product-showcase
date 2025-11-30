import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Drawer } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    ProductOutlined,
    TagsOutlined,
    FileImageOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/products',
            icon: <ProductOutlined />,
            label: 'Products',
        },
        {
            key: '/categories',
            icon: <TagsOutlined />,
            label: 'Categories',
        },
        {
            key: '/tags',
            icon: <TagsOutlined />,
            label: 'Tags',
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: 'Users',
        },
        {
            key: '/hero-slides',
            icon: <FileImageOutlined />,
            label: 'Hero Slides',
        },
    ];

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
        setMobileDrawerOpen(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    collapsedWidth="80"
                    onBreakpoint={(broken) => {
                        if (broken) {
                            setCollapsed(true);
                        }
                    }}
                >
                    <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={handleMenuClick}
                    />
                </Sider>
            )}

            {/* Mobile Drawer */}
            <Drawer
                placement="left"
                onClose={() => setMobileDrawerOpen(false)}
                open={mobileDrawerOpen}
                styles={{ body: { padding: 0 } }}
                width={250}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Drawer>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
                    {!isMobile ? (
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    ) : (
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setMobileDrawerOpen(true)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    )}
                    <div style={{ marginLeft: 'auto', marginRight: 16 }}>
                        Admin User
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
