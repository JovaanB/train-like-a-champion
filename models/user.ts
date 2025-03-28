enum Role {
    ADHERENT,
    COACH
}

interface Metadata {
    lastSignInTime: string;
    creationTime: string;
}

export interface User {
    id: string;
    displayName: string;
    email: string;
    role: Role;
    metadata: Metadata;
    programs?: string[];
    goals?: string[];
    clients: string[];
}