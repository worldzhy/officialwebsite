import { FC, SVGProps } from "react";

const NavIcon: FC<SVGProps<any>> = (props) => (
  <svg
    width="48"
    height="35"
    viewBox="0 0 48 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="48" height="5" fill="white" />
    <rect y="16" width="48" height="5" fill="white" />
    <rect y="32" width="48" height="5" fill="white" />
  </svg>
);

export default NavIcon;
