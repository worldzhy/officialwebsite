import { FC, SVGProps } from "react";

const CompanyLogo: FC<SVGProps<any>> = (props) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40.3622 50.3016L59.3233 46.4L57.1233 41.6467L80 48.3714L39.7605 56.2571L0 48.3714L23.2951 41.4412L40.1616 5L56.9969 41.3737L40.5628 36.5428L23.6322 41.5796L21.4011 46.4L40.3622 50.3016ZM24.431 56.2572L39.7604 74.0001V60.2001L24.431 56.2572ZM55.0898 56.2572L39.7604 74.0001V60.2001L55.0898 56.2572Z"
      fill="white"
    />
  </svg>
);

export default CompanyLogo;
