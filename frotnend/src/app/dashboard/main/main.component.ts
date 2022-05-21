import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = true;
  showSubSubMenu: boolean = true;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
