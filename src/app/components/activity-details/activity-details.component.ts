import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesService } from 'src/app/services/activities/activities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  activitySelected: Activity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitiesServices: ActivitiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      // In a real app: dispatch action to load the details here.
    });
    this.activitiesServices.getActivity(this.id).subscribe(act => {
      this.activitySelected = act;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  goBack() {
    this.router.navigate(['/activities']);
  }
}
