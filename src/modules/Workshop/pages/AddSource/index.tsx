import React, { useState } from "react";
import NextRunsList, { NextRun } from "../../components/NextRunList";

import SourceForm from "./SourceForm";

import styles from "./styles.less";

const AddSourceForm = () => {
  const [nextRuns, setNextRuns] = useState<NextRun[]>([]);

  return (
    <div className={styles.container}>
      <h2>New Source</h2>
      <SourceForm setNextRuns={setNextRuns} />
      <NextRunsList nextRuns={nextRuns} />
    </div>
  );
};

export default {
  component: AddSourceForm,
  path: "/sources/add",
  title: "Add Source"
} as ModuleRoute;
