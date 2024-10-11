import { clerkClient, currentUser } from "@clerk/nextjs/server"; // Correct the import
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  try {
    // Check if the user exists in the database
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    // Update the user in Clerk
    await clerkClient.users.updateUser(user.id, {
      username: name.split(" ").join("-") + user.id.slice(-4),
    });

    // Create a new user in your database
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress || "", // Add null check for email
        username: name.split(" ").join("-") + user.id.slice(-4),
      },
    });

    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
