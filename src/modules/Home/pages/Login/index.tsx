import { validateAccount } from "@/features/account/action";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { push } from "connected-react-router";

import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.less";

const FormItem = Form.Item;

const LoginPage = () => {
  const dispatch = useDispatch();

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
            <Button type="primary" htmlType="submit" className={styles.submit}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  );

  function login(payload: any) {
    dispatch(validateAccount.request(payload));
    dispatch(push("/"));
  }
};

export default {
  component: LoginPage,
  path: "/login",
  title: "Log in"
} as ModuleRoute;
