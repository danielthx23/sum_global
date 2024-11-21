import LoginForm from "./_components/loginform/loginform.component"

const LoginPage = () => {
  return <div className='p-3 rounded-lg shadow mx-auto w-full h-[500px] flex flex-col gap-4 justify-center items-center' style={{ maxWidth: '600px' }}>
    <h2 className="text-center mb-2 font-black text-3xl">
      Log in to SUM+
    </h2>
    <LoginForm />
  </div>
}

export default LoginPage