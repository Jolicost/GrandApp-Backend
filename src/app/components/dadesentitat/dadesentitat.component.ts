import { Component, OnInit } from '@angular/core';
import { DadesentitatService } from 'src/app/services/dadesentitat/dadesentitat.service';
import { Router } from '@angular/router';
import { DadesusuariService } from 'src/app/services/dadesusuari/dadesusuari.service';

@Component({
  selector: 'app-dadesentitat',
  templateUrl: './dadesentitat.component.html',
  styleUrls: ['./dadesentitat.component.css']
})
export class DadesentitatComponent implements OnInit {

  id: string;
  // entityInfo = {};
  localitat;
  entitat;
  numtlf;
  email;
  address;
  constructor(
    private dadesentitatServices: DadesentitatService,
    private dadesusuariServices: DadesusuariService,
    private router: Router
  ) { }
  ngOnInit() {
    this.dadesusuariServices.getDadesUser().subscribe(act => {
      this.id = act.entity;
      console.log('heeeey', this.id);
      this.dadesentitatServices.getDataEntity(this.id).subscribe(act1 => { this.localitat = act1.place.placeName;
        this.entitat = act1.alias;
        this.numtlf = act1.phone;
        this.email = act1.email;
        this.address = act1.address;
      });
    });
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
