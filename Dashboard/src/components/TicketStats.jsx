import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const TicketStats = () => {
  const [totalTickets, setTotalTickets] = useState(50); // Initial total tickets count
  const [openTickets, setOpenTickets] = useState(20); // Initial open tickets count
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert

  // Function to increment total tickets count when a new ticket is received
  const receiveNewTicket = () => {
    setTotalTickets(prevTotalTickets => prevTotalTickets + 1);
    setOpenTickets(prevOpenTickets => prevOpenTickets + 1);
    setShowAlert(true); // Show the alert when a new ticket is received
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after 3 seconds
    }, 3000);
  };

  return (
    <div className="flex justify-between bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          <FontAwesomeIcon icon={faTicketAlt} className="mr-2 text-blue-500" />
          Total Tickets
        </h2>
        <p className="text-4xl font-bold text-blue-600">{totalTickets}</p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-green-500" />
          Open Tickets
        </h2>
        <p className="text-4xl font-bold text-green-600">{openTickets}</p>
      </div>
      {/* Alert message for new ticket */}
      {showAlert && (
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-green-200 text-green-700 px-4 py-2 rounded-md shadow-md">
          You received a new ticket!
        </div>
      )}
      {/* Button to simulate receiving a new ticket */}
      <button
        onClick={receiveNewTicket}
        className="sr-only"
      >
        Receive New Ticket
      </button>
    </div>
  );
};

export default TicketStats;
