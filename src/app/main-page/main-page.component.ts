import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Captions } from '../captions';
import { ImageProcessingService } from '../image-processing.service';
import { TagConfidence } from '../tag-confidence';
import { UrlObj } from '../url-obj';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public chooseFromFileForm: FormGroup;
  public showImage: boolean;
  public tagsArr: TagConfidence[];
  public captions: Captions[];
  public imgDescription: string;

  constructor(private imageProcessingService: ImageProcessingService, private formbuilder: FormBuilder) { 
    this.chooseFromFileForm = this.formbuilder.group({
      url: ''
    })
  }

  ngOnInit(): void {
  }

  public onAnalyzeSubmit(urlData){

    const imageToTest : UrlObj = {
      url: urlData.url
    }

    if(urlData.url){
      const pic = document.getElementById("imageBeingUsed");
      pic.setAttribute("src", urlData.url);
      this.showImage = true;
    }else{
      this.showImage = false;
    }

    this.imageProcessingService.analyzeImage(imageToTest)
    .subscribe(res => {
      this.tagsArr = res.tags;
      this.captions = res.description.captions;
      this.imgDescription = this.captions[0].text;
    })
  }

  public getTagColor(confidence: number){
    if(confidence <= 1.0 && confidence > 0.7){
      return 'green';
    }else if(confidence <= 0.7 && confidence > 0.4){
      return 'yellow';
    }else{
      return 'red';
    }
  }

}
