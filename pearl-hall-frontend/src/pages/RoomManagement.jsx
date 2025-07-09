import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import apiClient from '../api';
// --- THIS IS THE CORRECTED IMPORT LINE ---
import { LuCalendarPlus, LuCalendarX } from 'react-icons/lu';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [eventInquiries, setEventInquiries] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  const fetchRooms = () => {
    setLoading(true);
    apiClient.get('/v1/rooms')
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching rooms:", error));
  };

  useEffect(() => {
    fetchRooms();

    apiClient.get('/v1/event-inquiries')
      .then(response => {
        setEventInquiries(response.data);
      })
      .catch(error => console.error("Error fetching event inquiries:", error));
  }, []);

  const openAssignModal = (room) => {
    setSelectedRoom(room);
    setSelectedEventId(room.event_inquiry_id || '');
    setIsModalOpen(true);
  };

  const handleAssignSubmit = () => {
    apiClient.put(`/v1/rooms/${selectedRoom.id}`, {
      event_inquiry_id: selectedEventId ? parseInt(selectedEventId) : null,
    })
    .then(() => {
        fetchRooms();
        setIsModalOpen(false);
    })
    .catch(error => {
        alert(error.response?.data?.message || 'Failed to assign room.');
        console.error("Failed to assign room:", error);
    });
  };

  const handleUnassign = (room) => {
    if (window.confirm(`Are you sure you want to make room "${room.name}" available?`)) {
        apiClient.put(`/v1/rooms/${room.id}`, {
            event_inquiry_id: null,
        })
        .then(() => {
            fetchRooms();
        })
        .catch(error => alert('Failed to unassign room.'));
    }
  };

  if (loading) return <div className="text-center text-white p-8">Loading Rooms...</div>;

  return (
    <div>
      <PageHeader title="Room Management (3 Rooms)" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{room.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${room.status === 'Available' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {room.status}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-3xl font-bold text-primary">LKR {parseFloat(room.price).toLocaleString()}</span>
                  <span className="text-gray-400">/ night</span>
              </div>
              {room.status === 'Booked' && room.event_inquiry && (
                  <p className="text-sm text-gray-400 mt-2">
                    Assigned to: <span className="font-semibold text-white">#{room.event_inquiry_id} ({room.event_inquiry.customer.name})</span>
                  </p>
              )}
            </div>
            
            {room.status === 'Available' ? (
                <button onClick={() => openAssignModal(room)} className="mt-6 w-full flex items-center justify-center gap-2 bg-secondary text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                    <LuCalendarPlus />
                    Assign to Event
                </button>
            ) : (
                // --- THIS IS THE CORRECTED LINE ---
                <button onClick={() => handleUnassign(room)} className="mt-6 w-full flex items-center justify-center gap-2 bg-danger text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                    <LuCalendarX />
                    Make Available
                </button>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Assign Room: ${selectedRoom?.name}`}>
        <div>
            <label htmlFor="event-select" className="block text-sm font-medium text-gray-300 mb-2">Select an Event Inquiry to assign this room to:</label>
            <select
                id="event-select"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            >
                <option value="">-- Select an Event --</option>
                {/* We filter out events that are not confirmed, as you wouldn't assign a room to a pending inquiry */}
                {eventInquiries.filter(i => i.status === 'Confirmed').map(inquiry => (
                    <option key={inquiry.id} value={inquiry.id}>
                        #{inquiry.id} - {inquiry.customer.name} ({inquiry.event_type})
                    </option>
                ))}
            </select>
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500">
                    Cancel
                </button>
                 <button onClick={handleAssignSubmit} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    Assign Room
                </button>
            </div>
        </div>
      </Modal>

    </div>
  );
};

export default RoomManagement;