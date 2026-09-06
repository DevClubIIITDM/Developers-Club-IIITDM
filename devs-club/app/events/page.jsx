"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../(components)/Navbar";
import { Footer } from "../(components)/Footer";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CalendarDays, MapPin, Clock, ExternalLink } from "lucide-react";
import LoadingSpinner from "../(components)/LoadingSpinner";
import HeroSection from "./(components)/HeroSection";
import Image from "next/image";
import Link from "next/link";

const separateEvents = (events) => {
  const currentDate = new Date();
  return events.reduce(
    (acc, event) => {
      const eventDate = new Date(event.date);
      if (eventDate < currentDate) {
        acc.pastEvents.push(event);
      } else {
        acc.upcomingEvents.push(event);
      }
      return acc;
    },
    { pastEvents: [], upcomingEvents: [] },
  );
};

const EventCard = ({ event, isPastEvent, onViewDetails }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden 
              transform transition duration-300 hover:scale-105 
              flex flex-col h-[350px] border-0"
  >
    {isPastEvent && (
      <div className="relative h-48">
        {" "}
        {/* Increased height from h-32 to h-48 */}
        {event.Photos && event.Photos[0] && event.Photos[0][0] ? (
          <img
            src={event.Photos[0][0]}
            alt={event.Event_name}
            className="w-full h-full object-cover rounded-t-3xl" // Ensure full image covers the space
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 
                         flex items-center justify-center rounded-t-3xl"
          >
            <span className="text-white text-sm font-semibold">
              No Image Available
            </span>
          </div>
        )}
        <div
          className="absolute top-0 right-0 m-2 px-2 py-0.5 bg-black bg-opacity-50 
                      text-white text-xs rounded-full"
        >
          Past Event
        </div>
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-3 flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          {event.Event_name}
        </h3>
      </div>
      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
        {event.Event_details}
      </p>
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span>{event.location || "Location TBA"}</span>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(event)}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md flex items-center justify-center space-x-2"
      >
        <span>View Details</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const EventDetailsDialog = ({ event, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        {event.Event_name}
      </h2>
      <div className="space-y-4">
        <p className="text-gray-800">{event.Event_details}</p>
        <p className="text-gray-800">{event.Event_description}</p>
        <div className="flex items-center text-gray-700">
          <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            {new Date(event.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800">
            {event.Resources && event.Resources.length > 0
              ? event.Resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline mr-4"
                  >
                    {resource[1] || "Resource " + (index + 1)}
                  </a>
                ))
              : "No resources available"}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 shadow-md"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/events");
        if (response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const { pastEvents, upcomingEvents } = separateEvents(events);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroSection />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4 px-6 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold tracking-wide"
          >
            EVENTS & WORKSHOPS
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Discover Our Events
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Join us for exciting gatherings, workshops, and celebrations. Stay
            updated with our latest events and be part of our growing community.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-xl shadow-sm p-1 bg-white"
            role="group"
          >
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                  : "bg-transparent text-gray-700 hover:bg-gray-50"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "past"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                  : "bg-transparent text-gray-700 hover:bg-gray-50"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {(activeTab === "upcoming" ? upcomingEvents : pastEvents).map(
                (event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    isPastEvent={activeTab === "past"}
                    onViewDetails={handleViewDetails}
                  />
                ),
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No Events Message */}
        {!isLoading &&
          (activeTab === "upcoming" ? upcomingEvents : pastEvents).length ===
            0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {activeTab} events at the moment
                </h3>
                <p className="text-gray-600">
                  Check back soon for more exciting events!
                </p>
              </div>
            </motion.div>
          )}
      </motion.div>

      {
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 text-center relative overflow-hidden px-4 sm:px-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 opacity-90 rounded-2xl" />
          <div className="relative z-10 p-6 sm:p-16 backdrop-blur-sm">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white tracking-tight"
            >
              Vashisht Hackathon 2.0
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-base sm:text-xl mb-8 sm:mb-10 text-blue-50 max-w-2xl mx-auto leading-relaxed px-4"
            >
              A 48-hour mega tech hackathon bringing innovators together to
              solve real-world challenges with cutting-edge technology and
              limitless creativity.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center"
            >
              <Link
                target="_blank"
                href="/vashishthackathon"
                className="inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-white text-blue-800 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-lg gap-2"
              >
                Join Now
              </Link>
            </motion.div>

            {/* //Background Decorations  */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </motion.div>
      }

      <Footer />

      {/* Dialog for Event Details */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsDialog event={selectedEvent} onClose={closeDialog} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
