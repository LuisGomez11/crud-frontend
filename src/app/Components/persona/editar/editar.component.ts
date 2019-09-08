import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../Services/persona.service'
import { Persona } from '../../../Models/persona'
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  persona: Persona;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PersonaService) { }

  ngOnInit() {

    const idPersona = localStorage.getItem('IdPersona');

    if ( !idPersona ) {
      alert('Acción invalida');
      this.router.navigate(['persona']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });

    this.service.getPersona(+idPersona)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  volver(){
    this.router.navigate(['persona']);
  }

  modificar() {
    this.service.updatePersona(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['persona']);
        swal.fire({
          position: 'center',
          type: 'success',
          title: `Persona modificada con éxito`,
          showConfirmButton: false,
          timer: 1800
        });
      },
      error => {
        alert(error);
      });
  }

}
