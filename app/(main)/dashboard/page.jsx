"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usernameSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateUsername } from "@/app/actions/user";
import useFetch from "@/hooks/use-fetch";

// Define schema using Zod
// const usernameSchema = z.object({
//   username: z.string()
//     .min(3, { message: "Username must be at least 3 characters long" })
//     .max(20, { message: "Username can't be more than 20 characters" })
//     .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" }),
// });

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  // Initialize useForm with zodResolver and schema
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(()=>{
    setValue("username", user?.username);
  },[isLoaded]);
  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    await fnUpdateUsername(data.username);
  };


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome {user?.firstName}</CardTitle>
        </CardHeader>
      </Card>

      {/* Unique Link Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your unique link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{typeof window !== "undefined" ? `${window.location.origin}/` : ""}</span>
                <Input
                  placeholder="username"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
