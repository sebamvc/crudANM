import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear usuario';
  id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) {

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required ] && ['', Validators.email ],  // No se como colocar 2 para q sea required igual && || Solo esta validando el formato del email
      edad: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUsuario() {

    const USUARIO: Usuario = {
        nombre: this.usuarioForm.get('nombre')?.value,
        apellido: this.usuarioForm.get('apellido')?.value,
        email: this.usuarioForm.get('email')?.value,
        edad: this.usuarioForm.get('edad')?.value,
    }

    if(this.id != null) {
      // editamos usuario

      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
        console.log('Usuario Actualizado');
        this.router.navigate(['/']);
      } , error => {
        console.log(error);
        this.usuarioForm.reset();
      })

    } else {
      // agregamos usuario
      console.log(USUARIO);
      this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
        console.log('Usuario Agregado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      })
    }



  }

  esEditar() {
    if(this.id !== null) {
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          edad: data.edad
        })
      })
     }
  }

}
