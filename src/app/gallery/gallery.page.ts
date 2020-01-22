import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  public keyword:string;
  public currentPage:number=1;
  public size:number=10;
  private dataImages=[];
    private totalPages: number;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

    onLoadImages() {
        this.dataImages=[];
        this.currentPage=1;
        this.totalPages=0;
        this.doSearch();

    }

    doSearch(){
        this.httpClient.get('https://pixabay.com/api/?key=13990660-9ad639a09f11356ae37f1161a&q='+
            this.keyword+'&per_page='+
            this.size+'&page='+this.currentPage)
            .subscribe(data=>{
                data['hits'].forEach(image=>{
                    this.dataImages.push(image);
                });
                this.totalPages=data['totalHits']/this.size;
            },err=>{
                console.log(err);
            })
    }

    loadData(evt) {
       if(this.currentPage<this.totalPages){
         console.log(this.currentPage+"/"+this.totalPages);
         ++this.currentPage;
         this.doSearch();
         evt.target.complete();
       }
       if(this.currentPage>=this.totalPages)
         evt.target.disabled=true;

    }
}
