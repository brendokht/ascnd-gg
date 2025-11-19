export function objectToFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any },
  formData: FormData = new FormData(),
  parentKey?: string,
): FormData {
  if (data === null || data === undefined) return formData;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value === undefined || value === null) {
      return;
    }

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (typeof value === "object") {
      objectToFormData(value, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  });

  return formData;
}
