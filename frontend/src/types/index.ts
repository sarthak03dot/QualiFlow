import { Node, Edge } from '@xyflow/react';

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface Survey {
    _id: string;
    title: string;
    description?: string;
    nodes: Node[];
    edges: Edge[];
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt: string;
    user: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}
