import clsx from "clsx";
import { FC } from "react";
import styles from "./style";
import { ContainerWrapperType } from "./types";

const ContainerWrapper: FC<ContainerWrapperType> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div className={clsx(styles.root, className)}>
      {children}
    </div>
  );
};

export default ContainerWrapper;
