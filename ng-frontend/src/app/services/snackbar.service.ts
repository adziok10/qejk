import {
    Injectable,
    NgZone
} from '@angular/core';

import {
    MatSnackBar
} from '@angular/material';

@Injectable()
export class SnackbarService {
    constructor(
        public snackBar: MatSnackBar,
        protected zone: NgZone
    ) { }

    public open(message, action = 'success', duration = 500) {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration
            });
        });
    }
}
