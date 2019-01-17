import {
    Component
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
    AuthService
} from '../../services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private authService: AuthService,
        private router: Router,
        private snack: SnackbarService
    ) {
        this.loginForm = new FormGroup({
            login: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            mem: new FormControl(null, Validators.required)
        });
    }

    login() {
        const val = this.loginForm.value;

        if (val.login && val.password) {
            this.authService.login(val.login, val.password)
                .subscribe(
                    () => {
                        console.log('User is logged in');
                        this.router.navigateByUrl('/');
                    },
                    err => {
                        this.snack.open(err.error.message, 'Close', 5000);
                    }
                );
        }
    }

}
