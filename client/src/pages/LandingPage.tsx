
// import logo from '../assets/logo2.svg'
// import image from '../assets/image.png'
// import InfoCards from '../components/ui/InfoCards';
// function LandingPage() {
//   return (
//     <div className="min-h-screen">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
//         <div className="flex items-center space-x-2">
//           <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain" />
//           {/* <span className="font-bold text-2xl">MankoSathi</span>   */}
//         </div>
//         <ul className="flex space-x-6 font-medium">
//           <li className="text-teal-600 hover:text-teal-800 cursor-pointer">Home</li>
//           <li className="hover:text-teal-600 cursor-pointer">Meditation</li>
//           <li className="hover:text-teal-600 cursor-pointer">Habit</li>
//           <li className="hover:text-teal-600 cursor-pointer">Quote</li>
//           <li className="hover:text-teal-600 cursor-pointer">About Us</li>
//         </ul>
//         <button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
//           Sign Up
//         </button>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
//         <div className="md:w-1/2">
//           <h1 className="text-7xl font-bold mb-4">मनको साथी</h1>
//           <p className="text-gray-500 mb-6">
//             Find your calm. Start your journey to a peaceful mind, right here in Nepal.
//           </p>
//           <button className="bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600">
//             Begin Your Free Journey
//           </button>
//         </div>
//         <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
//           <img
//             src={image}
//             alt="Meditating person"
//             className="w-80 h-auto rounded-3xl"
//           />
//         </div>
//       </section>

//       {/* Subheading */}
//       <div className="text-center py-12">
//         <h2 className="text-3xl font-bold">A Friend For Your Mind</h2>
//       </div>
//     <InfoCards/>
//     </div>
//   );
// }

// export default LandingPage;




// import React, { useRef } from 'react';
// import logo from '../assets/logo2.svg';
// import image from '../assets/image.png';
// import habit from '../assets/habit.png';


// function LandingPage() {
//   // Refs for scrolling to sections
//   const habitsRef = useRef<HTMLElement | null>(null);
//   const meditationRef = useRef<HTMLElement | null>(null);
//   const quotesRef = useRef(null);
//   const aboutRef = useRef(null);

//   // Function to scroll to a section
//   const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
//     if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Navbar */}
//         <nav className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-0 shadow-sm bg-white">
//         <div className="flex items-center space-x-2">
//           <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain" />
//         </div>
//         <ul className="flex space-x-6 font-medium">
//           <li className="text-teal-600 hover:text-teal-800 cursor-pointer" onClick={() => scrollToSection(habitsRef)}>Habits</li>
//           <li className="hover:text-teal-600 cursor-pointer" onClick={() => scrollToSection(meditationRef)}>Meditation</li>
//           <li className="hover:text-teal-600 cursor-pointer" onClick={() => scrollToSection(quotesRef)}>Quotes</li>
//           <li className="hover:text-teal-600 cursor-pointer" onClick={() => scrollToSection(aboutRef)}>About Us</li>
//         </ul>
//         <button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
//           Sign Up
//         </button>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
//         <div className="md:w-1/2">
//           <h1 className="text-7xl font-bold mb-4">मनको साथी</h1>
//           <p className="text-gray-500 mb-6">
//             Find your calm. Start your journey to a peaceful mind, right here in Nepal.
//           </p>
//           <button className="bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600">
//             Begin Your Free Journey
//           </button>
//         </div>
//         <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
//           <img
//             src={image}
//             alt="Meditating person"
//             className="w-80 h-auto rounded-3xl"
//           />
//         </div>
//       </section>

//       {/* Subheading */}
//       <div className="text-center py-12">
//         <h2 className="text-3xl font-bold">A Friend For Your Mind</h2>
//       </div>

//       {/* Cards Section */}
//       <div className="flex flex-wrap justify-center gap-8 px-8 pb-16">
//         {/* Habit Card */}
//         <div 
//           className="w-72 bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
//           onClick={() => scrollToSection(habitsRef)}
//         >
//           <div className="text-center mb-4">
//             <i className="fas fa-tasks text-4xl text-teal-500"></i>
//           </div>
//           <h3 className="text-xl font-semibold text-center mb-3">Habits</h3>
//           <p className="text-gray-600 text-center">
//             Track and maintain your daily habits to build a better routine
//           </p>
//         </div>

