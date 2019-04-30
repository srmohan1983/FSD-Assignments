import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Attribute } from '@angular/core';
import { MediaControlsComponent } from '../media-controls/media-controls.component';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {

  @ViewChild('content') vid: ElementRef;
  // @ViewChild('Progressbar') bar: ElementRef;
  @ViewChild(MediaControlsComponent) progress: MediaControlsComponent;
  mutedp: boolean;
  videoelem: HTMLMediaElement;
  volumecnt: number;



  ngOnInit(): void {
    this.videoelem = this.vid.nativeElement as HTMLMediaElement;
  }

  ngAfterViewInit() {
    console.log(this.progress.pbar);

  }

  performOp(event) {
     if (event.value === 'play') {
     this.videoelem.play();
     this.videoelem.ontimeupdate = () => {
       console.log(this.videoelem.duration);
       const percentage = Math.floor((100 / this.videoelem.duration) * this.videoelem.currentTime);
       console.log(percentage);
       this.progress.pbar.nativeElement.value = percentage;
      };
     this.videoelem.onended = () => {
        this.progress.pbar.nativeElement.value = 100;
       };
     }
     if (event.value === 'pause') {
      this.videoelem.pause();
      }
     if (event.value === 'mute') {
      this.mutedp = this.videoelem.muted;
      if (this.mutedp) {
          console.log('In True' + this.mutedp);
          this.videoelem.muted = false;
        } else {
          console.log('In False' + this.mutedp);
          this.videoelem.muted = true;
        }
        }
     if (event.value === 'reload') {
          this.videoelem.load();
          this.videoelem.play();
          }
     if (event.value === 'volup') {
      this.volumecnt = this.videoelem.volume + 0.2;
      if (this.volumecnt > 1) {
        this.volumecnt = 1;
    }
      this.videoelem.volume = this.volumecnt;
            }
     if (event.value === 'voldown') {
      this.volumecnt = this.videoelem.volume - 0.2;
      if (this.volumecnt <= 0) {
        this.volumecnt = 0;
    }
      this.videoelem.volume = this.volumecnt;
              }
    }



}
