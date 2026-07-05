import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [publicGuard],
    loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./pages/public/login/login').then(m => m.Login),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/public/forgot-password/forgot-password').then(m => m.ForgotPassword),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/public/reset-password/reset-password').then(m => m.ResetPassword),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/private-layout/private-layout').then(m => m.PrivateLayout),
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/private/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'profile', loadComponent: () => import('./pages/private/profile/profile').then(m => m.Profile) },
      { path: 'change-password', loadComponent: () => import('./pages/private/change-password/change-password').then(m => m.ChangePassword) },

      { path: 'users', loadComponent: () => import('./pages/private/users/user-list/user-list').then(m => m.UserList) },
      { path: 'users/new', loadComponent: () => import('./pages/private/users/user-form/user-form').then(m => m.UserForm) },
      { path: 'users/:id', loadComponent: () => import('./pages/private/users/user-form/user-form').then(m => m.UserForm) },

      { path: 'roles', loadComponent: () => import('./pages/private/roles/role-list/role-list').then(m => m.RoleList) },
      { path: 'roles/new', loadComponent: () => import('./pages/private/roles/role-form/role-form').then(m => m.RoleForm) },
      { path: 'roles/:id', loadComponent: () => import('./pages/private/roles/role-form/role-form').then(m => m.RoleForm) },

      { path: 'permissions', loadComponent: () => import('./pages/private/permissions/permission-list/permission-list').then(m => m.PermissionList) },
      { path: 'permissions/new', loadComponent: () => import('./pages/private/permissions/permission-form/permission-form').then(m => m.PermissionForm) },
      { path: 'permissions/:id', loadComponent: () => import('./pages/private/permissions/permission-form/permission-form').then(m => m.PermissionForm) },

      { path: 'modules', loadComponent: () => import('./pages/private/modules/module-list/module-list').then(m => m.ModuleList) },
      { path: 'modules/new', loadComponent: () => import('./pages/private/modules/module-form/module-form').then(m => m.ModuleForm) },
      { path: 'modules/:id', loadComponent: () => import('./pages/private/modules/module-form/module-form').then(m => m.ModuleForm) },

      { path: 'funciones', loadComponent: () => import('./pages/private/funciones/funcion-list/funcion-list').then(m => m.FuncionList) },
      { path: 'funciones/new', loadComponent: () => import('./pages/private/funciones/funcion-form/funcion-form').then(m => m.FuncionForm) },
      { path: 'funciones/:id', loadComponent: () => import('./pages/private/funciones/funcion-form/funcion-form').then(m => m.FuncionForm) },

      { path: 'statuses', loadComponent: () => import('./pages/private/statuses/status-list/status-list').then(m => m.StatusList) },
      { path: 'statuses/new', loadComponent: () => import('./pages/private/statuses/status-form/status-form').then(m => m.StatusForm) },
      { path: 'statuses/:id', loadComponent: () => import('./pages/private/statuses/status-form/status-form').then(m => m.StatusForm) },

      { path: 'status-users', loadComponent: () => import('./pages/private/status-users/status-user-list/status-user-list').then(m => m.StatusUserList) },
      { path: 'status-users/new', loadComponent: () => import('./pages/private/status-users/status-user-form/status-user-form').then(m => m.StatusUserForm) },
      { path: 'status-users/:id', loadComponent: () => import('./pages/private/status-users/status-user-form/status-user-form').then(m => m.StatusUserForm) },

      { path: 'error-logs', loadComponent: () => import('./pages/private/error-logs/error-logs').then(m => m.ErrorLogs) },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
