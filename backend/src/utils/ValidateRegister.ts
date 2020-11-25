import { EmailPasswordInput } from "./EmailPasswordInput";

export const ValidateRegister = (options: EmailPasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid Email!",
      },
    ];
  }

  if (options.fullName.length <= 2) {
    return [
      {
        field: "username",
        message: "Too short!",
      },
    ];
  }

  if (options.fullName.includes("@")) {
    return [
      {
        field: "username",
        message: 'Cannot include "@"!',
      },
    ];
  }

  if (options.password.length <= 8) {
    return [
      {
        field: "password",
        message: "Too short!",
      },
    ];
  }

  return null;
};
