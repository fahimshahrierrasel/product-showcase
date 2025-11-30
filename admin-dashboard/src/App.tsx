import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductList from './pages/products';
import ProductForm from './pages/products/ProductForm';
import CategoryList from './pages/categories';
import CategoryForm from './pages/categories/CategoryForm';
import TagList from './pages/tags';
import TagForm from './pages/tags/TagForm';
import UserList from './pages/users';
import UserForm from './pages/users/UserForm';
import HeroSlideList from './pages/hero-slides';
import HeroSlideForm from './pages/hero-slides/HeroSlideForm';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<div>Dashboard Home</div>} />

              <Route path="products" element={<ProductList />} />
              <Route path="products/create" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />

              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/create" element={<CategoryForm />} />
              <Route path="categories/edit/:id" element={<CategoryForm />} />

              <Route path="tags" element={<TagList />} />
              <Route path="tags/create" element={<TagForm />} />
              <Route path="tags/edit/:id" element={<TagForm />} />

              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<UserForm />} />
              <Route path="users/edit/:id" element={<UserForm />} />

              <Route path="hero-slides" element={<HeroSlideList />} />
              <Route path="hero-slides/create" element={<HeroSlideForm />} />
              <Route path="hero-slides/edit/:id" element={<HeroSlideForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
