import React from "react";
import Image from "next/image";

const EventsSection = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg">{event.Event_name}</h3>
          <p className="text-gray-600">{event.Event_details}</p>
          <p className="text-gray-600">
            {new Date(event.date).toLocaleDateString()}{" "}
            {new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-gray-500">Type: {event.Event_Type}</p>
          <p className="text-gray-500">Lead: {event.Event_lead}</p>
          <p className="text-gray-500">Attendance: {event.Attendance}</p>
          <p className="text-gray-500">Budget: ${event.budget}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Resources:</h4>
            <ul className="list-disc list-inside">
              {event.Resources.map((resource, idx) => (
                <li key={idx}>
                  <a
                    href={resource[0]}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold">Photos:</h4>
            <div className="flex space-x-2">
              {event.Photos[0].map((photo, idx) => (
                <Image
                  key={idx}
                  src={photo}
                  alt={`Event Photo ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsSection;
