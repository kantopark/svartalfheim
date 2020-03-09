import Logo from "@/resources/logo.svg";
import { Layout, Typography } from "antd";
import React from "react";
import styles from "./styles.less";

const { Title, Paragraph } = Typography;

export default () => (
  <Layout.Footer className={styles.footer}>
    <div className={styles.logoContainer}>
      <img src={Logo} alt="logo" className={styles.logo} />
    </div>

    <Title level={3} className={styles.subtitle}>
      © {getCopyRightYear()} Nidavellir - Svartalfheim
    </Title>
    <Paragraph className={styles.text}>
      Developed and maintained by GIC's EIS Technology Group for the Tech folks.
    </Paragraph>
  </Layout.Footer>
);

function getCopyRightYear() {
  const currentYear = new Date().getFullYear();

  return currentYear === 2020 ? currentYear.toString() : `2020 - ${currentYear}`;
}