//         {/* Meditation Card */}
//         <div 
//           className="w-72 bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
//           onClick={() => scrollToSection(meditationRef)}
//         >
//           <div className="text-center mb-4">
//             <i className="fas fa-spa text-4xl text-teal-500"></i>
//           </div>
//           <h3 className="text-xl font-semibold text-center mb-3">Meditation</h3>
//           <p className="text-gray-600 text-center">
//             Relax and focus your mind with guided meditation sessions
//           </p>
//         </div>

//         {/* Quotes Card */}
//         <div 
//           className="w-72 bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
//           onClick={() => scrollToSection(quotesRef)}
//         >
//           <div className="text-center mb-4">
//             <i className="fas fa-quote-left text-4xl text-teal-500"></i>
//           </div>
//           <h3 className="text-xl font-semibold text-center mb-3">Quotes</h3>
//           <p className="text-gray-600 text-center">
//             Get daily motivational quotes to inspire your journey
//           </p>
//         </div>
//       </div>

//       {/* Scrollable Sections */}

//       {/* Habits Section (Image Left) */}
// <section ref={habitsRef} className="py-16  px-8 bg-brand-10 from-teal-50 to-teal-100 scroll-mt-20">
//   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//     {/* Left: Image */}
//     <div className="flex justify-center order-1 md:order-1">
//       <img
//         src={habit}
//         alt="Habit Tracking Illustration"
//         className="rounded-2xl shadow-lg w-150 md:w-[500px] hover:scale-105 transform transition duration-300"
//       />
//     </div>

//     {/* Right: Content */}
//     <div className="order-2 md:order-2">
//       <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6 text-center md:text-left">
//         Build Habits That Last
//       </h2>
//       <p className="text-lg text-gray-700 mb-6">
//         Developing healthy habits is the foundation of a peaceful and mindful life. 
//         Our habit tracking system empowers you to stay consistent, motivated, and aware of your progress.
//       </p>

//       <ul className="space-y-3 text-gray-700">
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">✔</span> Establish a consistent meditation practice</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">✔</span> Track your daily mindfulness activities</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">✔</span> Set reminders for your practice sessions</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">✔</span> Monitor your progress with insights & charts</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">✔</span> Celebrate milestones and achievements</li>
//       </ul>

//       <p className="mt-6 text-lg text-gray-700">
//         Over time, these habits will help you rewire your brain for 
//         <span className="font-semibold text-teal-700"> greater peace, focus, and emotional balance</span>.
//       </p>
//     </div>
//   </div>
// </section>

//       {/* Meditation Section (Image Right) */}
// <section ref={meditationRef} className="py-16 px-8 bg-brand-10 from-indigo-50 to-blue-100 scroll-mt-20">
//   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//     {/* Left: Content */}
//     <div className="order-2 md:order-1">
//       <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 text-center md:text-left">
//         Guided Meditation for Inner Peace
//       </h2>
//       <p className="text-lg text-gray-700 mb-6">
//         Our guided meditation sessions are crafted to help you release stress, sharpen focus, 
//         and reconnect with your inner calm. Whether you're a beginner or experienced practitioner, 
//         we provide structured paths for growth.
//       </p>

//       <ul className="space-y-3 text-gray-700">
//         <li className="flex items-start"><span className="text-indigo-600 text-xl mr-2">🧘</span> Beginner-friendly meditation guides</li>
//         <li className="flex items-start"><span className="text-indigo-600 text-xl mr-2">🌿</span> Stress reduction & relaxation techniques</li>
//         <li className="flex items-start"><span className="text-indigo-600 text-xl mr-2">🎯</span> Focus and concentration exercises</li>
//         <li className="flex items-start"><span className="text-indigo-600 text-xl mr-2">🌙</span> Sleep meditations for deep rest</li>
//         <li className="flex items-start"><span className="text-indigo-600 text-xl mr-2">☀️</span> Daily mindfulness practices</li>
//       </ul>

//       <p className="mt-6 text-lg text-gray-700">
//         Each session blends <span className="font-semibold text-indigo-700">traditional Nepalese mindfulness practices</span> with 
//         <span className="font-semibold text-indigo-700"> modern psychology</span> to guide you toward harmony and balance.
//       </p>
//     </div>

