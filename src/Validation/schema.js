import * as yup from "yup";



export const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  userName: yup
    .string()
    .required("Username is required")
    .matches(
      /^[A-Za-z0-9][A-Za-z0-9-_\.]*$/,
      "Username must start with letter/number and can contain -, _, ."
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10-15 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});