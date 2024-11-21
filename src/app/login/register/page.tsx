// pages/register.tsx

import RegisterForm from "./_components/registerform/registerform.component";

const RegisterPage = () => {
  return (
    <div className="p-3 rounded-lg shadow mx-auto w-full h-fit flex flex-col gap-8 justify-center" style={{ maxWidth: '800px' }}>
      <h2 className="text-center w-full mb-2 font-black text-3xl pt-8">
        Cadastro de Usuário
      </h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
