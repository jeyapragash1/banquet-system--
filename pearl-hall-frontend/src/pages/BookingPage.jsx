import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api';
// --- THIS IS THE CORRECTED IMPORT LINE ---
import { LuCalendarCheck, LuUsers, LuSparkles, LuCheck } from 'react-icons/lu';

// Import your booking page image
import bookingInfoImg from '../assets/images/15.jpeg';

const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-[#f72585] via-[#7367f0] to-[#4cc9f0] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const BookingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        event_date: '',
        time_slot: '',
        guests: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await apiClient.post('/v1/public-inquiry', formData);
            setIsSuccess(true);
        } catch (err) {
            setError('Submission failed. Please check your details and try again.');
            console.error("Inquiry submission error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const resetForm = () => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', event_date: '', time_slot: '', guests: '' });
    };
    
    if (isSuccess) {
        return (
            <div className="bg-gradient-to-br from-white via-purple-50 to-blue-100 animate-gradient-background py-24" style={{ backgroundSize: '400% 400%' }}>
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-lg p-12 rounded-2xl shadow-2xl">
                        {/* --- THIS IS THE CORRECTED ICON --- */}
                        <LuCheck className="text-primary mx-auto w-24 h-24 mb-6 p-4 bg-green-100 rounded-full" />
                        <h1 className="text-4xl font-black text-gray-900 mb-4">
                            <GradientText>Thank You!</GradientText>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Your event inquiry has been sent successfully. Our team will review your request and get back to you within 24 hours to confirm the details.
                        </p>
                        <button onClick={resetForm} className="bg-gradient-to-r from-accent to-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-xl transition-all inline-block">
                            Book Another Event
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gradient-to-br from-white via-purple-50 to-blue-100 animate-gradient-background" style={{ backgroundSize: '400% 400%' }}>
            <div className="container mx-auto px-6 py-24">
                <div className="max-w-6xl mx-auto bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-10">
                    <div className="lg:col-span-6 p-8 md:p-12">
                        <div className="text-left mb-10">
                            <h1 className="text-4xl md:text-5xl font-black mb-3">
                                Your <GradientText>Unforgettable Event</GradientText> Starts Here
                            </h1>
                            <p className="text-lg text-gray-600">Fill out the form to inquire about your date. We'll get back to you within 24 hours!</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <div className="bg-red-500/10 text-red-700 p-3 rounded-lg text-center font-semibold">{error}</div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition" placeholder="John Doe"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition" placeholder="you@example.com"/>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="event_date" className="block text-sm font-semibold text-gray-700 mb-1">Preferred Event Date</label>
                                    <input type="date" id="event_date" name="event_date" value={formData.event_date} onChange={handleChange} required className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition"/>
                                </div>
                                <div>
                                    <label htmlFor="time_slot" className="block text-sm font-semibold text-gray-700 mb-1">Time Slot</label>
                                    <select id="time_slot" name="time_slot" value={formData.time_slot} onChange={handleChange} required className="block w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-secondary focus:border-secondary transition">
                                        <option value="">Select a time</option>
                                        <option value="Morning (9 AM - 2 PM)">Morning (9 AM - 2 PM)</option>
                                        <option value="Afternoon (3 PM - 8 PM)">Afternoon (3 PM - 8 PM)</option>
                                        <option value="Evening (6 PM - 11 PM)">Evening (6 PM - 11 PM)</option>
                                    </select>
                                </div>
                            </div>
                             <div>
                                <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-1">Estimated Number of Guests</label>
                                <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} required className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition" placeholder="e.g., 150"/>
                            </div>
                            <div className="text-center pt-6">
                                <button
  type="submit"
  disabled={loading}
  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Sending...' : 'Send Inquiry'}
</button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-4 bg-cover bg-center p-12 flex flex-col justify-between text-white" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bookingInfoImg})` }}>
                        <div>
                            <h3 className="text-3xl font-bold mb-6">What Happens Next?</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4"><LuCalendarCheck className="w-8 h-8 flex-shrink-0 text-primary mt-1" /><div><h4 className="font-bold">1. We Check Availability</h4><p className="text-gray-200">Our team will instantly check your preferred date and time slot.</p></div></li>
                                <li className="flex items-start gap-4"><LuUsers className="w-8 h-8 flex-shrink-0 text-primary mt-1" /><div><h4 className="font-bold">2. Personal Consultation</h4><p className="text-gray-200">An event planner will contact you to discuss your vision and details.</p></div></li>
                                <li className="flex items-start gap-4"><LuSparkles className="w-8 h-8 flex-shrink-0 text-primary mt-1" /><div><h4 className="font-bold">3. Create Your Magic</h4><p className="text-gray-200">We'll finalize the plan and lock in your date to create an unforgettable event.</p></div></li>
                            </ul>
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/20 text-center"><p className="font-bold">Pearl Hall - Where Memories Are Made</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;