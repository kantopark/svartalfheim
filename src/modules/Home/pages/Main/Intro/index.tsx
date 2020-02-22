import Construction from "@/resources/construction-tools.svg";
import React from "react";
import styles from "./styles.less";

export default () => (
  <div className={styles.intro}>
    <div className={styles.image}>
      <img src={Construction} alt="construction" />
    </div>
    <div className={styles.content}>
      <p className={styles.title}>Nidavellir is a highly flexible job scheduler and task runner.</p>
      <p>
        It provides great flexibility by enabling users to specify the environment running the job
        using{" "}
        <a href="https://www.docker.com/" title="Docker" target="_blank" rel="noopener noreferrer">
          Docker
        </a>
        . This means that as long as the setup is done correctly, Nidavellir is agnostic to language
        and runtimes.
      </p>
      <p>More information and tutorial will be provided at a later date</p>
    </div>
  </div>
);
