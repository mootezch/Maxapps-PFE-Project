import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faFileAlt, faCalendarAlt, faTags, faEnvelopeOpen, faSun, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests
import { useQuery,useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const makeStyle = (status) => {
  if (status === 'New') {
    return {
      background: '#FFA500', // Orange background for "New"
      color: 'white',
    };
  } else if (status === 'Open') {
    return {
      background: '#FFD700', // Yellow background for "Open"
      color: 'black',
    };
  } else if (status === 'Answered') {
    return {
      background: '#32CD32', // Green background for "Answered"
      color: 'white',
    };
  } else if (status === 'Closed') {
    return {
      background: '#FF4500', // Red background for "Closed"
      color: 'white',
    };
  }
};

const statusIcon = (status) => {
  if (status === 'New') {
    return <FontAwesomeIcon icon={faSun} />;
  } else if (status === 'Open') {
    return <FontAwesomeIcon icon={faEnvelopeOpen} />;
  } else if (status === 'Answered') {
    return <FontAwesomeIcon icon={faCheckCircle} />;
  } else if (status === 'Closed') {
    return <FontAwesomeIcon icon={faTimesCircle} />;
  }
};

const ConvTicket = () => {
  const { idTicket } = useParams();


  const convDiv = React.useRef(null)

  const { state } = useAuth()
  
  console.log({state})

  
  console.log({idTicket})


  const { data, refetch, isLoading, isError, error } = useQuery(["conversation", idTicket], () =>
    api_nestjs.get('/conversation/'+idTicket, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onSuccess : (res) => {

        let convHeight = convDiv.current.scrollHeight;

        convDiv.current.scrollTop = convHeight

      },
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching tickets");
      },
      refetchInterval: 1000,
    }
  );

  const {
    mutate,
  } = useMutation(async (params) => api_nestjs.post("/conversation", params, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }), {
    onSuccess: (res) => {
      setMessage(""); // Clear the input after sending
        refetch(); 

        let convHeight = convDiv.current.scrollHeight;

        convDiv.current.scrollTop = convHeight
      
    },
    onError: (error) => {
      console.log("ddd ", error)
    }
  })

  const {
    mutate : changeStatus,
  } = useMutation(async (params) => api_nestjs.put("/tickets/"+idTicket, params, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }), {
    onSuccess: (res) => {
        refetch();      
      
    },
    onError: (error) => {
      console.log("ddd ", error)
    }
  })

  const [status, setStatus] = useState(data?.status);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (data?.status !== 'closed') {


      console.log({dd : state?.user})
        mutate({message : message, idTicket : idTicket, idPersonal : state?.user?.idPersonal })


    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      mutate({message : message, idTicket : idTicket, idPersonal : state?.user?.idPersonal })

    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    changeStatus({status : newStatus})
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-4xl font-extrabold mb-6 text-center text-blue-800">Ticket Conversation</h3>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">Ticket Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
              <p className="text-gray-700"><strong>Project:</strong> {data?.project.nom}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
              <p className="text-gray-700"><strong> {data?.project?.client.nom}</strong> {data?.project?.client.prenom}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFileAlt} className="text-blue-600" />
              <p className="text-gray-700"><strong>Description:</strong> {data?.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
              <p className="text-gray-700"><strong>Date:</strong> {data?.date}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faTags} className="text-blue-600" />
              <p className="text-gray-700"><strong>Type:</strong> {data?.typeTicket}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faTags} className="text-blue-600" />
              <p className="text-gray-700"><strong>Status:</strong> {data?.status}</p>
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-gray-900 mb-1">Status:</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">Conversation</h4>
          <div ref={convDiv} className="border border-gray-300 rounded-md p-4 h-64 overflow-y-auto flex flex-col space-y-4 bg-gray-50">
            {data && data?.messages?.length > 0 && data?.messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-xl ${msg.sender === 'personal' ? 'bg-blue-100 text-blue-800 self-start' : 'bg-green-100 text-green-800 self-end'} flex items-start`}
              >
                <div className="mr-3">
                  <img src={`https://avatars.dicebear.com/api/initials/${msg.sender}.svg`} alt={msg.sender} className="w-10 h-10 rounded-full"/>
                </div>
                <div>
                  <strong className="block mb-1">{msg.sender === 'personal' ? 'IMAXEAM' : 'Mootez'}</strong>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {data?.status !== 'closed' && (
          <div className="mt-4 flex items-center">
            <textarea
              className="border border-gray-300 rounded-md w-full p-3 mb-2"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-blue-500 text-white px-6 py-3 ml-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        )}
        {data?.status === 'Closed' && (
          <div className="mt-4 text-center text-gray-500">
            <p>This conversation is closed. No further messages can be sent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvTicket;
