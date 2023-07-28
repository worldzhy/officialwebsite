import { AppLayout } from "../types";

const imagePath = "https://officialwebsite-067174804713.s3.amazonaws.com/images/";
const animationPath = "https://officialwebsite-067174804713.s3.amazonaws.com/animation/";

const mockData: AppLayout = {
  headers: {
    logo: `${imagePath}logo-white.png`,
    name: "InceptionPad",
    items: [
      { label: "What We Do", path: "/home" },
      { label: "Case Study", path: "/case" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
  contents: {
    contact: {
      resultTips: {
        Success: "Congratulations! Submit Success",
        Failed: "Oops! Submit Failed",
      },
      form: {
        name: {
          label: "Your Name",
          inputProps: { placeholder: "E.g. John Smith", required: true },
        },
        email: {
          label: "Email Address",
          inputProps: {
            placeholder: "E.g. j.smith@hotmail.com",
            type: "email",
            required: true,
          },
        },
        phone: {
          label: "Mobile Phone",
          inputProps: {
            placeholder: "Your preferred mobile phone number",
            type: "tel",
          },
        },
        desc: {
          label: "Your ideas",
          inputProps: {
            placeholder: "Tell us about your project or any bold ideas",
          },
        },
      },
      title: "Send Inquiry",
      subTitle:
        "Please fill out the form on the right so that we can be prepared before contacting you",
      companyInfo: {
        summary: "We are located in Baltimore, USA and Chengdu, China",
        list: [
          {
            city: "Baltimore",
            country: "USA",
            image: `${imagePath}contact-1212.png`,
          },
          {
            city: "Chengdu",
            country: "China",
            image: `${imagePath}contact-1213.png`,
          },
        ],
      },
    },
    home: {
      videos: [
        {
          texts: {
            heading: ["Handcrafting Digital Innovation"],
            subtitle: ["We develop enterprise-grade web and mobile apps"],
          },
          position: "center",
          video: {
            current: `${imagePath}page-00-00.mp4`,
            transition: `${imagePath}page-00-01.mp4`,
            mobileCurrent: `${animationPath}page-00-00_bmp.pag`,
            mobileTransition: `${animationPath}page-00-01_bmp.pag`,
          },
        },
        {
          texts: {
            heading: [
              "Develop your MVP in weeks",
              "with our EFFICIENT design",
              "and development process",
            ],
          },
          position: "left",
          video: {
            current: `${imagePath}page-01-01.mp4`,
            transition: `${imagePath}page-01-02.mp4`,
            reverse: `${imagePath}page-00-01_reverse.mp4`,
            mobileCurrent: `${animationPath}page-01-01_bmp.pag`,
            mobileTransition: `${animationPath}page-01-02_bmp.pag`,
            mobileReverse: `${animationPath}page-00-01_back_bmp.pag`,
          },
        },
        {
          texts: {
            heading: [
              "Enjoy the QUALITY of building",
              "with enterprise-grade micro-services",
              "and validated open source packages",
            ],
          },
          position: "left",
          video: {
            current:
              `${imagePath}page-02-02.mp4`,
            transition:
              `${imagePath}page-02-03.mp4`,
            reverse:
              `${imagePath}page-01-02_reverse.mp4`,
            mobileCurrent: `${animationPath}page-02-02_bmp.pag`,
            mobileTransition: `${animationPath}page-02-03_bmp.pag`,
            mobileReverse: `${animationPath}page-01-02_back_bmp.pag`,
          },
        },
        {
          texts: {
            heading: [
              "Get peace of mind with a partner",
              "that has a proven track record",
              "of RELIABILTY and SECURITY",
            ],
          },
          // text: "Get peace of mind with a partner that has a proven track record of RELIABILTY and SECURITY.",
          position: "left",
          video: {
            current:
              `${imagePath}page-03-03.mp4`,
            reverse:
              `${imagePath}page-02-03_reverse.mp4`,
            mobileCurrent: `${animationPath}page-03-03_bmp.pag`,
            mobileReverse: `${animationPath}page-02-03_back_bmp.pag`,
          },
        },
      ],
      carousels: {
        backgroundImage: `${imagePath}testimonials/bill-kapner-bg.png`,
        contents: [
          {
            name: "Bill Kapner",
            avatar: `${imagePath}testimonials/bill-kapner-avatar.png`,
            title: "Founder and Chairman",
            companyName: "TitanHouse Inc",
            brandingColor: "#FFD700",
            description:
              "I have worked with many development firms in the past.  InceptionPad is clearly a cut above the rest.  Henry and the rest of the talented team are super responsive and always help me find the most efficient way to implement my business vision.",
          },
          {
            name: "Chris Nickerson",
            avatar: `${imagePath}testimonials/chris-nickerson-avatar.jpeg`,
            title: "CEO, Managing Partner",
            companyName: "Pinpoint LLC",
            brandingColor: "#A2CD5A",
            description:
              "I have worked with many development firms in the past.  InceptionPad is clearly a cut above the rest.  Henry and the rest of the talented team are super responsive and always help me find the most efficient way to implement my business vision.",
          },
          {
            name: "Thomas Wear",
            avatar: `${imagePath}testimonials/thomas-wear-avatar.jpeg`,
            title: "Partner and Strategy Officer",
            companyName: "Atmosphere Inc",
            brandingColor: "#20B2AA",
            description:
              "I have worked with many development firms in the past.  InceptionPad is clearly a cut above the rest.  Henry and the rest of the talented team are super responsive and always help me find the most efficient way to implement my business vision.",
          },
        ],
      },
    },
    cases: [
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#0559AF",
        image: "images/case-template.png",
        thumbImage: `${imagePath}case-171346.png`,
        id: "1",
        tags: ["Big Data", "AI"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#DDA71B",
        image: "images/case-template.png",
        thumbImage: `${imagePath}case-181212.png`,
        id: "2",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image: "images/case-template.png",
        thumbImage: `${imagePath}case-181213.png`,
        id: "3",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#56F58D",
        image: "images/case-template.png",
        thumbImage: `${imagePath}case-181214.png`,
        id: "4",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image: "images/case-template.png",
        thumbImage: `${imagePath}case-181215.png`,
        id: "5",
        tags: ["Big Data"],
      },
    ],
  },
};

export default mockData;
