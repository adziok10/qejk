import {
    Component,
    ChangeDetectorRef
} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import {
    Router
} from '@angular/router';


import {
    MemesApiService
} from '../../../../services/memes-api.service';
import {
    SnackbarService
} from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-mem-add',
    templateUrl: './mem-add.component.html',
    styleUrls: ['./mem-add.component.sass']
})
export class MemAddComponent {

    btnIsDisabled = false;
    memImage: File = null;
    memForm: FormGroup;

    constructor(private memApi: MemesApiService,
        private router: Router,
        private snack: SnackbarService,
        private cd: ChangeDetectorRef) {
        this.memForm = new FormGroup({
            title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
            description: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10000)])
        });
    }

    processFile(files: FileList) {
        this.memImage = files.item(0);
    }

    upload() {
        const val = this.memForm.value;

        if (val.title && val.description) {
            this.btnIsDisabled = true;
            this.memApi.sendMeme(val.title, val.description, this.memImage)
                .subscribe(
                    (url) => {
                        this.btnIsDisabled = false;
                        this.snack.open('Mem uploaded corectly', 'Close', 5000);
                        this.router.navigateByUrl('mem/' + url);
                    },
                    err => {
                        this.snack.open(err.error.message, 'Close', 5000);
                        this.btnIsDisabled = true;
                    }
                );
        }
    }
}
