import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'users/new', renderMode: RenderMode.Prerender },
  { path: 'users/:id', renderMode: RenderMode.Server },
  { path: 'roles/new', renderMode: RenderMode.Prerender },
  { path: 'roles/:id', renderMode: RenderMode.Server },
  { path: 'permissions/new', renderMode: RenderMode.Prerender },
  { path: 'permissions/:id', renderMode: RenderMode.Server },
  { path: 'modules/new', renderMode: RenderMode.Prerender },
  { path: 'modules/:id', renderMode: RenderMode.Server },
  { path: 'funciones/new', renderMode: RenderMode.Prerender },
  { path: 'funciones/:id', renderMode: RenderMode.Server },
  { path: 'statuses/new', renderMode: RenderMode.Prerender },
  { path: 'statuses/:id', renderMode: RenderMode.Server },
  { path: 'status-users/new', renderMode: RenderMode.Prerender },
  { path: 'status-users/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
