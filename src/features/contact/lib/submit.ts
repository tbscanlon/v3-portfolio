interface Args {
  validator: (submission: unknown) => boolean;
  content: unknown;
  onSubmit: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export async function submit({
  validator,
  content,
  onSubmit,
  onSuccess,
  onError,
}: Args) {
  const isValid = validator(content);

  if (isValid) {
    onSubmit();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    if (res.status !== 204) {
      onError();
    }

    onSuccess();
  }
}
