import React, { useState } from "react";
import { NextRun, SourceContext } from "./hooks";
import NextRunsList from "./NextRunsList";
import SourceForm from "./SourceForm";

import styles from "./styles.less";

const AddSourceForm = () => {
  const [nextRuns, setNextRuns] = useState<NextRun[]>([]);

  return (
    <SourceContext.Provider value={{ nextRuns, setNextRuns }}>
      <div className={styles.container}>
        <h2>New Source</h2>
        <SourceForm />
        <NextRunsList />
      </div>
    </SourceContext.Provider>
  );
};

export default {
  component: AddSourceForm,
  path: "/sources/add",
  title: "Add Source"
} as ModuleRoute;
