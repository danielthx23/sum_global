import React from 'react';

interface ProgressCirclesProps {
    currentStep: number;
    steps: Array<{
        title: string;
        content: React.ReactNode; // Customizable content for each step
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Submission handler for the step
        onNext?: () => void; // Optional function to handle "Next" step
        onPrev?: () => void; // Optional function to handle "Previous" step
    }>;
}

const ProgressCircles = ({ currentStep, steps }: ProgressCirclesProps) => {
    const gradientPercentage = ((currentStep === 1 ? 0 : (currentStep - 1)) / steps.length) * 120;

    return (
        <section className="flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold mb-4">{steps[currentStep - 1].title}</h2>
            <div className="relative flex justify-center items-center mb-4 w-fit">
            <span
                    className="absolute h-[2px] w-[90%] z-[-1] transition-all ease-in-out"
                    style={{
                        background: `linear-gradient(to right, var(--foreground) ${gradientPercentage}%, var(--backgroundlight) 5%)`,
                    }}
                ></span>
                {Array.from({ length: steps.length }, (_, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 rounded-full flex items-center justify-center mx-2 font-bold 
                            ${index < currentStep ? 'bg-gradient-to-tr from-foreground to-foregroundlight text-background' : 'bg-gradient-to-tr from-background to-backgroundlight text-background'}`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className="text-sm">
                Passo {currentStep} de {steps.length}
            </div>
        </section>
    );
};

export default ProgressCircles;