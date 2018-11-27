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

  id = {};
  //entityInfo = {};
  localitat = {};
  entitat = {};
  numtlf = {};
  email = {};
  address = {};
  constructor(
    private dadesentitatServices: DadesentitatService,
    private dadesusuariServices: DadesusuariService,
    private router: Router
  ) { }
  ngOnInit() {
    this.dadesusuariServices.getDadesUser().subscribe(act => {
      this.id = act.entity;
    }),
    this.dadesentitatServices.getDataEntity(this.id).subscribe(act => { this.localitat = act.place.placeName;
      this.entitat = act.alias;
      this.numtlf = act.phone;
      this.email = act.email;
      this.address = act.address;
    });
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
