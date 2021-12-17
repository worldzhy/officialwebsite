import { AppLayout } from "../types";

const mockData: AppLayout = {
  headers: {
    logo: "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/logo-white.png",
    name: "InceptionPad",
    items: [
      { label: "What We Do", path: "/home" },
      { label: "Case Study", path: "/case" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
  contents: {
    contact: {
      form: {
        name: {
          label: "Your Name",
          inputProps: { placeholder: "E.g. John Smith" },
        },
        email: {
          label: "Email Address",
          inputProps: { placeholder: "E.g. j.smith@hotmail.com" },
        },
        phone: {
          label: "Mobile Phone",
          inputProps: {
            placeholder: "Your preferred mobile phone number",
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
            image:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/contact-1212.png",
          },
          {
            city: "Chengdu",
            country: "China",
            image:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/contact-1213.png",
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
            current:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-00-00.mp4",
            transition:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-00-01.mp4",
          },
        },
        {
          texts: {
            heading: [
              "Develop your MVP inweeks",
              "with our EFFICIENT design",
              "and development process",
            ],
          },
          position: "left",
          video: {
            current:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-01-01.mp4",
            transition:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-01-02.mp4",
            reverse:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-00-01_reverse.mp4",
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
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-02-02.mp4",
            transition:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-02-03.mp4",
            reverse:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-01-02_reverse.mp4",
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
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-03-03.mp4",
            reverse:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/page-02-03_reverse.mp4",
          },
        },
      ],
      carousels: {
        backgroundImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/testimonials/bill-kapner-bg.png",
        contents: [
          {
            name: "Bill Kapner",
            avatar:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/testimonials/bill-kapner-avatar.png",
            title: "Founder and Chairman",
            companyName: "TitanHouse Inc",
            brandingColor: "#FFD700",
            description:
              "I have worked with many development firms in the past.  InceptionPad is clearly a cut above the rest.  Henry and the rest of the talented team are super responsive and always help me find the most efficient way to implement my business vision.",
          },
          {
            name: "Chris Nickerson",
            avatar:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/testimonials/chris-nickerson-avatar.jpeg",
            title: "CEO, Managing Partner",
            companyName: "Pinpoint LLC",
            brandingColor: "#A2CD5A",
            description:
              "I have worked with many development firms in the past.  InceptionPad is clearly a cut above the rest.  Henry and the rest of the talented team are super responsive and always help me find the most efficient way to implement my business vision.",
          },
          {
            name: "Thomas Wear",
            avatar:
              "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/testimonials/thomas-wear-avatar.jpeg",
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
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
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
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181212.png",
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
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181213.png",
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
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181214.png",
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
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",

        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "5",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
        id: "6",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#56F58D",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
        id: "7",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
        id: "8",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "9",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#56F58D",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "10",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "11",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "12",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "14",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "15",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#56F58D",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "16",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "17",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "18",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#56F58D",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "19",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "#FF6C62",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "20",
        tags: ["Big Data"],
      },
      {
        title: "TitanHouse",
        description:
          "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
          "Rapid implementation of functions" +
          "Start from the business value proposition, not requirement sheets",
        primaryColor: "grey",
        image:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-template.png",
        thumbImage:
          "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-181215.png",
        id: "21",
        tags: ["Big Data"],
      },
    ],
  },
};
export default mockData;
