import {
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import {
  imagePath,
  LangLocalKey,
  LanguageEnum,
  animationPath,
} from "../constants/Data";
import { EN, SPN } from "../constants/language";
import { AppLayout, ContentsType, HeaderType } from "../types";

type IProps = AppLayout & { setLanguage: (lang: LanguageEnum) => void };

const DataContext = createContext<IProps>({} as IProps);

const DataProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const [lang, setLang] = useState<LanguageEnum>(LanguageEnum.en);

  const languageTerms = useMemo(
    () => (lang === LanguageEnum.en ? EN : SPN),
    [lang]
  );
  const {
    form,
    cases,
    videos,
    contact,
    carousels,
    formResult,
    companyInfo,
    headers: langHeader,
  } = languageTerms;
  const headers: HeaderType = useMemo(
    () => ({
      logo: `${imagePath}logo-white.png`,
      name: langHeader.name,
      items: [
        { label: langHeader.labelItme1, path: "/home" },
        { label: langHeader.labelItme2, path: "/case" },
        { label: langHeader.labelItme3, path: "/contact" },
      ],
    }),
    [languageTerms]
  );
  const contents: ContentsType = useMemo(
    () => ({
      contact: {
        resultTips: {
          Success: contact.success,
          Failed: contact.failed,
        },
        form: {
          name: {
            label: form.labelName,
            inputProps: { placeholder: form.namePlaceholder, required: true },
          },
          email: {
            label: form.labelEmail,
            inputProps: {
              placeholder: form.emailPlaceholder,
              type: "email",
              required: true,
            },
          },
          phone: {
            label: form.labelPhone,
            inputProps: {
              placeholder: form.phonePlaceholder,
              type: "tel",
            },
          },
          desc: {
            label: form.labelDesc,
            inputProps: {
              placeholder: form.descPlaceholder,
            },
          },
        },
        title: formResult.title,
        subTitle: formResult.subTitle,
        subTitleMobile: formResult.subTitleMobile,
        companyInfo: {
          summary: companyInfo.summary,
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
              heading: [videos.video1.heading.heading1],
              subtitle: [videos.video1.subtitle],
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
                videos.video2.heading.heading1,
                videos.video2.heading.heading2,
                videos.video3.heading.heading2,
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
                videos.video3.heading.heading1,
                videos.video3.heading.heading2,
                videos.video3.heading.heading3,
              ],
            },
            position: "left",
            video: {
              current: `${imagePath}page-02-02.mp4`,
              transition: `${imagePath}page-02-03.mp4`,
              reverse: `${imagePath}page-01-02_reverse.mp4`,
              mobileCurrent: `${animationPath}page-02-02_bmp.pag`,
              mobileTransition: `${animationPath}page-02-03_bmp.pag`,
              mobileReverse: `${animationPath}page-01-02_back_bmp.pag`,
            },
          },
          {
            texts: {
              heading: [
                videos.video4.heading.heading1,
                videos.video4.heading.heading2,
                videos.video4.heading.heading3,
              ],
            },
            position: "left",
            video: {
              current: `${imagePath}page-03-03.mp4`,
              reverse: `${imagePath}page-02-03_reverse.mp4`,
              mobileCurrent: `${animationPath}page-03-03_bmp.pag`,
              mobileReverse: `${animationPath}page-02-03_back_bmp.pag`,
            },
          },
        ],
        carousels: {
          carouselStudyBtn: carousels.carouselStudyBtn,
          backgroundImage: `${imagePath}testimonials/bill-kapner-bg.png`,
          contents: [
            {
              name: carousels.carousel1.name,
              avatar: `${imagePath}testimonials/bill-kapner-avatar.png`,
              title: carousels.carousel1.title,
              companyName: carousels.carousel1.companyName,
              brandingColor: "#FFD700",
              description: carousels.carousel1.description,
            },
            {
              name: carousels.carousel2.name,
              avatar: `${imagePath}testimonials/chris-nickerson-avatar.jpeg`,
              title: carousels.carousel2.title,
              companyName: carousels.carousel2.companyName,
              brandingColor: "#A2CD5A",
              description: carousels.carousel2.description,
            },
            {
              name: carousels.carousel3.name,
              avatar: `${imagePath}testimonials/thomas-wear-avatar.jpeg`,
              title: carousels.carousel3.title,
              companyName: carousels.carousel3.companyName,
              brandingColor: "#20B2AA",
              description: carousels.carousel3.description,
            },
          ],
        },
      },
      caseStudyBtn: cases.studyBtn,
      cases: [
        {
          title: cases.case1.title,
          description: cases.case1.description,
          primaryColor: "#000",
          image: "images/case-template.png",
          thumbImage: `${imagePath}case-171346.png`,
          id: "1",
          tags: ["Big Data", "AI"],
        },
        {
          title: cases.case1.title,
          description: cases.case1.description,
          primaryColor: "#0559AF",
          image: "images/case-template.png",
          thumbImage: `${imagePath}case-181212.png`,
          id: "2",
          tags: ["Big Data"],
        },
        {
          title: cases.case1.title,
          description: cases.case1.description,
          primaryColor: "#DDA71B",
          image: "images/case-template.png",
          thumbImage: `${imagePath}case-181213.png`,
          id: "3",
          tags: ["Big Data"],
        },
        {
          title: cases.case1.title,
          description: cases.case1.description,
          primaryColor: "#56F58D",
          image: "images/case-template.png",
          thumbImage: `${imagePath}case-181214.png`,
          id: "4",
          tags: ["Big Data"],
        },
        {
          title: cases.case1.title,
          description: cases.case1.description,
          primaryColor: "#FF6C62",
          image: "images/case-template.png",
          thumbImage: `${imagePath}case-181215.png`,
          id: "5",
          tags: ["Big Data"],
        },
      ],
    }),
    [languageTerms]
  );

  const setLanguage = (language: LanguageEnum) => {
    if (language && Object.values(LanguageEnum).includes(language)) {
      setLang(language);
      localStorage.setItem(LangLocalKey, language);
    }
  };

  useEffect(() => {
    let localLang = localStorage.getItem(LangLocalKey) as LanguageEnum;
    const language = window?.navigator?.language;

    if (localLang && Object.values(LanguageEnum).includes(localLang)) {
      setLang(localLang);
      return;
    }
    if (language.endsWith("-ES")) {
      localLang = LanguageEnum.spn;
    } else {
      localLang = LanguageEnum.en;
    }
    setLang(localLang);
    localStorage.setItem(LangLocalKey, localLang);
  }, []);

  return (
    <DataContext.Provider value={{ headers, contents, setLanguage }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext should be used within the DataProvider!");
  }

  return context;
};

export default DataProvider;
