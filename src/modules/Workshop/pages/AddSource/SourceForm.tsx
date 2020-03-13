import { createSourceAsync } from "@/features/workshop/action";
import { Source } from "@/features/workshop/types";
import { api } from "@/infra/api";
import { formPath } from "@/libs";
import { MODULE_PREFIX } from "@/modules/Workshop/constants";
import { path as sourcePath } from "@/modules/Workshop/pages/Sources/constants";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { NextRun, useSourceContext } from "./hooks";
import styles from "./styles.less";

const FormItem = Form.Item;

type CronOutput = {
  errors: string[];
  nextRuns: NextRun[];
};

type FormOutput = Pick<Source, "name" | "repoUrl" | "cronExpr">;

export default () => {
  const { setNextRuns } = useSourceContext();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  return (
    <Form
      name="add-source"
      layout="vertical"
      form={form}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 }
      }}
      onFinish={v =>
        dispatch(
          createSourceAsync.request({
            ...(v as FormOutput),
            to: formPath(MODULE_PREFIX, sourcePath)
          })
        )
      }
    >
      <FormItem
        name="name"
        label="Source Name"
        rules={[
          { required: true, message: "Name cannot be empty" },
          {
            validator: async (_, name) => {
              const {
                data: { exists }
              } = await api.get<{ exists: boolean }>(`validate/source/exists/${name}`);

              return exists ? Promise.reject(`${name} is already taken`) : Promise.resolve();
            },
            validateTrigger: "onBlur"
          }
        ]}
        required={true}
      >
        <Input placeholder="My Source Name" />
      </FormItem>
      <FormItem
        name="repoUrl"
        label="Repo Url"
        rules={[
          { required: true, message: "Repo URL cannot be empty" },
          {
            validator: (_, value) => {
              if (typeof value === "string" && !/^https?:\/\/\S+$/.test(value))
                return Promise.reject("value must be a valid url to the git's remote repository");
              return Promise.resolve();
            }
          }
        ]}
        required={true}
      >
        <Input placeholder="https://github.com/..." />
      </FormItem>

      <FormItem
        name="cronExpr"
        label="Cron Expression"
        rules={[
          { required: true, message: "Cron expression cannot be empty" },
          {
            validator: async (_, expression) => {
              if (!expression || !expression.trim()) {
                return Promise.reject();
              }

              const {
                data: { errors, nextRuns }
              } = await api.post<CronOutput>("validate/source/cron", {
                expression
              });
              if (errors.length > 0) {
                setNextRuns([]);
                return Promise.reject(errors.join("\n"));
              }
              setNextRuns(nextRuns);
              return Promise.resolve();
            }
          }
        ]}
        required={true}
        extra={
          <small>
            For more information on how to form a cron expression, check the{" "}
            <a
              href="https://github.com/kantopark/cronexpr"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>{" "}
            out
          </small>
        }
        validateTrigger="onBlur"
      >
        <Input placeholder="0 30 9 * * * *" />
      </FormItem>

      <FormItem className={styles.submit}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};
