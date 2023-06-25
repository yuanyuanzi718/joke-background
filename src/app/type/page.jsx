"use client";
import { PlusOutlined } from "@ant-design/icons";
import { ProCard, ProDescriptions, ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, message, Space, Tabs, Tag } from "antd";
import { useState, Suspense, useEffect } from "react";
import request from "umi-request";
import Edit from "./edit";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 64,
    valueType: "indexBorder",
  },
  {
    title: "标题",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    title: "状态",
    dataIndex: "state",
    initialValue: "all",
    filters: true,
    onFilter: true,
    valueType: "select",
    valueEnum: {
      all: { text: "全部", status: "Default" },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
      },
    },
  },
  {
    title: "标签",
    dataIndex: "labels",
    width: 120,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "操作",
    valueType: "option",
    dataIndex: "id",
    render: (text, row) => (
      <Space wrap>
        <Button type="link">更新</Button>
        <Button type="link">删除</Button>
        <Button type="link">下线</Button>
      </Space>
    ),
    // <TableDropdown
    //   key="more"
    //   onSelect={(key) => message.info(key)}
    //   menus={[
    //     { key: "copy", name: "复制" },
    //     { key: "delete", name: "删除" },
    //   ]}
    // />,
  },
];

const Type = () => {
  const [showChild, setShowChild] = useState(false);
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const openEdit = () => {
    setOpen(true);
  };

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <Suspense fallback={<p>Loading feed...</p>}>
        <ProTable
          columns={columns}
          request={async (params = {}) => {
            const res = await request("https://proapi.azurewebsites.net/github/issues", {
              params,
            });
            return res;
          }}
          pagination={{
            pageSize: 5,
          }}
          rowKey="id"
          dateFormatter="string"
          headerTitle="查询 Table"
          toolBarRender={() => [
            <Button
              key="3"
              type="primary"
              onClick={() => {
                openEdit();
              }}
            >
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
        <Edit
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Suspense>
    );
  }
};

export default Type;
