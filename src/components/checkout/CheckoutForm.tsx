import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { checkoutSchema } from "../../schema/checkoutSchema";

function CheckoutForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prevform) => ({
      ...prevform,
      [name]: value,
    }));

    setErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName === "string") {
          fieldErrors[fieldName] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});

    console.log(result.data);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <label>
        Full Name
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName && (
          <span className={styles.error}>{errors.fullName}</span>
        )}
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </label>

      <label>
        Address
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && (
          <span className={styles.error}>{errors.address}</span>
        )}
      </label>

      <label>
        City
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </label>

      <label>
        Postal Code
        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && (
          <span className={styles.error}>{errors.postalCode}</span>
        )}
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default CheckoutForm;
