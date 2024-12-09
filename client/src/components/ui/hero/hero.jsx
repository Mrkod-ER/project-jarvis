import Image from 'next/image';
import Link from 'next/link';
import heroImage from '../images/hero-image.png';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Simplify Your <span className="text-blue-500">Life</span> and Boost <span className="text-blue-500">Productivity</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Manage your college timetable, daily routines, goals, and stock portfolio all in one intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center lg:justify-start">
            <Link href="/sign-in" className="px-8 py-3 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-300">
              Get Started
            </Link>
            {/* <Link href="#learn-more" className="mt-4 sm:mt-0 px-8 py-3 bg-gray-700 text-gray-300 rounded-md text-center hover:bg-gray-600 transition duration-300">
              Learn More
            </Link> */}
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src={heroImage}
            alt="Productivity Illustration"
            width={600}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
