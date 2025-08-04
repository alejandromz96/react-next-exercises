import { type FormEvent, type ChangeEvent, useState, useCallback } from "react";

type UseFormResult<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent) => void;
  resetForm: () => void;
};

type UseFormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
};

const useForm = <T>({ initialValues, onSubmit, validate }: UseFormProps<T>): UseFormResult<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, type, value } = e.target;
      const fieldName = name as keyof T;

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));

      setErrors((currentErrors) => {
        const { ...cleannedErrors } = currentErrors;
        delete cleannedErrors[fieldName];
        return cleannedErrors;
      });
    },
    []
  );
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (validate) {
        const validationErrors = validate(values);
        if (!!Object.keys(validationErrors).length) {
          setErrors(validationErrors);
          return;
        }
      }
      setErrors({});
      onSubmit(values);
    },
    [validate, onSubmit, values]
  );
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, handleChange, handleSubmit, resetForm };
};

export default useForm;
