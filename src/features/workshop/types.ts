export type Store = {
  sources: Record<number, Source>;
  jobs: Record<number, Job>;
  jobInfo: JobInfo;

  loading: {
    sources: LoadingState;
    jobs: LoadingState;
    jobInfo: LoadingState;
  };
};

export type Job = {
  id: number;
  sourceId: number;
  initTime: string;
  startTime: string;
  endTime: string;
  state: string;
  trigger: string;
};

export type JobInfo = Job & {
  logs: string;
  imageLogs: string;
  outputFiles: string[];
};

export type Secret = {
  id: number;
  sourceId: number;
  key: string;
  value: string;
};

export type Source = {
  id: number;
  name: string;
  repoUrl: string;
  cronExpr: string;
  state: string;
  nextTime: string;
  secrets: Secret[];
};
