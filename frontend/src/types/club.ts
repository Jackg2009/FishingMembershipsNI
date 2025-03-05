import { Member, Committee, Event } from './index';

export interface Club {
    id: string;
    name: string;
    description: string;
    location: string;
    members: Member[];
    committee: Committee[];
    events: Event[];
    appliedMembers?: string[]; // List of applied member IDs
}
