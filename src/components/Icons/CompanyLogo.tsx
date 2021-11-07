import { SVGProps } from "react";

const CompanyLogo: React.FC<SVGProps<any>> = (props) => {
  return (
    <svg
      width="80"
      height="69"
      viewBox="0 0 80 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.3622 45.3016L59.3233 41.4L57.1233 36.6467L80 43.3714L39.7605 51.2571L0 43.3714L23.2951 36.4412L40.1616 0L56.9969 36.3737L40.5628 31.5428L23.6322 36.5796L21.4011 41.4L40.3622 45.3016ZM24.431 51.2572L39.7604 69.0001V55.2001L24.431 51.2572ZM55.0898 51.2572L39.7604 69.0001V55.2001L55.0898 51.2572Z"
        fill="white"
      />
    </svg>
  );
};

export default CompanyLogo;
