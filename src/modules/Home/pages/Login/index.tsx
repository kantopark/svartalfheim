import { validateAccount } from "@/features/account/action";
import { useRootSelector } from "@/infra/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.less";

const FormItem = Form.Item;
const { Paragraph } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const status = useRootSelector(s => s.account.status.currentUser);

  return (
    <Row className={styles.container}>
      <Col xs={24} sm={12} lg={8}>
        <h2>Login</h2>
        <Form name="LoginForm" className={styles.loginForm} onFinish={login}>
          <FormItem
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </FormItem>

          <FormItem>
            <Button
              loading={status === "REQUEST"}
              type="primary"
              htmlType="submit"
              className={styles.submit}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </Col>
      {status === "FAILURE" && (
        <Col span={24}>
          <Paragraph type="danger">
            Invalid credentials. Please check that you've put in the right values.
          </Paragraph>
        </Col>
      )}
    </Row>
  );

  function login(payload: any) {
    dispatch(validateAccount.request({ ...payload, to: "/" }));
  }
};

export default {
  component: LoginPage,
  path: "/login",
  title: "Log in"
} as ModuleRoute;
