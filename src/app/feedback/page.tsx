// pages/feedback.tsx

'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useForm from '@/hooks/useform/useform.hook';
import Button from '@/components/button/button.component';
import Textarea from '@/components/textarea/textarea.component';
import Input from '@/components/input/input.component';
import Loader from '@/components/loader/loader.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const Feedback: React.FC = () => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const {
        data: { email, subject, feedback },
        loadingSubmit,
        handleChange,
        handleSubmit,
        errors,
        errorsCount,
    } = useForm(
        formRef,
        {
            email: '',
            subject: '',
            feedback: '',
        },
        async () => {
            toastAlerta(`Email enviado com sucesso!`, 'sucesso');
            router.push('/');
        },
        async (error: Error) => alert(error.message),
        (form) => {
            const errors: { [key: string]: string } = {};
            const formData = new FormData(form);

            if (!formData.get('email')) errors.email = 'O e-mail é obrigatório';
            if (!formData.get('subject')) errors.subject = 'O assunto é obrigatório';
            if (!formData.get('feedback')) errors.feedback = 'O feedback é obrigatório';

            return errors;
        }
    );

    return (
        <main className="w-full p-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">Feedback</h1>
            <form
                ref={formRef}
                className="w-full max-w-md"
                onSubmit={handleSubmit}
                noValidate
            >
                <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    value={email}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.email}
                    required
                    readOnly={loadingSubmit}
                    className="w-full"
                />
                <Input
                    label="Assunto"
                    name="subject"
                    value={subject}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.subject}
                    required
                    readOnly={loadingSubmit}
                    className="w-full"
                />
                <Textarea
                    label="Feedback"
                    name="feedback"
                    value={feedback}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.feedback}
                    required
                    readOnly={loadingSubmit}
                    className="w-full"
                />
                <Button
                    type="submit"
                    disabled={loadingSubmit || errorsCount > 0}
                    backgroundColor="backgroundlight"
                    textColor="foreground"
                    className="mt-8 w-full"
                >
                    {loadingSubmit ? <Loader classNameWrapper={'w-fit h-fit'} classNameLoader={'w-fit h-fit border-foregroundopacity20'} haveLabel={false} label={''}/> : 'Enviar'}
                </Button>
            </form>
        </main>
    );
};

export default Feedback;
