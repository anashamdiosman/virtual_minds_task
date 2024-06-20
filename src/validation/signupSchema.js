import * as yup from "yup";

export const signupSchema = yup.object().shape({
  first_name: yup
    .string("Your first must be a string")
    .required("Your first name is required")
    .trim(),
  last_name: yup
    .string("Your last name must be a string")
    .required("Your last name is required")
    .trim(),
  email: yup
    .string()
    .email("E-mail is not valid")
    .required("E-mail is required")
    // .test(
    //   "validate-email",
    //   "E-mail is already taken"
    //   //   async (value) => await validateEmail(value)
    // )
    .trim(),
  username: yup
    .string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/,
      "Invalid username. Please use 4-20 characters with letters, numbers, underscores, or hyphens."
    )
    .required("username is required")
    .max(20, "Username must be at most 20 characters")
    // .test(
    //   "validate-username",
    //   "Username is already taken",
    // //   async (value) => await validateUsername(value)
    // )
    .trim(),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~\-_])[A-Za-z0-9!@#$&*~\-_]{8,}$/,
      "Password must have min 8 chars with upper, lower, number, and special char (!@#$&*~)."
    )
    .min(8, "password must be at least 8 characters")
    .max(20, "password must be at most 20 characters")
    .required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .trim(),
});

// const validateUsername = async (username) => {
//   try {
//     const { data } = await instance.post("/users/validate-username", {
//       username,
//     });
//     if (data?.status >= 200 && data?.status <= 205) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };

// const validateEmail = async (email) => {
//   try {
//     const { data } = await instance.post("/users/validate-email", {
//       email,
//     });
//     if (data?.status >= 200 && data?.status <= 205) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };
