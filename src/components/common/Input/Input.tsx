import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className={styles.group}>
      {label && <label>{label}</label>}
      <input className={`${styles.input} ${className}`} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
