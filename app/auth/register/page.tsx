"use client";
import { useForm, FieldError } from "react-hook-form";
import { z, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const createUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "password too short"),
    passwordConfirmation: z
      .string()
      .min(1, "password confirmation is required"),
    email: z.string().email("Invalid email"),
  })

  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  });

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(value: CreateUserInput) {
    console.log(value);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        value
      );
      router.push("/");
    } catch (error) {
      setRegisterError(String(error));
    }
  }
  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          <p>{(errors.email as FieldError)?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="jane"
            {...register("name")}
          />
          <p>{(errors.name as FieldError)?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            {...register("password")}
          />
          <p>{(errors.password as FieldError)?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Confirm password</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="********"
            {...register("passwordConfirmation")}
          />
          <p>{(errors.passwordConfirmation as FieldError)?.message}</p>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}
export default RegisterPage;
