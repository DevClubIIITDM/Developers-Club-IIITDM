"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../(components)/Navbar";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Footer } from "../(components)/Footer";
import AdminPage from "./(components)/AdminPage";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";

export default function AdminDashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [allowedEmails, setAllowedEmails] = useState([]);

  useEffect(() => {
    async function fetchAllowedEmails() {
      try {
        const response = await axios.get("/api/admin");
        const emails = response.data.data.map((admin) => admin.email);
        setAllowedEmails(emails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching allowed emails:", error);
        setLoading(false);
      }
    }
    fetchAllowedEmails();
  }, []);

  useEffect(() => {
    const email = user?.emailAddresses[0]?.emailAddress;
    console.log("Allowed Emails:", allowedEmails);
    console.log("User Email:", user?.emailAddresses[0]?.emailAddress);
    if (!isLoaded || loading) return;

    if (
      !isSignedIn ||
      !allowedEmails.map((e) => e.toLowerCase()).includes(email)
    ) {
      console.log("your email is", email);
      router.push("/unauthorized");
    } else {
      // Simulate loading for 5 seconds before rendering the page
      setTimeout(() => setLoading(false), 5000);
    }
  }, [isLoaded, isSignedIn, allowedEmails, user, loading, router]);

  // Show a loading state until `useUser` is fully loaded
  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen flex-col space-y-4">
        <AiOutlineLoading className="animate-spin text-blue-600" size={40} />
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AdminPage />
      <Footer />
    </div>
  );
}
