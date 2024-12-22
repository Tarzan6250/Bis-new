import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Camera, Loader2, CheckCircle, AlertCircle, Calendar, GraduationCap, Lock } from 'lucide-react';
import { API_URL } from '../config/config';

interface UserData {
  username: string;
  email: string;
  profilePic?: string;
  age?: number;
  college?: string;
}

interface EditedData extends UserData {
  currentPassword?: string;
  newPassword?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editedData, setEditedData] = useState<EditedData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      if (!token || !email) {
        setMessage({ type: 'error', text: 'Authentication required' });
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${API_URL}/api/user/profile/${encodeURIComponent(email)}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.user) {
        const userData = response.data.user;
        setUserData(userData);
        setEditedData(userData);
        if (userData.profilePic) {
          setPreviewUrl(`${API_URL}${userData.profilePic}`);
        }
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 403) {
        setMessage({ type: 'error', text: 'Access forbidden. Please log in again.' });
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
      } else if (error.response?.status === 401) {
        setMessage({ type: 'error', text: 'Session expired. Please log in again.' });
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
      } else if (error.response?.status === 404) {
        setMessage({ type: 'error', text: 'User profile not found.' });
      } else {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to fetch user data'
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData) return;
    
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: name === 'age' ? (value ? parseInt(value) : '') : value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      
      if (!token || !email || !editedData) {
        setMessage({ type: 'error', text: 'Missing required data' });
        return;
      }

      const formData = new FormData();
      if (selectedFile) {
        formData.append('profilePic', selectedFile);
      }
      
      // Append other user data
      if (editedData.username) formData.append('username', editedData.username);
      if (editedData.age) formData.append('age', editedData.age.toString());
      if (editedData.college) formData.append('college', editedData.college);
      if (editedData.currentPassword) formData.append('currentPassword', editedData.currentPassword);
      if (editedData.newPassword) formData.append('newPassword', editedData.newPassword);

      const response = await axios.put(
        `${API_URL}/api/user/profile/${encodeURIComponent(email)}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data && response.data.user) {
        setUserData(response.data.user);
        setEditedData(response.data.user);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        
        // Update local storage and sidebar
        localStorage.setItem('userEmail', response.data.user.email);
        const event = new CustomEvent('profileUpdated', {
          detail: {
            username: response.data.user.username,
            profilePic: response.data.user.profilePic
              ? `${API_URL}${response.data.user.profilePic}`
              : null
          }
        });
        window.dispatchEvent(event);

        // Clear password fields
        setEditedData(prev => ({
          ...prev!,
          currentPassword: '',
          newPassword: ''
        }));
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData || !editedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.type === 'error' ? <AlertCircle className="inline mr-2" /> : <CheckCircle className="inline mr-2" />}
            {message.text}
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                      <User className="w-16 h-16 text-black-300" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-black-600/90 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={editedData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                             text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black-600/90 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                             text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-black-600/90 mb-2">
                  Age
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={editedData.age || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    min="1"
                    max="120"
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                             text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-black-600/90 mb-2">
                  College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    type="text"
                    name="college"
                    value={editedData.college || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                             text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Change Section */}
              {isEditing && (
                <div className="space-y-6 pt-6 border-t border-purple-600/10">
                  <h3 className="text-lg font-medium text-purple-600">Change Password</h3>
                  
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-purple-600/90 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-purple-300" />
                      </div>
                      <input
                        type="password"
                        name="currentPassword"
                        value={editedData.currentPassword || ''}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                                 text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                 transition-all duration-200"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-purple-600/90 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-purple-300" />
                      </div>
                      <input
                        type="password"
                        name="newPassword"
                        value={editedData.newPassword || ''}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-purple-600/20 rounded-lg 
                                 text-purple-600 placeholder-purple-600/50 backdrop-blur-sm
                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                 transition-all duration-200"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedData(userData);
                      setPreviewUrl(userData.profilePic ? `${API_URL}${userData.profilePic}` : null);
                      setSelectedFile(null);
                      setMessage({ type: '', text: '' });
                    }}
                    className="px-6 py-2 bg-white/10 text-purple-600 rounded-lg hover:bg-white/20
                           transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600
                           transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600
                         transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
