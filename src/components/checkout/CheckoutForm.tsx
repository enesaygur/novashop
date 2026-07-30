import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { checkoutSchema } from "../../validations/checkoutSchema";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router";
import { saveOrder } from "../../utils/orderStorage";
import { useAuth } from "../../hooks/useAuth";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

function CheckoutForm() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
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
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    const order = {
      id: crypto.randomUUID(),
      userId: user!.id,
      items,
      customer: result.data,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);

    setErrors({});

    clearCart();
    navigate("/order-confirmation");
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <Input
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />
      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input 
      label="Address"
      name="address"
      value={form.address}
      onChange={handleChange}
      error={errors.address}
      />
      <Input 
      label="City"
      name="city"
      value={form.city}
      onChange={handleChange}
      error={errors.city}
      />
      <Input 
      label="Postal Code"
      name="postalCode"
      value={form.postalCode}
      onChange={handleChange}
      error={errors.postalCode}
      />

      <Button type="submit">Place Order</Button>
    </form>
  );
}

export default CheckoutForm;
