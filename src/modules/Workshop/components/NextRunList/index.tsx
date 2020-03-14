import { List } from "antd";
import round from "lodash/round";
import React from "react";
import styles from "./styles.less";

export type NextRun = {
  time: string;
  delta: number;
};

type Props = {
  nextRuns: NextRun[];
};

export default ({ nextRuns }: Props) => {
  if (nextRuns.length === 0) return null;

  return (
    <div className={styles.nextRun}>
      <div className={styles.desc}>
        Given the cron expression, the list below shows the next few runs and the time difference
        between each run. Note that each run has to have more than 5 minutes difference between
        them. This is done to prevent any tasks from choking the Nidavellir server.
      </div>
      <List
        bordered
        className={styles.list}
        dataSource={nextRuns}
        renderItem={item => (
          <List.Item key={item.time}>
            <List.Item.Meta
              title={
                <>
                  <b>Time</b>: {item.time}
                </>
              }
              description={
                <>
                  <b>Delta</b>: {round(item.delta, 2)} minutes
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
