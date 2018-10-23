import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: Array<Activity> = [];


  constructor(
    private dialogService: DialogService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activitiesService.getActivities().subscribe(res => {
      console.log(res);
      this.activities = res;
    });
  }

  openModal(mode) {
    this.dialogService.openDialog(mode);
  }
}
