import { Component, Output, EventEmitter, Inject, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';




@Component({
selector: 'app-media-controls',
templateUrl: './media-controls.component.html',
styleUrls: ['./media-controls.component.css']
})
export class MediaControlsComponent implements OnInit, AfterViewInit {

constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

}
  public data: any = [];
  likeCnt: number;
  unLikeCnt: number;
  @ViewChild('Progressbar') pbar: ElementRef;
  @ViewChildren('button') buttons: QueryList<any>;
  playbutton: ElementRef;
  pausebutton: ElementRef;




@Output() mediaControlOp = new EventEmitter();

  ngAfterViewInit() {
    this.buttons.forEach(button1 => console.log(button1));
    const len = this.buttons.length;
    console.log(len);
    this.playbutton = this.buttons.find(find => find.nativeElement.id === 'playVideo');
    this.pausebutton = this.buttons.find(find => find.nativeElement.id === 'pauseVideo');
    this.pausebutton.nativeElement.disabled = true;
    this.pausebutton.nativeElement.style.opacity = 0.35;



  }


ngOnInit(): void {
  this.storage.set('likeCounter', 0);
  this.storage.set('unLikeCounter', 0);

}


playVid(): void {
    this.mediaControlOp.emit({
      value: 'play'
    });
    this.playbutton.nativeElement.disabled = true;
    this.pausebutton.nativeElement.disabled = false;
    this.pausebutton.nativeElement.style.opacity = 1;
    this.playbutton.nativeElement.style.opacity = 0.35;
}

pauseVid(): void {
  this.mediaControlOp.emit({
    value: 'pause'
  });
  this.playbutton.nativeElement.disabled = false;
  this.pausebutton.nativeElement.disabled = true;
  this.pausebutton.nativeElement.style.opacity = .35;
  this.playbutton.nativeElement.style.opacity = 1;
}


muteVid(): void {
  this.mediaControlOp.emit({
    value: 'mute'
  });
}

reloadVid(): void {
  this.mediaControlOp.emit({
    value: 'reload'
  });
}

volupVid(): void {
  this.mediaControlOp.emit({
    value: 'volup'
  });
}

voldownVid(): void {
  this.mediaControlOp.emit({
    value: 'voldown'
  });
}

likeVid(): void {
  this.likeCnt = this.storage.get('likeCounter');
  this.storage.set('likeCounter', ++this.likeCnt);

}

unLikeVid(): void {
  this.unLikeCnt = this.storage.get('unLikeCounter');
  this.storage.set('unLikeCounter', ++this.unLikeCnt);

}





}
