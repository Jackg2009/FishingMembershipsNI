import { Member, Committee } from './index';
import { FishingEvent } from './index';

export interface Club {
    id: string;
    name: string;
    description: string;
    clubLogo: string;
    location: string;
    telephone: string;
    createdAt: Date;
    createdBy: string;
    members: Member[];
    committee: Committee[];
    events: FishingEvent[];
    appliedMembers?: string[];
}
