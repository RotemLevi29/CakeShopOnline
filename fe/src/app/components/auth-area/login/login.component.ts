import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public user: UserModel;
    private unsubscribeMe: Unsubscribe;
    ngOnInit(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }


    public credentials = new CredentialsModel();

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            this.notify.success("You are logged-in :-)");
            this.myRouter.navigateByUrl("/home");
        }
        catch(err) {
            this.notify.error(err);
        }
    }

}
