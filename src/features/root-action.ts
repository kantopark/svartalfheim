import { AccountAction } from "@/features/account";
import { WorkshopAction } from "@/features/workshop";

import { ActionType } from "typesafe-actions";

type AllActions = ActionType<typeof WorkshopAction> | ActionType<typeof AccountAction>;

export default AllActions;
