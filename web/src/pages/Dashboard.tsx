import React, {useState, useEffect} from 'react';

import Sidebar from '../components/Sidebar';
import Orphanages from '../components/dashboard/Orphanages';
import OrphanagesPending from '../components/dashboard/OrphanagesPending';

const Dashboard = () => {

  const [flag, setFlag] = useState(true);

  return (
    <div id="page-dashboard">
      <Sidebar dashboard={true} screen={(callback: boolean) => setFlag(callback)} />

      { flag ? (
        <Orphanages/>
      ) : (
        <OrphanagesPending/>
      ) }

    </div>
  );
}

export default Dashboard;