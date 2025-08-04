"use client";
import { useCallback, useEffect, useState } from "react";

import useForm from "@/hooks/useForm";

type SignupFormFields = {
  name: string;
  email: string;
  password: string;
};
const SignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = useCallback((values: SignupFormFields) => {
    console.log({ values });
    setIsSubmitted(true);
  }, []);
  const validate = useCallback((values: SignupFormFields) => {
    const errors: Partial<Record<keyof SignupFormFields, string>> = {};
    if (!values.name) errors.name = "Name field is required";
    if (!values.email) {
      errors.email = "Email field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password field is required";
    } else if (values.password.length < 6) {
      errors.password = "Password field must contain at least 6 characters";
    }
    return errors;
  }, []);

  const {
    values: { name, email, password },
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm<SignupFormFields>({
    initialValues: { name: "", email: "", password: "" },
    onSubmit,
    validate,
  });

  useEffect(() => {
    if (isSubmitted) {
      resetForm();
      setIsSubmitted(false);
    }
  }, [resetForm, isSubmitted]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex w-fit min-w-xs justify-between rounded-md border border-zinc-400 px-1 py-1.5">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={handleChange}
            className="rounded-md bg-zinc-800"
          />
        </div>
        {!!errors.name && <p id="name-error" className="text-red-500">{errors.name}</p>}
        <div className="flex w-fit min-w-xs justify-between rounded-md border border-zinc-400 px-1 py-1.5">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={handleChange}
            className="rounded-md bg-zinc-800"
          />
        </div>
        {!!errors.email && <p id="email-error" className="text-red-500">{errors.email}</p>}
        <div className="flex w-fit min-w-xs justify-between rounded-md border border-zinc-400 px-1 py-1.5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            aria-describedby={errors.password ? "password-error" : undefined}
            onChange={handleChange}
            className="rounded-md bg-zinc-800"
          />
        </div>
        {!!errors.password && <p id="password-error" className="text-red-500">{errors.password}</p>}
        <button
          className="mt-2 rounded-xl border border-zinc-500 bg-zinc-800 p-2 hover:bg-zinc-600"
          type="submit"
        >
          Signup
        </button>
      </form>
    </>
  );
};

export default SignupForm;
