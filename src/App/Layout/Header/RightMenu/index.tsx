import { AccountAction, AccountSelector } from "@/features/account";
import { useRootSelector, useRouter } from "@/infra/hooks";
import { formPath } from "@/libs";
import LoginDetails from "@/modules/Home/pages/Login";
import { UserOutlined } from "@ant-design/icons/lib";
import { Button, Menu } from "antd";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.less";

const { SubMenu, Item: MenuItem } = Menu;

export default () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter().location;
  const isSignedIn = useRootSelector(AccountSelector.isSignedIn);
  const loginPath = formPath("/", LoginDetails.path);

  return (
    <div>
      {isSignedIn ? (
        <UserMenu />
      ) : (
        <Button
          className={styles.link}
          onClick={() => dispatch(push(loginPath))}
          type="link"
          disabled={pathname === loginPath}
        >
          Login
        </Button>
      )}
    </div>
  );
};

// User menu when signed in
const UserMenu = () => {
  const dispatch = useDispatch();
  const { username } = useRootSelector(AccountSelector.user);

  return (
    <Menu mode="horizontal" className={styles.userMenu}>
      <SubMenu
        className={styles.subMenu}
        title={
          <div className={styles.title}>
            <UserOutlined />
            {username}
          </div>
        }
      >
        <MenuItem key="logout" onClick={logout}>
          Logout
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  function logout() {
    dispatch(AccountAction.logout.request());
    dispatch(push("/"));
  }
};
