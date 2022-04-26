export interface TypeAccount {
    value: string;
    viewValue: string;
}

export interface Bank {
    name: string;
    id: string;
}

export interface Recipient {
    rut: string;
    fullName: string;
    email: string;
    phone: string;
    bankId: string;
    typeAccount: string;
    accountNumber: string;
    amount?: number;
}
