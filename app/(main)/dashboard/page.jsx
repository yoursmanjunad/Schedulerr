"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { usernameSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/user";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  // Set the form value with the current user's username
  useEffect(() => {
    if (user?.username) {
      setValue("username", user.username);
    }
  }, [isLoaded, user, setValue]);

  // Hook for updating the username with better error handling
  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    fnUpdateUsername(data.username);
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName || "Guest"}!</CardTitle>
        </CardHeader>
      </Card>

      {/* Form to Update Username */}
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{typeof window !== "undefined" ? `${window.location.origin}/` : ""}</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              {apiError && (
                <p className="text-red-500 text-sm mt-1">{apiError}</p>
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit" disabled={loading}>
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
