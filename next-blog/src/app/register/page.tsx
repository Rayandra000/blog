import RegisterForm from "@/components/registerForm";
import Wrapper from "@/components/wrapper";
  
export default function RegisterPage() {
    return (
        <Wrapper>
            <div className="flex justify-center w-full ">
                <RegisterForm />
            </div>
        </Wrapper>
    )
}