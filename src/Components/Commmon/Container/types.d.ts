import { AccountInfoType } from "../../Payout/types";

export interface ContainerWrapperType {
  children: JSX.Element;
  className?: string;
}

export interface AccountInfoStoreType {
  payout: {
    data: {
      data: AccountInfoType
    }
  }
}
