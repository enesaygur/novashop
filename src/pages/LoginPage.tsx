import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../validations/authSchemas";
import { AuthError } from "../context/auth/authErrors";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";

interface FieldErrors {
  email?: string;
  password?: string;
}
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: formattedErrors.email?.[0],
        password: formattedErrors.password?.[0],
      });
      return;
    }

    try {
      login(email, password);

      navigate(from);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      }
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldErrors({});
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
            setFieldErrors({});
          }}
          error={fieldErrors.password}
        />
        <Button type="submit">Login</Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
