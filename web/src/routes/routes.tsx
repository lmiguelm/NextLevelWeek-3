import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import His from './history';

import Landing from '../pages/Landing';

import OrphanagesMap from '../pages/OrphananagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import EditOrphanage from '../pages/EditOrphanage';

import CreateOrphanageSuccess from '../pages/feedback/CreateOrphanageSuccess';
import DeleteOrphanageSuccess from '../pages/feedback/DeleteOrphanageSuccess';

import NotFound from '../pages/NotFound';

import { useAuth } from '../contexts/auth';


const PrivateRoute = ({ component: Component, ...rest }: any ) => {

    const { signed } = useAuth();

    return (
        <Route 
            {...rest}
            render={props => 
                signed ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }
        />
    )
}

const PublicRoute = ({ component: Component, ...rest }: any ) => {

    const { signed } = useAuth();

    return (
        <Route 
            {...rest}
            render={props => 
                !signed ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/dashboard' }} />
                )
            }
        />
    )
}

export default function Routes() {
  return(
    <Router history={His}>
      <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />

          <Route exact path="/" component={Landing} />
          <Route path="/app" component={OrphanagesMap} />

          <Route path="/orphanages-create" component={CreateOrphanage} />
          <Route path="/orphanages/:id" component={Orphanage} />
          
          
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />

          <Route path="/orphanage-edit/:id" component={EditOrphanage} />

          <Route path="/orphanage-created" component={CreateOrphanageSuccess} />
          <Route path="/orphanage-deleted" component={DeleteOrphanageSuccess} />

          <Route  path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

