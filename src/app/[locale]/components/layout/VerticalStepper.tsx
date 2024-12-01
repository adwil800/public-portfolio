'use client';
import {Box} from '@mui/material';
 
import {VerticalLinearStepperProps} from '../models';
import SidebarStepper from './SidebarStepper';
import useScrollObserver from './ScrollObserver';
import {useEffect, useState} from 'react';

 
export default function VerticalLinearStepper({ LocaleStepper, locale }: VerticalLinearStepperProps) {
   
  const { refOne, refTwo, isIntersecting } = useScrollObserver();
  const [responsiveClasses, setResponsiveClasses] = useState('h-screen-appbar mt-4');

  useEffect(() => {
    if(!isIntersecting.two) {
      setResponsiveClasses('h-screen-98 -mt-12')
    }
    else if(!isIntersecting.one) {
      setResponsiveClasses('-mt-3 h-screen-95')
    }
    else {
      setResponsiveClasses('h-screen-appbar mt-4')
    }
  }, [isIntersecting]);

  return (
    <Box className="xs:hidden md:block" sx={{ width: 300}}>
      <Box ref={refOne} className="-mt-12" sx={{ width: 300, height: 2 }}/>
      <Box ref={refTwo} className="mt-7" sx={{ width: 300, height: 2 }}/>

      <Box className={`bg-secondary rounded-md p-6 fixed ${responsiveClasses} transition-all duration-300 overflow-auto custom-scrollbar`} sx={{ maxWidth: 300 }}>
        <SidebarStepper LocaleStepper={LocaleStepper} locale={locale}/>
      </Box>
    </Box>
  );

}
  