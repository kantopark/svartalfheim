import { updateSourceAsync } from "@/features/workshop/action";
import { Secret, Source } from "@/features/workshop/types";
import { api } from "@/infra/api";
import { formPath } from "@/libs";
import { NextRun } from "@/modules/Workshop/components/NextRunList";
import { MODULE_PREFIX } from "@/modules/Workshop/constants";
import { path as sourcePath } from "@/modules/Workshop/pages/Sources/constants";
import { Button, Divider, Form, Input } from "antd";
import { push } from "connected-react-router";
import clone from "lodash/cloneDeep";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SecretContext } from "./hooks";
import SecretTable from "./SecretTable";
import styles from "./styles.less";

type CronOutput = {
  errors: string[];
  nextRuns: NextRun[];
};

const { Item: FormItem } = Form;
const workshopPage = formPath(MODULE_PREFIX, sourcePath);

type Props = {
  setNextRuns: (nextRuns: NextRun[]) => void;
  source: Source;
};

export default ({ setNextRuns, source }: Props) => {
  const [secrets, setSecrets] = useState<Secret[]>(clone(source.secrets));
  const dispatch = useDispatch();

  return (
    <SecretContext.Provider value={{ secrets, setSecrets }}>
      <Form
        name="add-source"
        layout="vertical"
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 12 }
        }}
        onFinish={v =>
          dispatch(
            updateSourceAsync.request({
              ...source,
              ...(v as Source),
              secrets: secrets
                .map(e => (e.id < 0 ? { ...e, id: 0 } : e))
                .map(({ key, value, ...rest }) => ({
                  ...rest,
                  key: key.trim(),
                  value: value.trim()
                }))
                .filter(e => !!e.key && !!e.value),
              to: workshopPage
            })
          )
        }
        initialValues={source}
      >
        <FormItem
          name="name"
          label="Source Name"
          rules={[
            { required: true, message: "Name cannot be empty" },
            {
              validator: async (_, name: string) => {
                if (name.trim() === source.name) return Promise.resolve();

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

        <FormItem label="Secrets">
          <SecretTable original={source.secrets} sourceId={source.id} />
        </FormItem>

        <Divider />

        <FormItem className={styles.submit}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button onClick={() => dispatch(push(workshopPage))}>Back</Button>
        </FormItem>
      </Form>
    </SecretContext.Provider>
  );
};
