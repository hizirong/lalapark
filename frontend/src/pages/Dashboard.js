import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [savedParks, setSavedParks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'User Name',
    email: 'user@example.com',
    preferredActivities: ['Hiking', 'Camping', 'Wildlife Viewing']
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call for saved parks
    setSavedParks([
      { id: 1, name: 'Yellowstone National Park', location: 'Wyoming, USA' },
      { id: 2, name: 'Yosemite National Park', location: 'California, USA' },
      { id: 3, name: 'Grand Canyon National Park', location: 'Arizona, USA' }
    ]);

    // Simulating API call for recommendations
    setRecommendations([
      { id: 4, name: 'Zion National Park', location: 'Utah, USA', rating: 4.8 },
      { id: 5, name: 'Olympic National Park', location: 'Washington, USA', rating: 4.7 },
      { id: 6, name: 'Acadia National Park', location: 'Maine, USA', rating: 4.6 }
    ]);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Dashboard</h1>
      
      <div className="dashboard-row">
        {/* User Profile */}
        <div className="dashboard-column profile-column">
          <div className="card">
            <div className="card-header">
              <h4>Profile</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title">{userProfile.name}</h5>
              <p className="card-text">{userProfile.email}</p>
              <h6 className="activity-title">Preferred Activities:</h6>
              <ul className="activity-list">
                {userProfile.preferredActivities.map((activity, index) => (
                  <li key={index} className="activity-item">{activity}</li>
                ))}
              </ul>
              <button className="btn edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-column main-column">
          {/* Saved Parks */}
          <div className="card saved-parks">
            <div className="card-header">
              <h4>Your Saved Parks</h4>
            </div>
            <ul className="park-list">
              {savedParks.length > 0 ? (
                savedParks.map(park => (
                  <li key={park.id} className="park-item">
                    <div className="park-info">
                      <h5>{park.name}</h5>
                      <p className="location">{park.location}</p>
                    </div>
                    <button className="btn view-btn">View Details</button>
                  </li>
                ))
              ) : (
                <li className="park-item empty-message">No saved parks yet. Start exploring!</li>
              )}
            </ul>
          </div>

          {/* Park Recommendations */}
          <div className="card recommendations">
            <div className="card-header">
              <h4>Recommended Parks For You</h4>
            </div>
            <ul className="park-list">
              {recommendations.length > 0 ? (
                recommendations.map(park => (
                  <li key={park.id} className="park-item">
                    <div className="park-info">
                      <h5>{park.name}</h5>
                      <p className="location">{park.location}</p>
                      <div className="rating">Rating: {park.rating}/5</div>
                    </div>
                    <div className="park-actions">
                      <button className="btn save-btn">Save</button>
                      <button className="btn view-btn">View Details</button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="park-item empty-message">Loading recommendations...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

