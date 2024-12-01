'use client';
import React, {useEffect, useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Link from 'next/link'; 

import {VerticalLinearStepperProps} from '../models';
import {usePathname} from '@/navigation';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import {ItemTransition} from '../Transitions';

interface ExtendedSidebarStepperProps extends VerticalLinearStepperProps {
  drawer?: boolean;
  onDrawerClose?: () => void;
}

const stepperIcons = (index: number) => {
  switch (index) {
    case 0:
      return <Filter1Icon color='primary'/>;
    case 1:
      return <Filter2Icon color='primary'/>;
    case 2:
      return <Filter3Icon color='primary'/>;
    case 3:
      return <Filter4Icon color='primary'/>;
    default:
      return <Filter1Icon color='primary'/>;
  }
}

export default function SidebarStepper({ LocaleStepper, locale, drawer, onDrawerClose }: ExtendedSidebarStepperProps) {

  const pathName = usePathname();
  const [activeStep, setActiveStep] = useState(
    LocaleStepper.findIndex((step) => step.href === `/${locale}${pathName}`) || 0
  );

  useEffect(() => {
    setActiveStep(LocaleStepper.findIndex((step) => step.href ===  `/${locale}${pathName}`) || 0);
  }, [pathName, LocaleStepper, locale]);

  const closeDrawer = () => {
    if (drawer && onDrawerClose) {
      onDrawerClose();
    }
  };

  return (
    <Stepper orientation="vertical" className='mb-2'>
      {LocaleStepper.map((step, index) => (
        <Step key={step.label} active={true} >
            <ItemTransition  delay={index} origin='up'>

          <StepLabel StepIconComponent={() => stepperIcons(index)}>
              <Typography className="text-md text-white">{step.label}</Typography> 
          </StepLabel>
          
          <StepContent>
            {
              !drawer && 
              <Typography>{step.description}</Typography> 
            }
              <Link href={step.href} onClick={closeDrawer}>
                <Button
                    sx={{ mt: 1, mr: 1 }}
                    variant={activeStep === index ? "contained" : "outlined"}
                >
                    {step.buttonLabel}	
                </Button>
              </Link>
          </StepContent>

        </ItemTransition>
        </Step>
      ))}

      <Step>
      </Step>

    </Stepper> 
  );
}
  