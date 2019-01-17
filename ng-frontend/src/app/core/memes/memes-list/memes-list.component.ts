import {
    Component,
    OnInit
} from '@angular/core';
import {
    MemesApiService
} from '../../memes-api.service';
import {
    Mem
} from '../mem.model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-memes-list',
    templateUrl: './memes-list.component.html',
    styleUrls: ['./memes-list.component.sass']
})
export class MemesListComponent implements OnInit {

    memesArray: Mem[];
    base_url: String;
    constructor(private memesApi: MemesApiService) {
        this.memesApi.getMemes().subscribe(memes => {
            this.memesArray = memes;
        });
        this.base_url = environment.base_api_url;
    }

    ngOnInit() {}

}
