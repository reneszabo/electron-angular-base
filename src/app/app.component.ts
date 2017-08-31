import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'appaaasdasd';

    constructor(private _electronService: ElectronService) {
        this.title = this._electronService.process.env.HOST;
        this._electronService.ipcRenderer.on('pong', (sender, arg) => {
            console.log(arg);
        });
    }

    public playPingPong() {
        this._electronService.ipcRenderer.send('ping', 1);
    }

    public beep() {
        this._electronService.shell.beep();
    }
}