//     {/* Right: Image */}
//     <div className="flex justify-center order-1 md:order-2">
//       <img
//         src="/images/meditation.png"
//         alt="Meditation Illustration"
//         className="rounded-2xl shadow-lg w-80 md:w-full hover:scale-105 transform transition duration-300"
//       />
//     </div>
//   </div>
// </section>

// {/* Quotes Section (Image Left) */}
// <section ref={quotesRef} className="py-16 px-8 bg-brand-10 from-teal-50 to-emerald-100 scroll-mt-20">
//   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//     {/* Left: Image */}
//     <div className="flex justify-center order-1 md:order-1">
//       <img
//         src="/images/quotes.png"
//         alt="Inspirational Quotes"
//         className="rounded-2xl shadow-lg w-80 md:w-full hover:scale-105 transform transition duration-300"
//       />
//     </div>

//     {/* Right: Content */}
//     <div className="order-2 md:order-2">
//       <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6 text-center md:text-left">
//         Daily Inspiration & Wisdom
//       </h2>
//       <p className="text-lg text-gray-700 mb-6">
//         Start every morning with uplifting quotes and timeless wisdom. 
//         Our curated collection brings together insights from the Himalayas to modern thought leaders.
//       </p>

//       <ul className="space-y-3 text-gray-700">
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">📜</span> Ancient wisdom from Nepalese & Tibetan traditions</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">💡</span> Modern insights from mindfulness teachers</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">🌱</span> Encouragement during difficult times</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">🕊</span> Perspectives on peace, compassion & awareness</li>
//         <li className="flex items-start"><span className="text-teal-600 text-xl mr-2">🔔</span> Personalized daily reminders</li>
//       </ul>

//       <div className="border-l-4 border-teal-500 pl-4 my-6">
//         <p className="text-xl italic">"The mind is everything. What you think you become."</p>
//         <p className="mt-2 text-teal-600 font-medium">– Buddha</p>
//       </div>

//       <p className="text-lg text-gray-700">
//         Let these <span className="font-semibold text-teal-700">words of wisdom</span> brighten your mornings and 
//         inspire your mindfulness journey.
//       </p>
//     </div>
//   </div>
// </section>

// {/* About Us Section (Image Right) */}
// <section ref={aboutRef} className="py-16 px-8 bg-brand-10 from-orange-50 to-amber-100 scroll-mt-20">
//   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//     {/* Left: Content */}
//     <div className="order-2 md:order-1">
//       <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6 text-center md:text-left">
//         About मनको साथी (MankoSathi)
//       </h2>
//       <p className="text-lg text-gray-700 mb-6">
//         Born in the heart of Nepal, <span className="font-semibold text-amber-700">मनको साथी</span> 
//         draws inspiration from the ancient wisdom of the Himalayas and the urgent need for mental wellness in today’s fast-paced world.
//       </p>
//       <p className="text-lg text-gray-700 mb-6">
//         Our mission is to make <span className="font-semibold text-amber-700">mindfulness and meditation accessible</span> 
//         to everyone, especially in Nepal and South Asia, where culturally relevant approaches are deeply valued.
//       </p>
//       <p className="text-lg text-gray-700 mb-6">
//         By combining <span className="font-semibold text-amber-700">traditional practices</span> with 
//         <span className="font-semibold text-amber-700"> modern technology</span>, we create tools that empower you to live a balanced, meaningful life.
//       </p>
//       <p className="text-lg text-gray-700">
//         Our diverse team includes meditation teachers, mental health professionals, and developers 
//         dedicated to building a community of peace, compassion, and awareness.
//       </p>
//     </div>

//     {/* Right: Image */}
//     <div className="flex justify-center order-1 md:order-2">
//       <img
//         src="/images/about-us.png"
//         alt="About Us"
//         className="rounded-2xl shadow-lg w-80 md:w-full hover:scale-105 transform transition duration-300"
//       />
//     </div>
//   </div>
// </section>

