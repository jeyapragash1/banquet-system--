import React from 'react';
import { Link } from 'react-router-dom';
import { LuPartyPopper, LuUtensilsCrossed, LuBriefcase, LuStar, LuThumbsUp, LuShieldCheck } from 'react-icons/lu';

// IMPORTANT: Make sure these images exist in your `src/assets/images/` folder
import heroBg from '../assets/images/hb.jpeg';
import ctaBg from '../assets/images/10.jpg';
import gallery1 from '../assets/images/h1.jpg';
import gallery2 from '../assets/images/h2.jpeg';
import gallery3 from '../assets/images/h3.jpeg';
import gallery4 from '../assets/images/h4.jpg';

// Reusable component for gradient text titles with bright colors
const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-[#f72585] via-[#7367f0] to-[#4cc9f0] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const HomePage = () => {
  return (
    // <-- CORRECTED: Using the new .animate-gradient-background class -->
    <div 
      className="bg-gradient-to-br from-white via-purple-50 to-blue-100 text-gray-800 animate-gradient-background" 
      style={{ backgroundSize: '400% 400%' }}
    >
      
      {/* ======================= HERO SECTION ======================= */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* <-- CORRECTED: Using the new .animate-ken-burns class --> */}
        <div 
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

        <div className="relative z-10 p-8 text-center max-w-5xl mx-auto">
          <h1 
            className="text-5xl md:text-8xl font-black mb-6 drop-shadow-lg animate-fadeInDown"
            style={{ animationDelay: '0.2s' }}
          >
            Exquisite Events, <GradientText>Timeless Memories</GradientText>
          </h1>
          <p 
            className="text-xl md:text-2xl mb-10 text-gray-700 font-medium drop-shadow-md animate-fadeInUp"
            style={{ animationDelay: '0.4s' }}
          >
            Your perfect venue for life's greatest moments. Meticulously planned, beautifully executed.
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Link to="/book-now" className="bg-gradient-to-r from-[#f72585] to-[#7367f0] text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl hover:shadow-[#7367f0]/50 transition-all transform hover:scale-105 duration-300 inline-block">
              Book Your Event Today
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= SERVICES SECTION ======================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Our <GradientText>Premier Services</GradientText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* WHITE "Glassmorphism" card style */}
            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30 shadow-2xl transform hover:-translate-y-3 transition-all duration-300">
              <div className="bg-gradient-to-r from-[#f72585] to-[#7367f0] p-4 rounded-full inline-block mb-6 shadow-lg">
                <LuPartyPopper className="text-white w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Weddings & Receptions</h3>
              <p className="text-gray-600">Crafting the perfect day with beautiful decor, exquisite catering, and seamless coordination.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30 shadow-2xl transform hover:-translate-y-3 transition-all duration-300">
              <div className="bg-gradient-to-r from-[#f72585] to-[#7367f0] p-4 rounded-full inline-block mb-6 shadow-lg">
                <LuBriefcase className="text-white w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Corporate Events</h3>
              <p className="text-gray-600">Host your conferences, seminars, and company parties in a professional and inspiring setting.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30 shadow-2xl transform hover:-translate-y-3 transition-all duration-300">
              <div className="bg-gradient-to-r from-[#f72585] to-[#7367f0] p-4 rounded-full inline-block mb-6 shadow-lg">
                <LuUtensilsCrossed className="text-white w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Private Parties</h3>
              <p className="text-gray-600">From birthdays to anniversaries, we provide a versatile space for any celebration.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ======================= WHY CHOOSE US ======================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              Why Choose <GradientText>Pearl Hall?</GradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="text-center p-6">
                    <LuStar className="text-yellow-500 mx-auto mb-4" size={50} />
                    <h3 className="text-2xl font-bold mb-3">Elegant Venue</h3>
                    <p className="text-gray-600">A beautifully designed space that adds a touch of class and sophistication to any event.</p>
                </div>
                <div className="text-center p-6">
                    <LuThumbsUp className="text-yellow-500 mx-auto mb-4" size={50} />
                    <h3 className="text-2xl font-bold mb-3">Expert Staff</h3>
                    <p className="text-gray-600">Our dedicated team is committed to making your event flawless from start to finish.</p>
                </div>
                 <div className="text-center p-6">
                    <LuShieldCheck className="text-yellow-500 mx-auto mb-4" size={50} />
                    <h3 className="text-2xl font-bold mb-3">All-Inclusive Packages</h3>
                    <p className="text-gray-600">Customizable packages that cover everything you need, ensuring a stress-free experience.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* ======================= GALLERY ======================= */}
      <section className="py-24 bg-white/20 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              Glimpses of <GradientText>Our Hall</GradientText>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img src={gallery1} className="rounded-lg shadow-2xl w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" alt="Gallery 1" />
                <img src={gallery2} className="rounded-lg shadow-2xl w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" alt="Gallery 2" />
                <img src={gallery3} className="rounded-lg shadow-2xl w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" alt="Gallery 3" />
                <img src={gallery4} className="rounded-lg shadow-2xl w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" alt="Gallery 4" />
            </div>
        </div>
      </section>
      
      {/* ======================= TESTIMONIALS ======================= */}
      <section className="py-24">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">
                What Our <GradientText>Clients Say</GradientText>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                  <div className="bg-white/50 backdrop-blur-lg border border-white/30 p-8 rounded-lg shadow-lg text-left">
                      <p className="text-gray-600 italic mb-4">"Pearl Hall made our wedding day absolutely perfect. The staff was incredible, and the venue was breathtaking. We couldn't have asked for more!"</p>
                      <p className="font-bold text-secondary">- Sarah & Tom</p>
                  </div>
                   <div className="bg-white/50 backdrop-blur-lg border border-white/30 p-8 rounded-lg shadow-lg text-left">
                      <p className="text-gray-600 italic mb-4">"We hosted our annual corporate event here, and it was a massive success. Professional service and a fantastic atmosphere. Highly recommended."</p>
                      <p className="font-bold text-secondary">- John D, CEO of TechCorp</p>
                  </div>
              </div>
          </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section className="py-24 bg-cover bg-center" style={{ backgroundImage: `url(${ctaBg})` }}>
          <div className="container mx-auto px-6 text-center bg-black/43 py-20 rounded-lg">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Plan Your Perfect Event?</h2>
              <p className="text-xl text-gray-200 mb-8">Contact us today to check availability and get a personalized quote.</p>
              <Link to="/contact" className="bg-gradient-to-r from-[#28c76f] to-green-400 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-xl transition-shadow duration-300 inline-block">
                Contact Us Now
              </Link>
          </div>
      </section>
    </div>
  );
};

export default HomePage;