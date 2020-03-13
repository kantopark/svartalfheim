import { AccountSelector } from "@/features/account";
import { fetchSourcesAsync } from "@/features/workshop/action";
import { formPath } from "@/libs";
import { MODULE_PREFIX } from "@/modules/Workshop/constants";
import AddSourceForm from "@/modules/Workshop/pages/AddSource";
import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { path } from "./constants";
import SourceList from "./SourceList";
import styles from "./styles.less";

const SourcePage = () => {
  const isSignedIn = useSelector(AccountSelector.isSignedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSignedIn) dispatch(fetchSourcesAsync.request());
  }, [dispatch, isSignedIn]);

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
  path,
  title: "Sources"
} as ModuleRoute;
