import Logo from "@/resources/logo.svg";
import { Layout } from "antd";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RightMenu from "./RightMenu";
import styles from "./styles.less";

export default () => {
  const dispatch = useDispatch();

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          <img src={Logo} alt="Nidavellir" className={styles.logo} onClick={() => goto("/")} />
          <Link className={styles.text} to="/">
            Nidavellir
          </Link>
        </div>
        <RightMenu />
      </div>
    </Layout.Header>
  );

  function goto(path: string) {
    dispatch(push(path));
  }
};
