import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tyoe?: string;
  error?: string;
}

function Input({ label, type="text", error, className = "", ...props }: InputProps) {
  return (
    <div className={styles.group}>
      {label && <label>{label}</label>}
      <input type={type} className={`${styles.input} ${className}`} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
