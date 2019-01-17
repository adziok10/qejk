import {
    Component,
    OnInit
} from '@angular/core';
import {
    Mem
} from '../mem.model';
import {
    MemesApiService
} from '../../memes-api.service';
import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';
import {
    SnackbarService
} from '../../../services/snackbar.service';
import {
    environment
} from '../../../../environments/environment';

@Component({
    selector: 'app-mem',
    templateUrl: './mem.component.html',
    styleUrls: ['./mem.component.sass']
})
export class MemComponent implements OnInit {

    mem: Mem = new Mem;
    id: String;
    base_url: String;

    constructor(private memesApi: MemesApiService, private router: Router, private route: ActivatedRoute, private snack: SnackbarService) {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                    this.memesApi.getMeme(this.id).subscribe((mem: Mem) => {
                        if (mem) {
                            this.mem = mem;
                        } else {
                            this.router.navigateByUrl('/');
                            this.snack.open('No meme on this url', 'Close', 3000);
                        }
                    });
                }
            );
          this.base_url = environment.base_api_url;
    }

    ngOnInit() {}

}
