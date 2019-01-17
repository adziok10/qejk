import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import {
    AuthService
} from '../../services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private authService: AuthService,
        private router: Router,
        private snack: SnackbarService) {
        this.registerForm = new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            login: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            password2: new FormControl(null, this.passValidator)
        });
    }

    ngOnInit() {}

    passValidator(control: AbstractControl) {
        if (control && (control.value !== null || control.value !== undefined)) {
            const cnfpassValue = control.value;

            const passControl = control.root.get('password');
            if (passControl) {
                const passValue = passControl.value;
                if (passValue !== cnfpassValue || passValue === '') {
                    return {
                        isError: true
                    };
                }
            }
        }

        return null;
    }

    signUp() {
        const val = this.registerForm.value;

        if (val.login && val.password && val.email) {
            this.authService.register(val.login, val.password, val.email)
                .subscribe(
                    () => {
                        this.snack.open('Successful register!', 'Close', 5000);
                        this.router.navigateByUrl('login');
                    },
                    err => {
                        this.snack.open(err.error.message, 'Close', 5000);
                    }
                );
        }
    }
}
