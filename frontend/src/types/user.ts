export interface User {
    forename: string;
    surname: string;
    dob: Date;
    street: string;
    city: string;
    county: string;
    postcode: string;
    contactNumber: number; // Changed to number instead of `Number` for consistency
    fishingLicense: string;
    username: string;
    email: string;
    password: string;
}