export interface LoginPayload {
    email: string;
    password: string;
}

export interface Survey {
    _id: string;
    title: string;
    nodes: unknown[];
    edges: unknown[];
}
