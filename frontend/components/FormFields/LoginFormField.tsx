import { LoginFormFieldProps } from "@/types/formfield";
import { Input } from "@/components/ui/input";

const LoginFormField: React.FC<LoginFormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
}) => (
    <>
        <Input
            type={type}
            placeholder={placeholder}
            aria-errormessage={error?.message}
            {...register(name, { valueAsNumber })}
        />
        {error && <span className="error-message">{error.message}</span>}
    </>
);

export default LoginFormField;