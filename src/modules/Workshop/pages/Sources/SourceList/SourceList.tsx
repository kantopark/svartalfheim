import { WorkshopSelector } from "@/features/workshop";
import { deleteSourceAsync } from "@/features/workshop/action";
import { useRootSelector } from "@/infra/hooks";
import { Avatar, Button, List, Popconfirm } from "antd";
import Fuse from "fuse.js";
import React from "react";
import { useDispatch } from "react-redux";
import { useQueryContext } from "./hooks";
import styles from "./styles.less";

const colors = [
  "#f5222d",
  "#fa541c",
  "#fa8c16",
  "#faad14",
  "#d4b106",
  "#a0d911",
  "#52c41a",
  "#13c2c2",
  "#1890ff",
  "#2f54eb",
  "#722ed1",
  "#eb2f96"
];

export default () => {
  const dispatch = useDispatch();
  const data = useDataSource();

  return (
    <List
      itemLayout="horizontal"
      size="large"
      pagination={{ pageSize: 5 }}
      dataSource={data}
      renderItem={(item, i) => {
        const tableItems = [
          { name: "Cron Expression", value: item.cronExpr },
          { name: "Repo URL", value: item.repoUrl },
          { name: "Next Run Time", value: item.nextTime.replace(/[TZ]/g, " ") }
        ];
        return (
          <List.Item
            key={item.id}
            actions={[
              <Button>Update</Button>,
              <Popconfirm
                title="Are you sure you want to delete this source?"
                onConfirm={() => dispatch(deleteSourceAsync.request(item.id))}
                placement="topRight"
                okText="Yes"
                okType="danger"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: colors[i] }}>{item.name[0].toUpperCase()}</Avatar>
              }
              title={<div className={styles.title}>{item.name}</div>}
              description={
                <table>
                  <tbody>
                    {tableItems.map(({ name, value }) => (
                      <tr key={name}>
                        <td style={{ paddingRight: 14 }}>
                          <b>{name}</b>
                        </td>
                        <td>
                          {name === "Repo URL" ? (
                            <a href={value} target="_blank" rel="noreferrer noopener">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

const useDataSource = () => {
  const { query } = useQueryContext();
  const sources = useRootSelector(WorkshopSelector.sources);

  if (query.trim() === "") return sources;
  const fuse = new Fuse(sources, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "repoUrl"]
  });

  return fuse.search(query);
};
