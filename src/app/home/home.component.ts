import { Fazenda } from './../model/Fazenda';
import { User } from './../model/User';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { ManejoService } from './../service/manejo.service';
import { Component, OnInit } from '@angular/core';
import { Manejo } from '../model/Manejo';
import { FazendaService } from '../service/fazenda.service';
import { ParcelaService } from '../service/parcela.service';
import { Parcela } from '../model/Parcela';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  manejos: Observable<Manejo[]>;
  fazenda = new Fazenda();
  usuarioLogado = new User();

  parcelas: Observable<Parcela[]>;
  parcelaSelecionada: Number;

  constructor(
    private manejoService: ManejoService,
    private parcelaService: ParcelaService,
    private usuarioService: UsuarioService,
    private fazendaService: FazendaService) { }

  ngOnInit() {
    
  this.usuarioService.recuperarUsuario().subscribe(data => {
    this.usuarioLogado = data;
    localStorage.setItem('idUsuario', JSON.stringify(this.usuarioLogado.idUsuario));


    let idUsuario: Number =+ JSON.parse(localStorage.getItem('idUsuario'));
    
    this.fazendaService.getPrimeiraFazenda(idUsuario).subscribe(data => {
      this.fazenda = data;
      localStorage.setItem('idFazenda', JSON.stringify(this.fazenda.idFazenda));
   });

    let idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

    this.parcelaService.getParcelaList(idFazenda).subscribe(data => {
      this.parcelas = data;
    });
   
    });
  }

  buscaParcela() {
    this.manejoService.buscarManejo(this.parcelaSelecionada).subscribe(data => {
      this.manejos = data;
    });
  }
}
