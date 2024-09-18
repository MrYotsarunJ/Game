"use client"; // Add this at the top

import { Layout, Menu } from "antd";
import Link from "next/link";
import "antd/dist/reset.css"; // Ensure Ant Design styles are loaded
import 'styles/globals.css';


const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: '1',
    label: <Link href="/">Home</Link>,
  },
 
  {
    key: '2',
    label: <Link href="/game">Mini game</Link>,
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={menuItems} />
          </Header>
          <Content className="content">
            <div className="main-container bordered">{children}</div>
          </Content>
          <Footer className="text-align-center">
            ©2024 Created with Ant Design
          </Footer>
        </Layout>
      </body>
    </html>
  );
}
