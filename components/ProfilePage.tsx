import React from 'react';

const ProfilePage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend API.
    // For now, we can just log it or show an alert.
    alert('Profile changes saved! (Simulation)');
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Profile Management</h1>
        <p className="text-slate-400 mt-2">Manage your personal information and settings.</p>
      </header>
      
      <main className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-slate-700 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="h-28 w-28 rounded-full bg-slate-700 flex items-center justify-center">
                {/* Placeholder for an image */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">Alex Doe</h2>
              <p className="text-slate-400">user@example.com</p>
              <button type="button" className="mt-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-slate-400 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                defaultValue="Alex Doe"
                className="shadow appearance-none border border-slate-600 rounded-lg w-full py-3 px-4 bg-slate-700/50 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-slate-400 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue="user@example.com"
                className="shadow appearance-none border border-slate-600 rounded-lg w-full py-3 px-4 bg-slate-700/50 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                disabled
              />
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-700 pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;