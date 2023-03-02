export const ValidateUser = (user, formData) => {
    const errors = {};
    const enteredUsername = formData.userName;
    const enteredPassword = formData.passWord;
  
    user.forEach((item) => {
      if (item.email !== enteredUsername) {
        errors.userName = "Invalid username or password";
      } else if (item.username + "123" !== enteredPassword) {
        errors.passWord = "Invalid username or password";
      } else {
        errors.err = false;
      }
    });
    return errors;
  };
  