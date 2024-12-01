import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import localFont from "next/font/local";
import "../globals.css";
import Appbar from './components/layout/Appbar';
import { useTranslations } from 'next-intl';
import {StepperItem} from './components/models';
import VerticalLinearStepper from './components/layout/VerticalStepper';
import {FirstLoadTransition} from './components/Transitions';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inconsolata = localFont({
  src: "./fonts/inconsolata.woff",
  variable: "--font-inconsolata",
});

export default function RootLayout({
  children,  params: { locale }
}: Readonly<{
  children: React.ReactNode; params: { locale: string };
}>, ) {

  const localeVStepper = useTranslations('layout.verticalStepper');
  const localeAppbar = useTranslations('layout.appbar');

  // Load steps
  const stepperItems: StepperItem[] = [];

  for (let i = 1; i < 5; i++) {

    const stepperObject: StepperItem = {
      label: localeVStepper(`labelch${i}`),
      description: localeVStepper(`descriptionch${i}`),
      buttonLabel: localeVStepper(`buttonLabelch${i}`),
      href: localeVStepper(`hrefch${i}`, { locale })
    }

    stepperItems.push(stepperObject)

  }

  return (
    <html lang={locale}>
      <body
        className={`${inconsolata.variable} antialiased `}
      >
        <SpeedInsights/>
        <Analytics/>
        <AppRouterCacheProvider>
          <FirstLoadTransition>

              <div className="grid grid-cols-12 h-screen max-site-width">
        
                <div className="col-span-12 flex flex-col h-full">

                  <Appbar en={localeAppbar('languages.en')} es={localeAppbar('languages.es')} downloadResumeLabel={localeAppbar('downloadResumeLabel')} LocaleStepper={stepperItems}  locale={locale} />
                  <div className="flex-grow bg-primary grid grid-flow-row grid-cols-[auto_1fr]">

                    <div className="md:p-2">
                      <VerticalLinearStepper LocaleStepper={stepperItems} locale={locale}/>
                    </div>
                    <div className="md:p-2">
                      {children}
                    </div>
                  </div>

                </div>

              </div>

          </FirstLoadTransition>
         </AppRouterCacheProvider>

      </body>
    </html>
  );
}
