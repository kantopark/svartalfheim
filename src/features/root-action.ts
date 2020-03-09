import { AccountAction } from "@/features/account";
import { WorkshopAction } from "@/features/workshop";
import { AnyAction } from "redux";

import { ActionType } from "typesafe-actions";

type AllActions = AnyAction | ActionType<typeof WorkshopAction> | ActionType<typeof AccountAction>;

export default AllActions;
