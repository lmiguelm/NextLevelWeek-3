import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages-create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                
                
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />

                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orphanage-edit/:id" component={EditOrphanage} />

                <Route path="/orphanage-created" component={CreateOrphanageSuccess} />
                <Route path="/orphanage-deleted" component={DeleteOrphanageSuccess} />
            </Switch>
        </BrowserRouter>
    );
}

