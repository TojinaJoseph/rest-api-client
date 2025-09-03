"use client";
import { useForm, FieldError } from "react-hook-form";
import { z, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const createSessionSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "password is required"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(value: CreateSessionInput) {
    console.log(value);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        value,
        { withCredentials: true }
      );
      router.push("/");
    } catch (error) {
      setLoginError(String(error));
    }
  }
  return (
    <>
      <p>{loginError}</p>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            {...register("password")}
          />
          <p>{(errors.password as FieldError)?.message}</p>
        </div>

        <button type="submit">SUBMIT</button>
        <a href="/auth/register">Please register</a>
      </form>
    </>
  );
}
export default LoginPage;
