
import { useTranslations } from 'next-intl';

import {LocaleParam} from './components/models';
import ChapterControl from './components/ChapterControl';
import {Button} from '@mui/material';
import {Link} from '@/navigation';

export async function generateMetadata({ params }: LocaleParam) {

  const messages = (await import(`../../../messages/${params.locale}.json`)).default;

  if(!messages) {
    return {};
  }

  const metadata = messages.home.metadata || {};

  return {
    title: metadata.title, 
    description: metadata.title, 
    keywords: metadata.keywords
  };
  
}

export default function Home() {

  const localeHome = useTranslations('home');
  const localeChapterControl = useTranslations('chapterControl');
  
  return (

    <div className="h-full flex flex-col justify-between items-center">

      <div className="xs:pl-4 xs:pr-4 md:pl-24 md:pr-24 pt-10">
        <h1 className="text-5xl font-bold mb-4 text-center text-white">{localeHome('title')}</h1>
        
        <h2 className="text-xl mb-6 text-center">{localeHome('subtitle')}</h2>

        <div className="text-lg text-white">
          <p className="mb-4" >
          {localeHome('p1')}
          </p>  

          <p className="mb-4">
          {localeHome('p2')}
          </p>  
        </div>

        <div className="flex justify-center mt-5 ">
          <Link href="/contact">
            <Button
              sx={{ mr: 1 }}
              variant={"outlined"}
            > 
              <span className="text-lg">
              {localeHome('connectLabel')}
              </span>
            </Button>
          </Link>
        </div> 
      </div> 

      

      <div className="flex items-center justify-center w-full">
        <ChapterControl target='/techstack' label={localeChapterControl('ch2')} direction="right" />
      </div>
      
    </div>

  );
}
