export class Usuario {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    birthDate: Date;
    address: {
        id: number;
        street: string;
        city: string;
        country: string;
        postalcode: string;
    }
}
