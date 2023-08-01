import { FC, SVGProps } from "react";

const DownArrow: FC<SVGProps<any>> = (props) => (
  <svg
    width="29"
    height="16"
    viewBox="0 0 29 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1 1L14.5 14L28 1" stroke="white" stroke-width="2" />
  </svg>
);

export default DownArrow;
