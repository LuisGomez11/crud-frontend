import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../Services/persona.service'
import { Persona } from '../../Models/persona'
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  persona: Persona = new Persona();
  listaPersonas: Persona[];
  public formPersona: FormGroup;
  editForm: FormGroup;

  constructor(private service: PersonaService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formPersona = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });
    this.persona = new Persona();
    this.getPersonas();
  }


  getPersonas() {
    this.service.getPersonas()
      .subscribe(data =>
        this.listaPersonas = data
      );
  }

  addPersona() {
    this.service.createPersona(this.formPersona.value).subscribe(data => {
      swal.fire({
        position: 'center',
        type: 'success',
        title: "Correcto!",
        text: "Persona registrada correctamente",
        showConfirmButton: false,
        timer: 1500
      });
      this.getPersonas();
      this.formPersona.reset();
    },error => {
      swal.fire({
        position: 'center',
        type: 'error',
        title: "Error!",
        text: "Error al registrar la persona",
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  editPersona(persona: Persona) {
    localStorage.removeItem('IdPersona');
    localStorage.setItem('IdPersona', persona.id.toString());
    this.router.navigate(['persona/editar']);
  }

  async deletePersona(persona: Persona) {

    let result = await swal.fire({
      title: 'Confirmación',
      text: `¿Seguro que desea eliminar a: ${persona.nombre} ${persona.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })

    if (result.value) {
      this.service.deletePersona(persona.id).subscribe(data => {
        this.listaPersonas = this.listaPersonas.filter(s => s !== persona);
      });
      swal.fire('Eliminado!', 'Se ha eliminado el registro.', 'success');
    }

  }

}
