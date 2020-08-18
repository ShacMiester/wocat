import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exportdata',
  templateUrl: './exportdata.component.html',
  styleUrls: ['./exportdata.component.scss']
})
export class ExportdataComponent implements OnInit {
  name = 'Angular';
  constructor(private _router: Router) { }
  selectedTags = []
  public metaData: any = [
    {
      meta: 'A',
    },
    {
      meta: 'B',

    },
    {
      meta: 'C',
    },
    {
      meta: 'D',
    },
    {
      meta: 'E',
    }

  ];


  ngOnInit() {
console.log(localStorage.getItem('id_token'))
    if (!localStorage.getItem('id_token'))
      this._router.navigate(['login'])


  }

  getSelected(isSelected, product, label) {
    if (isSelected == true)
      this.selectedTags.push({ "metadata": product, "label": label })

    console.log(this.metaData)
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.metaData, event.previousIndex, event.currentIndex);
    this.metaData.forEach((user, idx) => {
      user.order = idx + 1;
    });
  }
  exoportData() {
    let selectedTags = []
    this.metaData.map(a => { if (a.isSelected == true) selectedTags.push({ "name": a.meta, "label": a.label ? a.label : a.name }) })
    console.log(selectedTags)
  }
}
