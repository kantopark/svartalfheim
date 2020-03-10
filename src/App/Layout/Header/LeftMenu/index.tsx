import { AccountSelector } from "@/features/account";
import { useRootSelector } from "@/infra/hooks";
import { Menu } from "antd";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import contents from "./contents";
import styles from "./styles.less";

const { SubMenu, Item: MenuItem } = Menu;

export default () => {
  const dispatch = useDispatch();
  const isSignedIn = useRootSelector(AccountSelector.isSignedIn);

  if (!isSignedIn) {
    return null;
  }
  return (
    <Menu mode="horizontal" className={styles.leftMenu} selectedKeys={[]}>
      {contents.map(e =>
        (e.children ?? []).length === 0 ? (
          <MenuItem key={e.title} onClick={goto(e.path)}>
            {e.title}
          </MenuItem>
        ) : (
          <SubMenu key={e.title} onTitleClick={goto(e.path)} title={e.title}>
            {e.children?.map(x => (
              <MenuItem key={`${e.title}:${x.title}`} onClick={goto(x.path)}>
                {x.title}
              </MenuItem>
            ))}
          </SubMenu>
        )
      )}
    </Menu>
  );

  function goto(path: string) {
    return () => dispatch(push(path));
  }
};
