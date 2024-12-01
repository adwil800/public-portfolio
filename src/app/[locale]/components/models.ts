
export interface StepperItem {
    label: string;
    description: string;
    buttonLabel: string;
    href: string;
  }
  

export interface VerticalLinearStepperProps {
  LocaleStepper: StepperItem[];
  locale: string;
}

export type LocaleParam = Readonly<{params: { locale: string }}>;