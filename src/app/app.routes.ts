import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path:'users',
        component: UserComponent
    },
    {
        path:'users/page/:page',
        component: UserComponent
    },
    {
        path:'create-user',
        component: UserFormComponent
    },
    {
        path:'edit-user/:id',
        component: UserFormComponent
    },
    {
        path:'login',
        component: AuthComponent
    }
];
