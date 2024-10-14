"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

// Update username function
export async function updateUsername(params) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { username } = params;

  if (!username) {
    throw new Error("Username is required");
  }

  // Check if username already exists
  const existingUsername = await db.user.findUnique({
    where: { username },
  });

  if (existingUsername && existingUsername.id !== userId) {
    throw new Error("Username is already taken!");
  }

  // Update username in your database
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  // Update username in Clerk
  await clerkClient.users.updateUser(userId, {
    username,
  });

  return { success: true };
}
