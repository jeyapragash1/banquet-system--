import React from 'react';
import { Link } from 'react-router-dom';
import { eventPackages } from '../data/dummyData.jsx';
import { LuCheck, LuStar, LuMessageSquare } from 'react-icons/lu';

// Import your package images
import package1Img from '../assets/images/111.jpg';
import package2Img from '../assets/images/11.jpg';
import package3Img from '../assets/images/14.jpg';

const packageImages = [package1Img, package2Img, package3Img];

const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-[#f72585] via-[#7367f0] to-[#4cc9f0] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const PublicPackages = () => {
    return (
        <div className="bg-gradient-to-br from-white via-purple-50 to-blue-100 text-gray-800 animate-gradient-background" style={{ backgroundSize: '400% 400%' }}>
            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 animate-fadeInDown">
                        Find Your <GradientText>Perfect Package</GradientText>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Choose from our curated packages, or contact us to build a custom experience tailored just for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
                    {eventPackages.map((pkg, index) => (
                        <div key={index} 
                            className={`rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl flex flex-col transform hover:-translate-y-3 transition-all duration-300 overflow-hidden ${pkg.isPopular ? 'ring-4 ring-secondary' : ''}`}>
                            
                            <div className="relative">
                                <img src={packageImages[index]} alt={pkg.name} className="w-full h-56 object-cover" />
                                {pkg.isPopular && (
                                    <div className="absolute top-4 -right-10 bg-secondary text-white text-center py-1 font-semibold flex items-center justify-center gap-2 text-sm uppercase tracking-wider transform rotate-45 w-40">
                                        <LuStar size={14} /> Popular
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                                <div className="flex items-baseline mb-8">
                                    <p className="text-5xl font-bold text-gray-800">{pkg.price.toLocaleString()}</p>
                                    <span className="text-gray-500 ml-2">/event</span>
                                </div>
                                
                                <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                                    {pkg.services.map((service, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <LuCheck className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <Link
  to="/book-now"
  className="block w-full text-center text-white font-bold py-3 px-8 rounded-lg text-lg transition-all bg-gradient-to-r from-green-400 to-green-600 hover:shadow-xl hover:scale-105"
>
  Choose Plan
</Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Package CTA */}
                <div className="mt-20 text-center bg-white/50 backdrop-blur-lg border border-white/30 p-12 rounded-2xl max-w-4xl mx-auto shadow-xl">
                    <h3 className="text-3xl font-bold mb-4">
                        <GradientText>Can't Decide?</GradientText>
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">Let's create a bespoke package that's as unique as your event. Our planners are ready to help.</p>
                    <Link to="/contact" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-black transition-all inline-flex items-center gap-2">
                        <LuMessageSquare /> Contact Our Planners
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicPackages;