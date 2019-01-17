import {
    Injectable
} from '@angular/core';

import {
    environment
} from '../../environments/environment';
import {
    HttpClient
} from '@angular/common/http';
import {
    Mem
} from './memes/mem.model';
import {
    Observable
} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MemesApiService {

    constructor(private http: HttpClient) {}

    getMemes(): Observable < Mem[] > {
        const reqt = this.http.get < Mem[] > (environment.base_api_url + '/mem');
        reqt.subscribe(
            data => {}
        );
        return reqt;
    }

    getMeme(id: String): Observable < Mem > {
        const reqt = this.http.get < Mem > (environment.base_api_url + '/mem/' + id);
        return reqt;
    }

    sendMeme(title, description, mem): Observable < any > {

        const formData: FormData = new FormData();

        formData.append('mem', mem, mem.name);
        formData.append('description', description);
        formData.append('title', title);

        const reqt = this.http.post < any > (environment.base_api_url + '/mem', formData);
        return reqt;
    }
}

