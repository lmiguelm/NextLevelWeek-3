import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import Landing from './pages/Landing';

import OrphanagesMap from './pages/OrphananagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Dashboard from './pages/Dashboard';
import EditOrphanage from './pages/EditOrphanage';

import CreateOrphanageSuccess from './pages/feedback/CreateOrphanageSuccess';
import DeleteOrphanageSuccess from './pages/feedback/DeleteOrphanageSuccess';

import NotFound from './pages/NotFound';

import { useAuth } from './contexts/auth';


const PrivateRoute = ({ component: Component, ...rest }: any ) => {

    const { signed } = useAuth();
    console.log(signed);

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

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />

                <Route exact path="/" component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages-create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                
                
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />

                <Route path="/orphanage-edit/:id" component={EditOrphanage} />

                <Route path="/orphanage-created" component={CreateOrphanageSuccess} />
                <Route path="/orphanage-deleted" component={DeleteOrphanageSuccess} />

                <Route  path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

