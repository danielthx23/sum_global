// pages/register.tsx

import RegisterForm from "./_components/registerform/registerform.component";

const RegisterPage = () => {
  return (
    <div className="p-3 md:px-0 sm:px-0 xs:px-0 max-w-[800px] rounded-lg shadow mx-auto w-full h-fit flex flex-col gap-8 justify-center">
      <h2 className="text-center w-full mb-2 font-black text-3xl pt-8">
        Cadastro de Usuário
      </h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
