
'use client';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import { Project } from './models';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Divider} from '@mui/material';
import IconLoader from '../../components/IconLoader';

interface ProjectTimelineProps {
  projects: Project[];
  localeOngoingLabel: string;
  locale: string;

}


const getDefData = (locale = 'en')=> {
  
  switch (locale) {
    case 'es':
      return {
        title: 'Proyecto',
        subtitle: 'Tipo de proyecto',
        summary: 'Resumen del proyecto',
      }

    default:
      return {
        title: 'Project',
        subtitle: 'Project type',
        summary: 'Project summary',
      }
  }

}

export default function ProjectTimeline({projects, locale, localeOngoingLabel}: ProjectTimelineProps) {

  const defData = getDefData(); 

  const renderProject = (project: Project, index: number) => {

    const viewProject = {
      es: project.demo ? 'Ver demo' : 'Ver sitio',
      en: project.demo ? 'View demo' : 'View live',
    }[locale] || 'View project';

    return (
      <VerticalTimelineElement
        key={index}
        visible={true}
        className=""
        contentStyle={{ background: 'var(--secondary)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid var(--foreground)' }}
        date={
          project.date + 
          (project.ongoing && localeOngoingLabel || '') 
        }
        dateClassName='xs:text-fs-15 md:text-fs-16 '
        iconStyle={{ background: 'var(--mui-primary)', color: '#fff' }} 
        icon={<WorkIcon />}
      >
        <div className="grid grid-cols-12 items-center">
              
          {
            project.href &&
            <div className="absolute top-0 right-0 p-3 text-foreground hover:text-muiPrimary transition ease-in-out duration-300">
          
              <a
                href={project.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                {viewProject}
                <OpenInNewIcon className='ml-1'/>
              </a>

            </div>
          }
          
          <div className="xs:col-span-12 lg:col-span-6 pt-6 pb-4">
            
            <h3 className="text-lg">{project.title || `${defData.title} ${index+1}`}</h3>
            <h4 className=" text-foreground">{project.subtitle || `${defData.subtitle} ${index+1}`}</h4>
            <Divider color='grey' />
            <div className='pt-2'>{project.summary || `${defData.summary} ${index+1}`}</div>  

          </div>

          <div className="xs:col-span-12 lg:col-span-6 text-end pt-6 pb-4 justify-center flex ml-1">
            <Image 
              src={`/assets/images/${project.image}.png`}
              height={0}
              width={400}
              style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
              alt={project.title + " thumbnail"}
              priority={project.imagePriority}
            />
          </div> 
          
          <div className="col-span-12 flex flex-wrap gap-2 justify-around">
            {project.tools.map((tool) => (
              <IconLoader name={tool} sm={[35, 35]} md={[35, 35]} key={tool}/>
            ))}
          </div>

        </div>

      </VerticalTimelineElement>
    );
  }

  return (
  
    <VerticalTimeline lineColor="" >

      {projects.map((project, index) => {
        return renderProject(project, index);
      })}
      
    </VerticalTimeline>

  );
}
