"use client";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import FormikField from "../CustomFieldsFormik/FormikField";
import InputField from "../CustomFieldsFormik/InputField";
import SelectField from "../CustomFieldsFormik/SelectField";
import { showSuccess, showError } from "@/utils/toast";
import { submitPreOrder } from "@/services/preOrderService";

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getValidationSchema = (t: any) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t("validation.name.required"))
      .min(2, t("validation.name.min"))
      .max(50, t("validation.name.max")),
    phone: Yup.string()
      .required(t("validation.phone.required"))
      .matches(/^[0-9]{10,11}$/, t("validation.phone.invalid")),
    quantity: Yup.number()
      .required(t("validation.quantity.required"))
      .min(1, t("validation.quantity.min"))
      .max(10, t("validation.quantity.max"))
      .integer(t("validation.quantity.integer")),
    color: Yup.string().required(t("validation.color.required")),
    email: Yup.string().email(t("validation.email.invalid")),
    honeypot: Yup.string().max(0, t("validation.spam")),
  });

export default function PreOrderModal({ isOpen, onClose }: PreOrderModalProps) {
  const t = useTranslations("Landing.preOrder");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productColors = [
    { label: t("colors.green"), value: "green" },
    { label: t("colors.pink"), value: "pink" },
  ];

  const initialValues = {
    name: "",
    phone: "",
    quantity: "",
    color: "",
    email: "",
    honeypot: "", // Honeypot field for spam protection
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    // Check honeypot
    if (values.honeypot) {
      showError(t("validation.spam"));
      return;
    }

    // Rate limiting check
    const lastSubmit = localStorage.getItem("preOrderLastSubmit");
    const now = Date.now();
    if (lastSubmit) {
      const timeDiff = now - parseInt(lastSubmit);
      if (timeDiff < 60000) {
        // 1 minute cooldown
        const remainingSeconds = Math.ceil((60000 - timeDiff) / 1000);
        showError(t("validation.rateLimit", { seconds: remainingSeconds }));
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await submitPreOrder({
        name: values.name,
        phone: values.phone,
        quantity: parseInt(values.quantity as string),
        color: values.color,
        email: values.email || "",
        timestamp: new Date().toISOString(),
      });

      // Store submission timestamp
      localStorage.setItem("preOrderLastSubmit", now.toString());

      showSuccess(t("success"));
      resetForm();
      onClose();
    } catch (error: any) {
      showError(error.message || t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900">{t("title")}</DialogTitle>
          <DialogDescription className="text-slate-600">{t("description")}</DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(t)}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<typeof initialValues>) => {
            const { values, setFieldValue } = formikProps;
            return (
              <Form className="mt-4 space-y-4">
                {/* Honeypot field - hidden from users (bots will fill this) */}
                <input
                  type="text"
                  name="honeypot"
                  value={values.honeypot}
                  onChange={(e) => setFieldValue("honeypot", e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <FormikField
                  component={InputField}
                  name="name"
                  label={t("fields.name")}
                  placeholder={t("placeholders.name")}
                  required
                />

                <FormikField
                  component={InputField}
                  name="phone"
                  label={t("fields.phone")}
                  placeholder={t("placeholders.phone")}
                  type="tel"
                  required
                />

                <FormikField
                  component={InputField}
                  name="quantity"
                  label={t("fields.quantity")}
                  placeholder={t("placeholders.quantity")}
                  type="number"
                  required
                />

                <FormikField
                  component={SelectField}
                  name="color"
                  label={t("fields.color")}
                  placeholder={t("placeholders.color")}
                  options={productColors}
                  required
                />

                <FormikField
                  component={InputField}
                  name="email"
                  label={t("fields.email")}
                  placeholder={t("placeholders.email")}
                  type="email"
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit" className="flex-1" isLoading={isSubmitting}>
                    {t("submit")}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
