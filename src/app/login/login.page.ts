import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }


  async ingresar() {
    try {
      const f = this.formularioLogin.value;

      // Obtener el valor del localStorage
      const usuarioString = localStorage.getItem('usuario');

      // Verificar si el valor no es nulo
      if (usuarioString === null) {
        console.log('No se encontró un usuario en el localStorage');
        return;
      }

      // Parsear el valor si no es nulo
      const usuario = JSON.parse(usuarioString);

      // Resto de la lógica del método ingresar
      if (usuario.nombre === f.nombre && usuario.password === f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado','true');
        this.navCtrl.navigateRoot('menu/inicio');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos que ingresaste no son correctos',
          buttons: ['Aceptar'],
        });

        await alert.present();
      }
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  }

  ngOnInit() {
  }
}
