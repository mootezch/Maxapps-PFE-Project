import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faSun, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const makeStyle = (status) => {
  if (status === 'new') {
    return {
      background: '#FFA500', // Orange background for "new"
      color: 'white',
    };
  } else if (status === 'open') {
    return {
      background: '#FFD700', // Yellow background for "open"
      color: 'black',
    };
  } else if (status === 'answered') {
    return {
      background: '#32CD32', // Green background for "answered"
      color: 'white',
    };
  }
};

const statusIcon = (status) => {
  if (status === 'new') {
    return <FontAwesomeIcon icon={faSun} />;
  } else if (status === 'open') {
    return <FontAwesomeIcon icon={faEnvelopeOpen} />;
  } else if (status === 'answered') {
    return <FontAwesomeIcon icon={faCheckCircle} />;
  }
};

const Ticket = () => {
  const { data: tickets, isLoading: isTicketsLoading, isError: isTicketsError, error: ticketsError } = useQuery('tickets', () =>
    api_nestjs.get('/tickets', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching tickets");
      }
    }
  );

  const { data: clients, isLoading: isClientsLoading, isError: isClientsError, error: clientsError } = useQuery('clients', () =>
    api_nestjs.get('/clients', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching clients");
      }
    }
  );





  useEffect(() => {
    if (clients && tickets) {
      console.log('Clients:', clients);
      console.log('Tickets:', tickets);
    }
  }, [clients, tickets]);

  if (isTicketsLoading || isClientsLoading) {
    return <p>Loading...</p>;
  }

  if (isTicketsError) {
    return <p>Error loading tickets: {ticketsError.message}</p>;
  }

  if (isClientsError) {
    return <p>Error loading clients: {clientsError.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6 text-center">Recent Tickets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets && tickets.map((ticket) => {
          const clientName =  `${ticket?.project.client.nom} ${ticket?.project.client.prenom}`

          return (
            <div key={ticket.idTicket} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="p-6 border-b-2 border-dashed border-gray-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 inline-block rounded-full">
                    <h4 className="text-lg font-bold">{`Ticket ${ticket.idTicket}`}</h4>
                  </div>
                </div>
                <h5 className="text-lg font-semibold text-gray-700 mb-2">{ticket.projectName}</h5>
                <p className="text-gray-600 mb-2"><strong>Client:</strong> {clientName}</p>
                <p className="text-gray-600 mb-2"><strong>Description:</strong> {ticket.description}</p>
                <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
                <p className="mb-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={makeStyle(ticket.status)}>
                    {statusIcon(ticket.status)} {ticket.status}
                  </span>
                </p>
                <p className="text-gray-600 mb-2"><strong>Type:</strong> {ticket.typeTicket}</p>
                <div className="flex justify-between items-center mt-4">
                <Link to={`/ticket/${ticket.idTicket}`} className="text-blue-500 hover:text-blue-700 focus:outline-none">View Details</Link>

                  <div className="flex items-center space-x-2">
                
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Ticket;
