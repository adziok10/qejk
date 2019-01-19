import {
    Component
} from '@angular/core';
import {
    MemesApiService
} from '../../../services/memes-api.service';
import {
    Mem
} from '../mem.model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-memes-list',
    templateUrl: './memes-list.component.html',
    styleUrls: ['./memes-list.component.sass']
})
export class MemesListComponent {

    memesArray: Array<Mem> = [];
    base_url: String;
    constructor(private memesApi: MemesApiService) {
        this.memesApi.getMemes().subscribe( memes => {
            const memesArrayHelper = [];
            memes.map( mem => {
                memesArrayHelper.push(new Mem(mem._id, mem.title, mem.description, mem.owner, mem.createAt, mem.link));
            });
            this.memesArray = memesArrayHelper;
        });
        this.base_url = environment.base_api_url;
    }

}
