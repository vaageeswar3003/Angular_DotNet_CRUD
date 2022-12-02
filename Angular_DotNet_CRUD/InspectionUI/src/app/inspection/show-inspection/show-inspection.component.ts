import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InspectionApiService } from 'src/app/inspection-api.service';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypesList:any=[];
  temp$:any;


  // Map to display data associate with foreign keys
  inspectionTypesMap:Map<number, string> = new Map()

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.service.refreshRequired.subscribe(() => {
      this.inspectionList$ = this.service.getInspectionList;
    })
    console.log('Test');
    this.temp$ = of(this.service.temp);
    this.inspectionList$ = this.service.getInspectionList;
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  test(value:string) {
    this.service.addTemp(value);
  }

  // variables(properties)

  modalTitle:string = '';
  activateEditInspectionComponent:boolean = false;
  inspection:any;

  refreshInspectionTypesMap() {
    this.service.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data;
      for(let i=0;i<data.length;i++) {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id,this.inspectionTypesList[i].inspectionName);
      }
    })
  }

  modalAdd() {
    this.inspection = {
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null,

    }
    this.modalTitle = "Add Inspection";
    this.activateEditInspectionComponent = true;
  }

  modalClose() {
    this.activateEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList;
  }

  modalEdit(item:any) {
    this.inspection = item;
    this.modalTitle = "Edit  Inspection";
    this.activateEditInspectionComponent =  true;
  }

  delete(item:any) {
    if(confirm(`Are you you want to delete inspection ${item.id}`)) {
      this.service.deleteInspection(item.id).subscribe(res => {
        var closeModalBtn =  document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      var showAddSuccess = document.getElementById('delete-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(() => {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      },4000)
      this.inspectionList$ = this.service.getInspectionList;
      })
    }
  }


}
