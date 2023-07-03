"use client";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Dropdown } from "antd";
import { useState, useContext } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;
const items = [
  {
    key: "1",
    label: (
      <span
        onClick={() => {
          console.log("12");
        }}
      >
        退出
      </span>
    ),
  },
];

const Index = (props) => {
  const pathname = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState(pathname);

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Link href="/">
          <div
            onClick={() => {
              setCurrent(null);
            }}
            className={styles.logo}
          >
            joke工作台
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          items={[
            {
              key: "/type",
              icon: <UserOutlined />,
              label: <Link href="/type">类型列表</Link>,
            },
          ]}
          onClick={(e) => {
            setCurrent(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <Dropdown className={styles.dropbtn} menu={{ items }} placement="bottom">
            <Avatar size={50} icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Index;
