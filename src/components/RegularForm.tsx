import { useState, ChangeEvent} from 'react';
import { useForm } from "react-hook-form";


interface FormData {
    username: string;
    email: string;
    password: string;
}

function RegularForm() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit(() => alert(JSON.stringify(formData)))}>
            <h1>Change Me To React Hook Form</h1>
            <div>
                <input
                    {...register("username", { required: "Username is required", minLength: { value: 2, message: "Username must be at least 2 characters long" } })}
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Enter UserName'
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p>{String(errors.username.message)}</p>}
            </div>
            <div>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        }
                    })}
                    type="text"
                    id="email"
                    name="email"
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{String(errors.email.message)}</p>}
            </div>
            <div>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must not exceed 20 characters",
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/,
                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=)",
                        }
                    })}
                    type="text"
                    id="password"
                    name="password"
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p>{String(errors.password.message)}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RegularForm;
