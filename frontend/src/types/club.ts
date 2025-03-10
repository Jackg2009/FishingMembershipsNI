import { Member, Committee } from './index';
import { FishingEvent } from './index';

export interface Club {
    id: string;
    name: string;
    description: string;
    houseNumber: number,
    streetName: string,
    locality: string,
    postcode: string,
    location: string;
    telephone: string;
    createdDate: Date;
    createdBy: string;
    clubLogo: string;
    members: Member[];
    committee: Committee[];
    events: FishingEvent[];
    applicants?: string[];
}
