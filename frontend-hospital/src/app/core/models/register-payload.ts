export interface RegisterPayload {
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
    cni: string;
    date_of_birth: string;
    city_of_birth: string;
    gender: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'Patient' | 'Doctor' | 'Admin';
}