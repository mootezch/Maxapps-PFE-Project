import React, { useState } from 'react';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const initialPeople = [
  {
    id: 1,
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    email: 'lindsaywalton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    handle: 'courtneyhenry',
    email: 'courtneyhenry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },

];

const responsableEquipe = {
  name: 'John Doe',
  role: "Responsable d'équipe",
  imageUrl:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const Member = () => {
  const [people, setPeople] = useState(initialPeople);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

  const handleEditClick = (person) => {
    setCurrentPerson(person);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentPerson(null);
    setIsAddModalOpen(true);
  };

  const handleSave = (person) => {
    if (currentPerson) {
      setPeople(
        people.map((p) => (p.id === person.id ? person : p))
      );
    } else {
      setPeople([...people, { ...person, id: people.length + 1 }]);
    }
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleDelete = (person) => {
    setPeople(people.filter(p => p.id !== person.id));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center">
        <img
          className="mx-auto h-24 w-24 rounded-full"
          src={responsableEquipe.imageUrl}
          alt={responsableEquipe.name}
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">{responsableEquipe.name}</h2>
        <p className="text-sm text-gray-500">{responsableEquipe.role}</p>
      </div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Team members previously added to projects
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {people.map((person, personIdx) => (
            <li key={personIdx} className="py-4 flex items-center justify-between space-x-3">
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{person.role}</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center py-2 px-3 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleEditClick(person)}
                >
                  <PlusSmIcon className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900">
                    {' '}
                    Edit <span className="sr-only">{person.name}</span>{' '}
                  </span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center py-2 px-3 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDelete(person)}
                >
                  <TrashIcon className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900">
                    {' '}
                    Delete <span className="sr-only">{person.name}</span>{' '}
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleAddClick}
        >
          Add Member
        </button>
      </div>
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        person={currentPerson}
        onSave={handleSave}
      />
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

const EditMemberModal = ({ isOpen, onClose, person, onSave }) => {
  const [name, setName] = useState(person?.name || '');
  const [role, setRole] = useState(person?.role || '');
  const [email, setEmail] = useState(person?.email || '');
  const [imageUrl, setImageUrl] = useState(person?.imageUrl || '');

  const handleSave = () => {
    onSave({
      ...person,
      name,
      role,
      email,
      imageUrl,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {person ? 'Edit Member' : 'Add Member'}
              </Dialog.Title>
              <div className="mt-2">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const AddMemberModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = () => {
    onSave({
      name,
      role,
      email,
      imageUrl,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Add Member
              </Dialog.Title>
              <div className="mt-2">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Member;
