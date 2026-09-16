export type Profile = {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  headline: string;
  summary: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Job = {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type Project = {
  featured: boolean;
  title: string;
  tag: string;
  description: string;
  points?: string[];
  stack: string[];
  href: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type School = {
  school: string;
  credential: string;
  dates: string;
};

export type Certification = {
  name: string;
  issuer: string;
  href: string;
};

export type SiteContent = {
  profile: Profile;
  metrics: Metric[];
  experience: Job[];
  projects: Project[];
  skills: SkillGroup[];
  education: School[];
  certifications: Certification[];
};
