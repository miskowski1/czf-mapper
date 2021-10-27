import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncludeFileComponent } from './include-file/include-file.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'czf-mapper';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(IncludeFileComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.snackBar.open('Plik wgrany prawidłowo');
    });
  }
}
