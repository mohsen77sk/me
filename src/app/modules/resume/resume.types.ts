export interface Resume {
  name: string;
  image: string;
  professionalTitle: string;
  about: string;
  workExperiences: ResumeWorkExperiences[];
  projects: ResumeProjects[];
  educations: ResumeEducation[];
  technicalSkills: string[];
  professionalSkills: string[];
  languages: ResumeLanguage[];
  contact: ResumeContact[];
  social: ResumeSocial[];
}

export interface ResumeWorkExperiences {
  title: string;
  place: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  description: string;
  tasks: string[];
}

export interface ResumeProjects {
  title: string;
  status: string;
  link: string;
  description: string;
}

export interface ResumeLanguage {
  title: string;
  grade: string;
}

export interface ResumeEducation {
  fieldOfStudy: string;
  degree: string;
  place: string;
  startDate: string;
  endDate: string;
}

export interface ResumeContact {
  name: string;
  value: string;
  icon: string;
}

export interface ResumeSocial {
  name: string;
  value: string;
  icon: string;
}
