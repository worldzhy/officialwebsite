export type AppLayout = {
  headers: HeaderType;
  contents: ContentsType;
};

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

type ContentsType = {
  home: HomeContentType;
  cases: CaseContentType;
  contact?: ContactContentProps;
};

interface HomeContentProps {
  text: string;
  position: string;
  video: VideoProps;
}
type HomeContentType = Array<HomeContentProps>;

interface VideoProps {
  current: string;
  transition?: string;
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

interface ContactContentProps {
  title: string;
  subTitle: string;
  companyInfo: CompanyInfoProps;
}

type Company = {
  image: string;
  text: string;
};

interface CompanyInfoProps {
  summary: string;
  list: Array<Company>;
}
