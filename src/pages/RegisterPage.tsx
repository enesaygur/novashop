import { Link, useNavigate } from "react-router";
import styles from "./RegisterPage.module.css";
import { useAuth } from "../hooks/useAuth";
import type React from "react";
import { useState } from "react";
import { registerSchema } from "../validations/authSchemas";
import { AuthError } from "../context/auth/authErrors";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}
function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: formattedErrors.name?.[0],
        email: formattedErrors.email?.[0],
        password: formattedErrors.password?.[0],
      });
      return;
    }

    try {
      register({
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role: "user",
      });

      navigate("/login");
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      }
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register</h1>

        {error && <div className={styles.error}>{error}</div>}

        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          error={fieldErrors.name}
        />

        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          error={fieldErrors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          error={fieldErrors.password}
        />
        <Button type="submit">Register</Button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
