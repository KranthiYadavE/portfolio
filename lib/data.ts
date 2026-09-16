import site from "@/content/site.json";
import type { SiteContent } from "./types";

const data = site as SiteContent;

export const profile = data.profile;
export const metrics = data.metrics;
export const experience = data.experience;
export const projects = data.projects;
export const skills = data.skills;
export const education = data.education;
export const certifications = data.certifications;
export type { SiteContent } from "./types";
