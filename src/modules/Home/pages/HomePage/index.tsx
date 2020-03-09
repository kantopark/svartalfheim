import { Divider } from "antd";
import React from "react";
import Intro from "./Intro";
import styles from "./styles.less";

const HomePage = () => (
  <div className={styles.main}>
    <div className={styles.title}>Nidavellir</div>
    <Divider />
    <Intro />
    <Divider />
  </div>
);

export default {
  component: HomePage,
  path: "/",
  title: "Home Page"
} as ModuleRoute;
