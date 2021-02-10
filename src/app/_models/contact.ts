import { Notes } from './notes';

export interface Contact {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    companyUrl: string;
    createdAt: string;
    updatedAt: string;
    notes: Notes[];
}
