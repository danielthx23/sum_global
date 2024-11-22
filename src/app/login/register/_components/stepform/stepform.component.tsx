import Button from '@/components/button/button.component';
import React, { RefObject } from 'react';
import ProgressCircles from '../progresscircles/progresscircles.component';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';

interface StepFormProps {
  currentStep: number;
  steps: Array<{
    title: string;
    content: React.ReactNode; 
    onSubmit?: ( e: React.FormEvent<HTMLFormElement>) => Promise<void>; 
    onNext?: () => void;
    onPrev?: () => void; 
  }>;
  handleNextStep: () => void; 
  handlePrevStep: () => void; 
  formRef: RefObject<HTMLFormElement>;
  errorsCount: number;
}

const StepForm = ({
  currentStep,
  steps,
  handleNextStep,
  handlePrevStep,
  formRef,
  errorsCount,
}: StepFormProps) => {
  const { content, onSubmit, onNext, onPrev } = steps[currentStep - 1];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && errorsCount < 0) {
      await onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={(e) => handleSubmit(e)} 
      ref={formRef}
      className="w-full h-fit flex flex-col items-center gap-4 p-4 px-12 relative"
      noValidate
    >
      <ProgressCircles currentStep={currentStep} steps={steps} />
      {content}

      <div className='w-full flex justify-between mt-4'>
        <Button 
          type="button"
          handleClick={onPrev || handlePrevStep} 
          backgroundColor="backgroundlight"
          disabled={currentStep === 1}
          className='w-1/6 py-2 px-4 flex gap-2 justify-end items-center group'
        >
          <BiChevronLeft className='text-xl group-hover:mr-2 transition-all ease-in-out'/>Voltar
        </Button>

        {onSubmit ? (
          <Button 
            type="submit"
            backgroundColor="backgroundlight"
            className='w-fit py-2 px-16 flex gap-2 text-center justify-start items-center group border border-transparent hover:border-foreground hover:bg-transparent transition-all ease-in-out'
          >
            Finalizar Cadastro
          </Button>
        ) : (
          <Button 
            type="button" 
            handleClick={onNext || handleNextStep} 
            backgroundColor="backgroundlight"
            className='w-1/5 py-2 px-4 flex gap-2 justify-start items-center group'
          >
            Próximo<BiChevronRight className='text-xl group-hover:ml-2 transition-all ease-in-out'/>
          </Button>
        )}
      </div>
      <p>Já possui cadastrado?</p>
      <Link href="/login" className='underline'>Log in</Link>
    </form>
  );
};

export default StepForm;