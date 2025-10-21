import { UserEntity } from "./user.entity"

export type ReferralEntity = {
    _id: string
    referrerUser: UserEntity
    referredUser: UserEntity
    status: "pending" | "converted"
    creditsAwarded: number
    convertedAt: string | null
    createdAt: string
    updatedAt: string
}