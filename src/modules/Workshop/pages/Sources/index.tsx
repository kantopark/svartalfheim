import { fetchSourcesAsync } from "@/features/workshop/action";
import { formPath } from "@/libs";
import { MODULE_PREFIX } from "@/modules/Workshop/constants";
import AddSourceForm from "@/modules/Workshop/pages/AddSource";
import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SourceList from "./SourceList";
import styles from "./styles.less";

const SourcePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSourcesAsync.request());
  }, [dispatch]);

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.text}>Sources</div>
        <div className={styles.addButton}>
          <Button size="large" type="primary">
            <Link to={formPath(MODULE_PREFIX, AddSourceForm.path)}>New Sources</Link>
          </Button>
        </div>
      </div>
      <SourceList />
    </div>
  );
};

export default {
  component: SourcePage,
  path: "/sources",
  title: "Sources"
} as ModuleRoute;
