import { FC, SVGProps } from "react";

const Category: FC<SVGProps<any>> = (props) => (
  <svg viewBox="0 0 17 17" fill="currentColor" {...props}>
    <rect width="3" height="3" fill="currentColor" />
    <rect y="7" width="3" height="3" fill="currentColor" />
    <rect y="14" width="3" height="3" fill="currentColor" />
    <rect x="7" width="3" height="3" fill="currentColor" />
    <rect x="7" y="7" width="3" height="3" fill="currentColor" />
    <rect x="7" y="14" width="3" height="3" fill="currentColor" />
    <rect x="14" width="3" height="3" fill="currentColor" />
    <rect x="14" y="7" width="3" height="3" fill="currentColor" />
    <rect x="14" y="14" width="3" height="3" fill="currentColor" />
  </svg>
);

export default Category;
