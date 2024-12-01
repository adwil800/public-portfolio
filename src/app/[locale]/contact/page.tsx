import {Card, CardContent, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import IconLoader from "../components/IconLoader";
import {LocaleParam} from "../components/models";
import ChapterControl from "../components/ChapterControl";
import {ItemTransition} from "../components/Transitions";

interface ContactOption {
  title: string;
  href: string; 
}

const contactOptions: ContactOption[] =  [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/adwilcastillo/", 
  },
  {
    title: "Email",
    href: "mailto:adwil800@gmail.com", 
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/18098027393", 
  }
];

export async function generateMetadata({ params }: LocaleParam) {

  const messages = (await import(`../../../../messages/${params.locale}.json`)).default;
  
  if(!messages) {
    return {};
  }

  const metadata = messages.contact.metadata || {};

  return {
    title: metadata.title, 
    description: metadata.title, 
    keywords: metadata.keywords
  };
  
}

export default function Contact() {

  const localeContact = useTranslations('contact');
  const localeChapterControl = useTranslations('chapterControl');

  const renderOption = (contactOption: ContactOption, index: number) => {
    return (
      <div className="xs:col-span-12 sm:col-span-4 " key={contactOption.title}>
        <ItemTransition delay={index} origin="left">
          <Card variant="outlined" className="bg-secondary text-white flex flex-col items-center text-center ">
            <CardContent className="">
              <Typography variant="h4" component="div">
                {contactOption.title}
              </Typography>

              <a href={contactOption.href} target="_blank" rel="noopener noreferrer" >
                <div className="mt-10 mb-10  hover:scale-110 transition duration-300 ease-in-out">
                  <IconLoader name={contactOption.title}  sm={[0, 170]} md={[0, 220]}  />
                </div>
              </a>

              <span className="text-white text-lg mb-1">{localeContact(`${contactOption.title.toLowerCase()}Sub`)}</span>
            </CardContent>
          </Card>
        </ItemTransition>
      </div>
    );
  }

  return (
    
    <div className={`h-full flex flex-col  xs:pl-4 xs:pr-4 md:pl-12 md:pr-12 pt-10 mb-4`}>
        
      <h1 className="text-4xl font-bold mb-4 text-center text-white">{localeContact('title')}</h1>
      <h2 className="text-xl mb-6 text-center">{localeContact('subtitle')}</h2>

      <div className="grid grid-cols-12 gap-4 mt-4  ">
        {contactOptions.map((contactOption, index) => (
          renderOption(contactOption, index)
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <ChapterControl target='/projects' label={localeChapterControl('ch3')} direction="left" />
      </div>

    </div>
    
  );
}
