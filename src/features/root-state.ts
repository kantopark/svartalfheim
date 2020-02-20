import { AccountType } from "@/features/account";
import { WorkshopType } from "@/features/workshop";
import { RouterState } from "connected-react-router";

type RootState = {
  account: AccountType.Store;
  workshop: WorkshopType.Store;
  router: RouterState;
};

export default RootState;
