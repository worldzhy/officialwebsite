import { DetailedHTMLProps, InputHTMLAttributes, ReactHTML } from "react";

export interface AppLayout {
  headers: HeaderType;
  contents: ContentsType;
}

export type HeaderType = {
  items: Array<HeaderItemProps>;
  logo: string;
  name: string;
};

interface HeaderItemProps {
  label: string;
  path: string;
  children?: Array<HeaderItemProps>;
}

export type ContentsType = {
  home: HomeContentType;
  cases: CaseContentType;
  contact: ContactContentProps;
};

type TextType = {
  heading: Array<string>;
  subtitle?: Array<string>;
};

export interface HomeVideoProps {
  texts: TextType;
  position: string;
  video: VideoProps;
}

export interface CarouselItemProps {
  avatar: string;
  name: string;
  title: string;
  companyName: string;
  brandingColor: string;
  description: string;
}

type HomeContentType = {
  videos: Array<HomeVideoProps>;
  carousels: {
    backgroundImage: string;
    contents: Array<CarouselItemProps>;
  };
};

interface VideoProps {
  current: string;
  transition?: string;
  reverse?: string;
  mobileCurrent: string;
  mobileTransition?: string;
  mobileReverse?: string;
}

export type CaseContentType = Array<CaseProps>;

export type TagType = string;

export interface CaseProps {
  id: string;
  primaryColor: string;
  title: string;
  tags?: Array<TagType>;
  description: string;
  image: string;
  thumbImage: string;
}

export enum FormSubmitResult {
  Default = "Default",
  Success = "Success",
  Failed = "Failed",
}

interface ContactContentProps {
  title: string;
  subTitle: string;
  subTitleMobile: string;
  companyInfo: CompanyInfoProps;
  form: Record<string, FormFieldProps>;
  resultTips: Omit<Record<FormSubmitResult, string>, "Default">;
}

export interface FormFieldProps {
  component?: keyof ReactHTML;
  label: string;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

type Company = {
  image: string;
  city: string;
  country: string;
};

export interface CompanyInfoProps {
  summary: string;
  list: Array<Company>;
}
