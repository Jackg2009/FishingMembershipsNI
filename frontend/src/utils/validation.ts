export const isEmailValid = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const isPasswordStrong = (password: string): boolean =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W_]/.test(password);

export const isPhoneValid = (phone: string): boolean => /^[0-9]{10,15}$/.test(phone);

export const isPostcodeValid = (postcode: string): boolean => /^[A-Za-z0-9 ]{5,10}$/.test(postcode);

export const isDOBValid = (dob: string): boolean => {
    const birthDate = new Date(dob);
    const today = new Date();
    const minValidDate = new Date();
    minValidDate.setFullYear(today.getFullYear() - 105); // 100 years ago

    return birthDate < today && birthDate > minValidDate;
};