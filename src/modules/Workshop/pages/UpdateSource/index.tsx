import { WorkshopSelector } from "@/features/workshop";
import { formPath } from "@/libs";
import NextRunsList, { NextRun } from "@/modules/Workshop/components/NextRunList";
import { MODULE_PREFIX } from "@/modules/Workshop/constants";
import { path as sourcePath } from "@/modules/Workshop/pages/Sources/constants";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import SourceForm from "./SourceForm";
import styles from "./styles.less";

type Props = RouteComponentProps<{ id?: string }> & {};

const workshopPage = formPath(MODULE_PREFIX, sourcePath);

const UpdateSourceForm: FC<Props> = ({ match: { params } }) => {
  const [nextRuns, setNextRuns] = useState<NextRun[]>([]);
  const id = parseInt(params.id ?? "");
  const source = useSelector(WorkshopSelector.source(id));

  if (source === undefined) {
    return <Redirect to={workshopPage} />;
  }

  return (
    <div className={styles.container}>
      <h2>Update Source </h2>
      <SourceForm setNextRuns={setNextRuns} source={source} />
      <NextRunsList nextRuns={nextRuns} />
    </div>
  );
};

export default {
  component: withRouter(UpdateSourceForm),
  path: "/sources/update/:id",
  title: "Update Source"
} as ModuleRoute;
