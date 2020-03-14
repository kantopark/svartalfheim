import { Secret } from "@/features/workshop/types";
import { createContext, useContext } from "react";

export const SecretContext = createContext<{
  secrets: Secret[];
  setSecrets: (s: Secret[] | ((prevState: Secret[]) => Secret[])) => void;
}>({
  secrets: [],
  setSecrets: () => {}
});

export const useSecretContext = () => useContext(SecretContext);
