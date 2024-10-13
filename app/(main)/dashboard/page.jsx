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

// Placeholder functions for fetch calls
const updateUsername = async (username) => {
  // Simulate an API call to update the username
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const getLatestUpdates = async () => {
  // Simulate an API call to fetch the latest updates
  return new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1, event: { title: "Meeting" }, name: "John", startTime: new Date() }]), 1000)
  );
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  // Loading state for updates and form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState(null);

  useEffect(() => {
    if (user?.username) {
      setValue("username", user.username);
    }
  }, [isLoaded, user, setValue]);

  // Fetch latest updates
  useEffect(() => {
    if (isLoaded) {
      const fetchUpdates = async () => {
        try {
          setLoading(true);
          const updates = await getLatestUpdates();
          setUpcomingMeetings(updates);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUpdates();
    }
  }, [isLoaded]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await updateUsername(data.username);
      alert("Username updated successfully!");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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
              {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
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
