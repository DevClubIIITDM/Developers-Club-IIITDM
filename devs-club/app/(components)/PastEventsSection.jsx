import React from "react";

const PastEventsSection = ({ pastEvents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pastEvents.map((event, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg">{event.Event_name}</h3>
          <p className="text-gray-600">{event.Event_details}</p>
          <p className="text-gray-500">
            Date: {new Date(event.date).toLocaleDateString()}{" "}
            {new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-gray-500">Type: {event.Event_Type}</p>
        </div>
      ))}
    </div>
  );
};

export default PastEventsSection;
