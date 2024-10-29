import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 w-full">
        <div className="space-y-6 text-center">
          <h2 className="text-7xl font-medium text-secondary">
            Event{' '}
            <span className="text-text bg-secondary px-1 rounded-lg">Hub</span>
          </h2>
          <p className="text-3xl text-default-400">Attend. Collect. Unlock.</p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link to="/login">
              <button className="px-6 py-3 bg-background text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 bg-background text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300 ">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
