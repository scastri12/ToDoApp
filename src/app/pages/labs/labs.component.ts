import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicacion con angular';
  tasks = [
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ];
  name = signal('Santiago');
  age = 18;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person = signal({
    name: 'Santi',
    age: 25,
    img: 'https://w3schools.com/howto/img_avatar.png',
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => console.log(value));
  }

  clickHandler(){
    alert('Hola');
  }
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.name.set(value);
  }
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.name.set(value);
    console.log(input.value)
  }

}
