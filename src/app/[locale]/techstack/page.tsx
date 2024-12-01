import {Card, CardContent, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import IconLoader from "../components/IconLoader";
import {LocaleParam} from "../components/models";
import ChapterControl from "../components/ChapterControl";
import {ItemTransition} from "../components/Transitions";

interface TechStackSection {
  id: string;
  tools: string[];
}

const techStackSections: TechStackSection[] = [
  {
    id: "webdev",
    tools: ["JavaScript", "TypeScript", "HTML", "CSS", "SCSS", "Tailwind CSS", "React.js", "Next.js", "Material-UI",  "Vue.js", "Quasar"]
  },
  {
    id: "mobdev",
    tools: ["React Native", "Expo"]
  },
  {
    id: "apidev", 
    tools: ["Node.js", "Express.js", "Nest.js", "WebSocket"]
  }, 
  {
    id: "database", 
    tools: ["MySQL", "SQL Server", "TypeORM"]
  },
  {
    id: "design",
    tools: ["Figma", "Photopea"]
  },
  {
    id: "other", 
    tools: ["Jira", "Slack", "Git", "GitHub"]
  }
];
      
const newTech = ["Next.js", "Nuxt.js", "Tailwind CSS", "WebSocket" ]; 


export async function generateMetadata({ params }: LocaleParam) {

  const messages = (await import(`../../../../messages/${params.locale}.json`)).default;
  
  if(!messages) {
    return {};
  }

  const metadata = messages.techstack.metadata || {};

  return {
    title: metadata.title, 
    description: metadata.title, 
    keywords: metadata.keywords
  };
  
}

export default function TechStack() {

  const localeTechStack = useTranslations('techstack'); 
  const localeChapterControl = useTranslations('chapterControl');

  const renderTechStackSection = (section: TechStackSection, index: number) => {
    return (
      <div className="xs:col-span-12 sm:col-span-6 lg:col-span-4" key={section.id}>
        <ItemTransition delay={index} origin="up">
          <Card variant="outlined" className="bg-secondary  text-white">
            <CardContent>
            
              <Typography variant="h5" component="div">
                {localeTechStack(`${section.id}.title`)}
              </Typography>

              <p className="text-foreground mb-1">{localeTechStack(`${section.id}.subtitle`)}</p>
  
              <div className="flex flex-wrap gap-2">
                {section.tools.map((tool) => (
                  
                  <div 
                    key={tool}
                    className="tool-item hover:border-muiPrimary transition ease-in-out duration-300 cursor-default relative"
                  > 
                    <IconLoader name={tool} sm={[30, 30]} md={[32, 32]} />
                    {tool.toUpperCase()}
                    {
                      newTech.includes(tool) && <p className="mt-2 text-accent text-xs absolute bottom-0 right-1">{localeTechStack('newTechLabel').toUpperCase()}</p>
                    }
                  </div>
                  
                ))}
              </div>

            </CardContent>
          </Card>
        </ItemTransition>
      </div>
    );
  }

  return (
    
    <div className="h-full flex flex-col items-center xs:pl-4 xs:pr-4 md:pl-12 md:pr-12 pt-10 mb-4"> 

      <h1 className="text-4xl font-bold mb-4 text-center text-white">{localeTechStack('title')}</h1>
      <h2 className="text-xl mb-6 text-center">{localeTechStack('subtitle')}</h2> 
      
      <div className="grid grid-cols-12 gap-4">
        {techStackSections.map((section, index) => (
          renderTechStackSection(section, index)
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <ChapterControl target='/' label={localeChapterControl('ch1')} direction="left" />
        <ChapterControl target='/projects' label={localeChapterControl('ch3')} direction="right" />
      </div>

    </div>

  );
}
