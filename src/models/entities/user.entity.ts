export type UserEntity = {
    id: string;
    referralCode: string;
    name: string;
    email: string;
    role: string;
    credits: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}