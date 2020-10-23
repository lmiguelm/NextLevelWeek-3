import React, {useState} from 'react';

import Sidebar from '../components/Sidebar';
import Orphanages from '../components/dashboard/Orphanages';
import OrphanagesPending from '../components/dashboard/OrphanagesPending';

import { useAuth } from '../contexts/auth';

const Dashboard = () => {

  const [flag, setFlag] = useState(true);

  const { signOut } = useAuth();

  return (
    <div id="page-dashboard">
      <Sidebar dashboard={true} signOut={signOut} screen={(callback: boolean) => setFlag(callback)} />

      { flag ? (
        <Orphanages/>
      ) : (
        <OrphanagesPending/>
      ) }

    </div>
  );
}

export default Dashboard;