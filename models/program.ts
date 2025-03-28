interface ProgramSession {
    id: string;
    order: number;
    mandatory: boolean;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    sessions: ProgramSession[];
}