//       {/* Footer */}
//       <footer className="bg-teal-800 text-white py-12 px-8">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">मनको साथी</h3>
//             <p>Your companion for mental wellness and inner peace</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li className="cursor-pointer hover:text-teal-200" onClick={() => scrollToSection(habitsRef)}>Habits</li>
//               <li className="cursor-pointer hover:text-teal-200" onClick={() => scrollToSection(meditationRef)}>Meditation</li>
//               <li className="cursor-pointer hover:text-teal-200" onClick={() => scrollToSection(quotesRef)}>Quotes</li>
//               <li className="cursor-pointer hover:text-teal-200" onClick={() => scrollToSection(aboutRef)}>About Us</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
//             <p>Email: info@mankosathi.com</p>
//             <p>Phone: +977 1 4123456</p>
//             <p>Kathmandu, Nepal</p>
//           </div>
//         </div>
//         <div className="text-center mt-8 pt-6 border-t border-teal-700">
//           <p>© 2023 MankoSathi. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;


import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ListChecks, BookOpen, BrainCircuit } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import logo from '../assets/logo2.svg';
import image from '../assets/image.png';
import habit from '../assets/habit.jpg';
import quote from '../assets/quote.jpg';
import meditation from "../assets/meditation.png"

// --- Reusable Feature Card ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-md p-6 w-80 text-center cursor-pointer transform transition-transform hover:-translate-y-2"
    onClick={onClick}
  >
    <div className="flex justify-center mb-4">
      <div className="bg-brand-100 p-4 rounded-full">
        <Icon className="w-8 h-8 text-brand-500" />
      </div>
    </div>
    <h3 className="text-xl font-bold text-brand-950 mb-3">{title}</h3>
    <p className="text-brand-700">{description}</p>
  </div>
);

