import { Link, useNavigate } from "react-router";
import styles from "./RegisterPage.module.css";
import { useAuth } from "../hooks/useAuth";
import type React from "react";
import { useState } from "react";
import { registerSchema } from "../validations/authSchemas";
import { AuthError } from "../context/auth/authErrors";
function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      register({
        id: crypto.randomUUID(),
        name,
        email,
        password,
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

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
