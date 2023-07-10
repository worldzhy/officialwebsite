import { FC, SVGProps } from "react";

const CloseIcon: FC<SVGProps<any>> = (props) => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 2L53 53" stroke="white" stroke-width="3" />
    <path d="M53 2L2 53" stroke="white" stroke-width="3" />
  </svg>
);

export default CloseIcon;
