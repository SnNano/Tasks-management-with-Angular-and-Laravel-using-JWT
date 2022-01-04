import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner =false;
  constructor(
    private SpinnerService: SpinnerService,
    private change: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.SpinnerService.getSpinnerObserver().subscribe((statu) =>{
      this.showSpinner = statu === 'start';
      this.change.detectChanges();
    })
  }
}
