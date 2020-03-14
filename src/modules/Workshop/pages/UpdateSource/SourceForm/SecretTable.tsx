import { Secret } from "@/features/workshop/types";
import { MinusCircleOutlined, PlusCircleOutlined, RollbackOutlined } from "@ant-design/icons/lib";
import { Button, Col, Input, Row } from "antd";
import React, { ChangeEvent } from "react";
import { useSecretContext } from "./hooks";
import styles from "./styles.less";

type Props = {
  sourceId: number;
  original: Secret[];
};

export default ({ sourceId, original }: Props) => {
  const { secrets, setSecrets } = useSecretContext();
  const addSecret = () => setSecrets(prev => [...prev, { key: "", value: "", sourceId, id: 0 }]);

  return (
    <div className={styles.secretTable}>
      {secrets.length > 0 ? (
        <SecretTable original={original} sourceId={sourceId} />
      ) : (
        <div>
          No secrets yet...{" "}
          <Button type="link" onClick={addSecret}>
            Add some?
          </Button>
        </div>
      )}
    </div>
  );
};

const SecretTable = ({ original, sourceId }: Props) => {
  const { secrets, setSecrets } = useSecretContext();

  const addSecret = () =>
    setSecrets(prev => [...prev, { key: "", value: "", sourceId, id: -prev.length }]);

  const onChange = (id: number, action: "key" | "value") => (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    switch (action) {
      case "key":
        setSecrets(prev => prev.map(e => (e.id === id ? { ...e, key: v } : e)));
        break;
      case "value":
        setSecrets(prev => prev.map(e => (e.id === id ? { ...e, value: v } : e)));
        break;
    }
  };

  const remove = (id: number) => () => setSecrets(s => s.filter(e => e.id !== id));

  const reset = () => setSecrets(original);

  return (
    <>
      <Row gutter={16}>
        <Col span={10}>
          <b>Key</b>
        </Col>
        <Col span={10}>
          <b>Value</b>
        </Col>
        <Col span={4} />
      </Row>
      {secrets.map(s => (
        <Row gutter={16} key={s.id} className={styles.secretRow}>
          <Col span={10}>
            <Input value={s.key} onChange={onChange(s.id, "key")} />
          </Col>
          <Col span={10}>
            <Input.Password value={s.value} onChange={onChange(s.id, "value")} />
          </Col>
          <Col span={4}>
            <Button onClick={remove(s.id)} icon={<MinusCircleOutlined />} />
          </Col>
        </Row>
      ))}

      <Row className={styles.actions}>
        <Button icon={<PlusCircleOutlined />} onClick={addSecret}>
          Add Secret
        </Button>
        <Button onClick={reset} icon={<RollbackOutlined />}>
          Reset
        </Button>
      </Row>
    </>
  );
};
