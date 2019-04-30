import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Video } from '../video';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  errorMessage = '';
  public videos: Video[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getVideoLists().subscribe((res: Video[]) => {
        console.log(res);
        this.videos = res;
        console.log(this.videos[0].title);
      },
// tslint:disable-next-line: no-angle-bracket-type-assertion
      error => this.errorMessage = <any> error
    );
  }

}
