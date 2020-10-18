import React from 'react';

import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div id="page-dashboard">
      <Sidebar logged={true}/>
    </div>
  );
}

export default Dashboard;