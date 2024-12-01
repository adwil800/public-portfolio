

import 'react-vertical-timeline-component/style.min.css';
import ProjectTimeline from './components/ProjectTimeline';
import { Project } from './components/models';
import {useTranslations} from 'next-intl';
import {LocaleParam} from '../components/models';
import ChapterControl from '../components/ChapterControl';


const getShortMonthInLocale = (month: string, locale: string): string | undefined => {

  const monthIndex = new Date(`${month} 1, 2000`).getMonth(); 
  if (isNaN(monthIndex)) {
    console.error(`Invalid month: ${month}`);
    return  locale === 'es' ? 'Ene' : 'Jan';
  }

  const shortMonth = new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2000, monthIndex));

  // Capitalize the first letter
  return shortMonth.charAt(0).toUpperCase() + shortMonth.slice(1);

};

export async function generateMetadata({ params }: LocaleParam) {

  const messages = (await import(`../../../../messages/${params.locale}.json`)).default;
  
  if(!messages) {
    return {};
  }

  const metadata = messages.projects.metadata || {};

  return {
    title: metadata.title, 
    description: metadata.title, 
    keywords: metadata.keywords
  };
  
}

export default function Projects({ params: { locale }}: LocaleParam) {

  const projects: Project[] =  [
    {
      id: "ocsa",
      date: getShortMonthInLocale("jul", locale) + " 2024",
      tools: ["TypeScript", "Vue.js", "Jira", "SCSS", "Figma", ],
      href: "https://ocsaproservices.com/",
      image: "OCSA",
    },
    {
      id: "lrscreens",
      date: `${getShortMonthInLocale("nov", locale)} 2023 - ${getShortMonthInLocale("feb", locale)} 2024`,
      tools: ["Python", "WebSocket", "TypeScript", "Vue.js", "Quasar", "Nest.js", "TypeORM", "MySQL"],
      image: "lrscreens",
    },
    {
      id: "creal",
      date: `${getShortMonthInLocale("apr", locale)} 2023 - ${getShortMonthInLocale("jun", locale)} 2023`,
      tools: ["TypeScript", "Vue.js", "Jira", "Express.js", "MySQL", "SCSS", "Figma", ],
      href: "https://constructorareal.com.do/",
      image: "ConstructoraReal",
    },
    {
      id: "lreal",
      date: `${getShortMonthInLocale("dec", locale)} 2022 - ${getShortMonthInLocale("feb", locale)} 2023`,
      tools: ["TypeScript", "Vue.js", "Jira", "Express.js", "MySQL", "SCSS", "Figma", ],
      href: "https://lotoreal.com.do/",
      image: "LotoReal",
    }
  ];
  
  const localeProjects = useTranslations('projects');
  const localeChapterControl = useTranslations('chapterControl');

  //Fill projects with the translations
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    project.title = localeProjects(`${project.id}.title`);
    project.subtitle = localeProjects(`${project.id}.subtitle`);
    project.summary = localeProjects(`${project.id}.summary`);
  }

  return (
    
    <div className="h-full flex flex-col xs:pl-4 xs:pr-4 pt-10">
        
      <h1 className="text-4xl font-bold mb-4 text-center text-white">{localeProjects('title')}</h1>
      <h2 className="text-xl mb-6 text-center">{localeProjects('subtitle')}</h2>

      <ProjectTimeline projects={projects} locale={locale} localeOngoingLabel={localeProjects('ongoingLabel')}/>

      <div className="flex items-center justify-center w-full">
        <ChapterControl target='/techstack' label={localeChapterControl('ch2')} direction="left" />
        <ChapterControl target='/contact' label={localeChapterControl('ch4')} direction="right" />
      </div>

    </div>

  );
}
