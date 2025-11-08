import React, { useState, useRef } from 'react';
import { Activity } from '../types';
import { ActivityIcon } from '../constants';

const mockActivities: Activity[] = [
    { id: 1, icon: <ActivityIcon className="text-green-400" />, description: 'Logged in successfully.', timestamp: '2 hours ago' },
    { id: 2, icon: <ActivityIcon className="text-yellow-400" />, description: 'High stress level detected.', timestamp: '1 day ago' },
    { id: 3, icon: <ActivityIcon className="text-cyan-400" />, description: 'Profile information updated.', timestamp: '3 days ago' },
    { id: 4, icon: <ActivityIcon className="text-green-400" />, description: 'Logged in successfully.', timestamp: '3 days ago' },
];

const ProfilePage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile changes saved! (Simulation)');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfilePic(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

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
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" aria-label="Upload profile picture"/>
              <div className="relative h-28 w-28 rounded-full bg-slate-700 flex items-center justify-center">
                {profilePic ? (
                  <img src={profilePic} alt="Profile Preview" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">Alex Doe</h2>
              <p className="text-slate-400">user@example.com</p>
              <button type="button" onClick={triggerFileSelect} className="mt-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
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

        <div className="mt-10 border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Activity History</h3>
            <ul className="space-y-4">
                {mockActivities.map(activity => (
                    <li key={activity.id} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                        <div>
                            <p className="text-slate-300">{activity.description}</p>
                            <p className="text-sm text-slate-500">{activity.timestamp}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
