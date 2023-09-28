import { useState, ChangeEvent } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';


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
                    style={{
                        border: errors.username ? "1px solid red" : "1px solid #ccc"
                    }}
                />
                <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ message }) => <p>{message}</p>}
                />
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
                    style={{
                        border: errors.username ? "1px solid red" : "1px solid #ccc"
                    }}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p>{message}</p>}
                />
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
                        validate: {
                            hasUppercase: (value) =>
                                /[A-Z]/.test(value) ||
                                "Password must contain at least one uppercase letter",
                            hasLowercase: (value) =>
                                /[a-z]/.test(value) ||
                                "Password must contain at least one lowercase letter",
                            hasNumber: (value) =>
                                /\d/.test(value) ||
                                "Password must contain at least one number",
                            hasSpecialCharacter: (value) =>
                                /[@#$%^&+=]/.test(value) ||
                                "Password must contain at least one special character (@#$%^&+=)",
                        }
                    })}
                    type="text"
                    id="password"
                    name="password"
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        border: errors.username ? "1px solid red" : "1px solid #ccc"
                    }}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <p>{message}</p>}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RegularForm;
