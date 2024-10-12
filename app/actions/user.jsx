"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { error } from "console";

export async function updateUsername(username) {
    const {userId} = auth;
    if (!userId) {
        throw new Error("Unauthorized")
    }
    const existingUsername = await db.user.findUnique({
        where: {username},
    });
    if (existingUsername && existingUsername.id!==userId) {
        throw new Error("Username has already taken");
    }
    await db.user.update({
        where: {clerkUserId: userId},
        data : {username},
    });   
    await clerkClient.user.updateUser(userId,{
        username,
    });
    return {success: true};
}