function LandingPage() {
  // Refs for scroll
  const habitsRef = useRef<HTMLElement | null>(null);
  const meditationRef = useRef<HTMLElement | null>(null);
  const quotesRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-brand-50 font-sans">
      {/* --- Navbar --- */}
      <nav className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-2 shadow-sm bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          <span className="text-2xl font-bold text-brand-950">ManKoSathi</span>
        </div>
        <ul className="hidden md:flex items-center gap-6 font-semibold text-brand-800">
          <li className="hover:text-brand-500 cursor-pointer" onClick={() => scrollToSection(habitsRef)}>Habits</li>
          <li className="hover:text-brand-500 cursor-pointer" onClick={() => scrollToSection(meditationRef)}>Meditation</li>
          <li className="hover:text-brand-500 cursor-pointer" onClick={() => scrollToSection(quotesRef)}>Quotes</li>
          <li className="hover:text-brand-500 cursor-pointer" onClick={() => scrollToSection(aboutRef)}>About</li>
        </ul>
        <div className="flex items-center gap-4">
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-500">Log In</Link>
          <Link to="/register" className="bg-brand-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-600 transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* --- Hero --- */}
      <section className="flex flex-col md:flex-row items-center justify-between  mx-auto px-4 sm:px-8 py-16 md:py-24">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-950 mb-4">मनको साथी</h1>
          <p className="text-lg text-brand-700 mb-8">
            Find your calm. Start your journey to a peaceful mind, right here in Nepal.
          </p>
          <Link to="/register" className="inline-block bg-brand-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors text-lg">
            Begin Your Free Journey
          </Link>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <img src={image} alt="Meditating person" className="w-full max-w-sm h-auto rounded-3xl shadow-lg" />
        </div>
      </section>

      {/* --- Subheading --- */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-brand-950">A Friend For Your Mind</h2>
      </div>

      {/* --- Cards --- */}
      <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-8 pb-16">
        <FeatureCard
          icon={ListChecks}
          title="Habits"
          description="Track and maintain your daily habits to build a stronger, mindful routine."
          onClick={() => scrollToSection(habitsRef)}
        />
        <FeatureCard
          icon={BrainCircuit}
          title="Meditation"
          description="Relax and focus your mind with guided meditation sessions."
          onClick={() => scrollToSection(meditationRef)}
        />
        <FeatureCard
          icon={BookOpen}
          title="Quotes"
          description="Get daily motivational quotes to inspire your journey."
          onClick={() => scrollToSection(quotesRef)}
        />
      </div>

      {/* --- Habits Section --- */}
      <section ref={habitsRef} className="py-20 px-4 sm:px-8 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={habit} alt="Habit Tracking" className="rounded-2xl shadow-lg w-full max-w-md" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-brand-950 mb-6">Build Habits That Last</h2>
            <p className="text-lg text-brand-700 mb-6">
              Building mindful habits is key to living with balance. Our habit tracker helps you
              stay consistent, celebrate small wins, and see your progress grow over time.
            </p>
            <ul className="space-y-3 text-brand-800 text-lg">
              <li>✔ Establish a daily meditation routine</li>
              <li>✔ Track mindfulness and gratitude practices</li>
              <li>✔ Stay motivated with streaks & reminders</li>
              <li>✔ Gain insights into your lifestyle patterns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Meditation Section --- */}
      <section ref={meditationRef} className="py-20 px-4 sm:px-8 bg-brand-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-brand-950 mb-6">Guided Meditation for Inner Peace</h2>
            <p className="text-lg text-brand-700 mb-6">
              Take a moment to pause. Our guided meditation library is designed to help you relieve stress,
              sharpen focus, and find calm in the middle of life’s busyness.
            </p>
            <ul className="space-y-3 text-brand-800 text-lg">
              <li>🧘 Beginner-friendly step-by-step guides</li>
              <li>🌿 Stress relief & relaxation practices</li>
              <li>🎯 Focus-enhancing breathing techniques</li>
              <li>🌙 Sleep meditations for deep rest</li>
              <li>☀️ Daily mindfulness prompts</li>
            </ul>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <img src={meditation} alt="Meditation" className="rounded-2xl shadow-lg w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* --- Quotes Section --- */}
      <section ref={quotesRef} className="py-20 px-4 sm:px-8 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={quote} alt="Quotes" className="rounded-2xl shadow-lg w-full max-w-md"/>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-brand-950 mb-6">Daily Inspiration & Wisdom</h2>
            <p className="text-lg text-brand-700 mb-6">
              Feed your soul with daily inspiration. Our curated quotes uplift your spirit,
              motivate your journey, and remind you of timeless wisdom.
            </p>
            <blockquote className="border-l-4 border-brand-500 pl-4 italic text-lg text-brand-800">
              "The mind is everything. What you think you become." <br />
              <span className="font-semibold text-brand-600">– Buddha</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section ref={aboutRef} className="py-20 px-4 sm:px-8 bg-brand-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-brand-950 mb-6">About मनको साथी (ManKoSathi)</h2>
            <p className="text-lg text-brand-700 mb-4">
              Born in the heart of Nepal, मनको साथी is more than just a platform, it is a companion
              for your mental wellness journey. Inspired by the wisdom of the Himalayas,
              we bring balance, calm, and purpose to your everyday life.
            </p>
            <p className="text-lg text-brand-700">
              By blending <span className="font-semibold text-brand-800">traditional practices</span> with
              <span className="font-semibold text-brand-800"> modern technology</span>, we make mindfulness
              accessible to everyone, anytime, anywhere.
            </p>
          </div>
          {/* <div className="flex justify-center">
            <img src="/images/about-us.png" alt="About Us" className="rounded-2xl shadow-lg w-full max-w-md" />
          </div> */}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-brand-700 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ManKoSathi</h3>
            <p className="text-brand-200">
              Your daily companion for building habits, practicing mindfulness, and finding peace.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-brand-200">
              <li className="hover:text-white cursor-pointer" onClick={() => scrollToSection(habitsRef)}>Habits</li>
              <li className="hover:text-white cursor-pointer" onClick={() => scrollToSection(meditationRef)}>Meditation</li>
              <li className="hover:text-white cursor-pointer" onClick={() => scrollToSection(quotesRef)}>Quotes</li>
              <li className="hover:text-white cursor-pointer" onClick={() => scrollToSection(aboutRef)}>About</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-brand-200">
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Community</li>
              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-brand-200">Follow us on social media for daily inspiration.</p>
            <div className="flex gap-4 mt-4">
              <span className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-600"><FontAwesomeIcon icon={faInstagram} /></span>
              <span className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-600"><FontAwesomeIcon icon={faFacebook} /></span>
              <span className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-600"><FontAwesomeIcon icon={faTwitter} /></span>
            </div>
          </div>
        </div>
        <div className="text-center text-brand-200 mt-8">
          © 2025 ManKoSathi. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
