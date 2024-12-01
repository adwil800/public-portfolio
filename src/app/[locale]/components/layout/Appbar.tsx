'use client'; 
import {usePathname, useRouter} from '@/navigation';
import {AppBar, Box, Button, Drawer, Toolbar, Typography} from '@mui/material';
import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {VerticalLinearStepperProps} from '../models';
import SidebarStepper from './SidebarStepper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email'; 

import { motion } from "framer-motion";


function LanguageTransition ({targetLocale}: {targetLocale: string}) {
 
  return (
    <motion.div
      initial={"hidden"}
      animate="enter"
      variants={{
        hidden: { opacity: 0, x: 0, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ type: "linear" }}
      className="fixed inset-0 bg-secondary z-50 flex items-center justify-center"
    >
      <motion.div
        initial={"hidden"}
        animate="enter"
        variants={{
          hidden: { opacity: 0, x: -100, y: 0 },
          enter: { opacity: 1, x: 0, y: 0, transition: {delay: 0.2} },
        }}
        transition={{ type: "linear" }}
        className="fixed inset-0 bg-secondary z-50 flex items-center justify-center"
      >
        <h2 className="text-5xl font-semibold mb-4">{targetLocale.toUpperCase()}</h2>
      </motion.div>
    </motion.div>
  );

}

interface AppbarProps extends VerticalLinearStepperProps {
  en: string;
  es: string;
  downloadResumeLabel: string;
}

export default function Appbar({ en, es, locale, LocaleStepper, downloadResumeLabel }: AppbarProps) {

  const pathname = usePathname();
  const router = useRouter();
  const [transition, setTransition] = useState(false);
  const [tLocale, setTLocale] = useState(locale);
  
  const triggerLanguageTransition = (targetLocale: string) => {
    if(targetLocale === locale) return;

    setTransition(true);
    setTLocale(targetLocale);

    setTimeout(() => {
      router.push(pathname, { locale: targetLocale } );
    }, 1000);

  }
 
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const downloadResume = (locale: string) => {

    window.open(`/resume/Adwil Castillo - ${locale.toUpperCase()}.pdf`, '_blank');
  }

  return (

    <>
      <AppBar component="nav" elevation={0} position='relative' className="bg-secondary" >
        <Toolbar className='flex justify-between'>
          <div className="md:hidden block">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton> 
          </div>

          <Typography variant="h6" component="div">
          </Typography>

          {/* Languages */}
          <div>
            
            <Button
              sx={{ mr: 1 }}
              variant={"outlined"}
              onClick={() => {downloadResume(locale)}}
            >
              {downloadResumeLabel}
            </Button>
            
            <Button
              sx={{ mr: 1 }}
              variant={locale === 'en' ? "contained" : "outlined"}
              onClick={() => {triggerLanguageTransition('en')}}
            >
              {en}
            </Button>
            
            <Button
              sx={{ mr: 1 }}
              variant={locale === 'es' ? "contained" : "outlined"}
              onClick={() => {triggerLanguageTransition('es')}}
            >
              {es}
            </Button>
          </div>
              
          
        </Toolbar>
      </AppBar>

      <Drawer 
        open={open}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--secondary)",
          }
        }}
      >
        <Box className="p-2 pt-4"  sx={{ width: 250 }}>
          <div className="text-center">

            <a href="https://www.linkedin.com/in/adwilcastillo/" target='_blank' rel="noopener noreferrer">
              <LinkedInIcon fontSize="large"  className="mr-2 hover:text-muiPrimary cursor-pointer text-white"/>
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon fontSize="large"  className="mr-2 hover:text-muiPrimary cursor-pointer text-white"/>
            </a> */}
            <a href="mailto:adwil800@gmail.com" rel="noopener noreferrer">
              <EmailIcon fontSize="large"  className="hover:text-muiPrimary cursor-pointer text-white"/>
            </a>

          </div>
          <SidebarStepper LocaleStepper={LocaleStepper} locale={locale} drawer={true} onDrawerClose={handleDrawerClose} />
        </Box>
      </Drawer>

      {transition && <LanguageTransition targetLocale={tLocale}/>}
    </>
    
  );
}
  