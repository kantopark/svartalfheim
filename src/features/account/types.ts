export type Store = {
  currentUser?: Account;

  status: {
    currentUser: LoadingState;
  };
};

export type Account = {
  id: number;
  username: string;
  password?: string;
  isAdmin: boolean;
};

export type AccountValidatePayload = Required<Pick<Account, "username" | "password">>;
