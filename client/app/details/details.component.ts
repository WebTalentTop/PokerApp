import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  cats = [];
  stats = [];
  badges = []; 
  notes = [];
  curBadges = []; 
  avBadges = [];
  isLoading = true;
  isAddBadges = false;
  isAddNote = false;
  btnBadgeCaption = "Add New Badge";
  btnNoteCaption = "Add New Note";
  cat = <any>{};
  imgSrcs = <any>{};
  imgSrcs_Note = <any>{};
  isEditing_Note = false;
  curNote=[];

  addNoteForm: FormGroup;
  playerid = new FormControl('', Validators.required);
  playername = new FormControl('', Validators.required);
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {     
    this.cat.playerid = this.route.snapshot.paramMap.get('id');
    this.cat.rangestat={};
    this.cat.badgestat=[];
  
  }

  ngOnInit() {
     
    this.getStats();
    this.getBadges();
    this.getNotes();
    this.getCat(this.cat);
  }
  getStats() {
    this.dataService.getStats().subscribe(
      data => {
        this.stats = data; 
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getBadges() {
    this.dataService.getBadges().subscribe(
      data => {
        this.badges = data; 
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getNotes() {
    this.dataService.getNotes().subscribe(
      data => {
        this.notes = data; 
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getCat(cat) {
    this.dataService.getCat(cat).subscribe(
      data => { 
        this.cat = data; 
        this.updateChart(); 
        this.updateInitialBadge(); 
        this.updateInitialNote(); 
      },
      error => console.log(error),
    );
  }
  updateInitialBadge()
  {
    var Ths=this;
    this.badges.forEach(function(s){
      var addFlg=0;
      for (var key in Ths.cat.badgestat) {
        var item = Ths.cat.badgestat[key];
        if (s._id==item) addFlg=1;
      }
      if (addFlg==0) Ths.avBadges.push(s._id);
      Ths.imgSrcs[s._id]=s.imgurl;
    });
  }
  updateInitialNote()
  {
    var Ths=this;
    this.notes.forEach(function(s){
      Ths.imgSrcs_Note[s._id]=s.imgurl;
     });
  }
  editCat(cat) {
      var newstat={};
      this.stats.forEach(function(s){
          for (var key in cat.rangestat) {
            var item = cat.rangestat[key];
            if (s._id==key) newstat[key]=item;
          }
      });
      this.cat.rangestat=newstat;
      this.dataService.editCat(cat).subscribe(
        res => {
          this.cat = cat;
          this.toast.setMessage('Information updated successfully.', 'success');
        },
        error => console.log(error)
      );
    }
    public radarChartLabels:string[] = ['Aggresion', 'Fundamental', 'Mindset', 'Call', 'Bluff'];
  
    public radarChartData:any = [
      {data: [65, 59, 90, 81, 56], label: 'Common Stat'},
      {data: [0, 0, 0, 0, 0], label: 'Initial Stat'}
    ];
    public radarChartType:string = 'radar';
  
    // events
    public chartClicked(e:any):void {
      console.log(e);
 
    }
    updateChart() {
      this.radarChartData[0].data[0]=this.cat.aggresion;
      this.radarChartData[0].data[1]=this.cat.fundamental;
      this.radarChartData[0].data[2]=this.cat.mindset;
      this.radarChartData[0].data[3]=this.cat.call;
      this.radarChartData[0].data[4]=this.cat.bluff;
      this.radarChartData = this.radarChartData.slice();
    }
    public chartHovered(e:any):void {
      console.log(e);
      
    }
    addBadge(iid){
      var arIndex=this.cat.badgestat.indexOf(iid);
      if (arIndex==-1) {
        this.cat.badgestat.push(iid);
        var arIndex1=this.avBadges.indexOf(iid);
        this.avBadges.splice(arIndex1, 1);
      }    
    }
    removeBadge(badge){
      var arIndex=this.cat.badgestat.indexOf(badge);
      if (arIndex>-1){
        this.cat.badgestat.splice(arIndex, 1);
        this.avBadges.push(badge); 
      }
    }
    addMoreBadges(){
      this.isAddBadges = !this.isAddBadges;
      if (this.isAddBadges) this.btnBadgeCaption = "Hide Available Badges";
      else this.btnBadgeCaption = "Add New Badge";
    }
    showNewNote(){
      this.isAddNote = !this.isAddNote;
      if (this.isAddNote) this.btnNoteCaption = "Cancel";
      else this.btnNoteCaption = "Add New Note";
    }
    saveNewNote(){
     // this.cat.notestat.push(this.curNote);
     console.log(this.curNote);
    }
    addNewTag(newTag)
    {
      this.curNote.push(newTag);
    }
}
