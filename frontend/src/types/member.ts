export interface Member {
    id: string;
    name: string;
    role?: 'member' | 'committee'; // Optional role
}

export interface Committee extends Member {
    role: 'committee'; // Only committee members have this role
}

export interface MemberWithApplicationStatus extends Member {
    appliedToClubs: string[]; // Track applied clubs
}
