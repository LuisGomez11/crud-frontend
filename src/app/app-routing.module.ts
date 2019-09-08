import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './Components/persona/persona.component';
import { EditarComponent } from './Components/persona/editar/editar.component';


const routes: Routes = [
  {path: '', component: PersonaComponent},
  {path: 'persona', component: PersonaComponent},
  {path: 'persona/editar', component: EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
