import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingStubComponent } from './loading-stub/loading-stub.component';
import { GenresSelectorComponent } from './genres-selector/genres-selector.component';
import { KeysPipe } from '../../common/pipes/keys.pipe';
import { ValuesPipe } from '../../common/pipes/values.pipe';
import { PrepareNumericDatePipe } from '../../common/pipes/prepare-numeric-date.pipe';
import { PrepareSymbolicDatePipe } from '../../common/pipes/prepare-symbolic-date.pipe';
import { PopupComponent } from './popup/popup.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { IOSCheckboxComponent } from './ios-checkbox/ios-checkbox.component';
import { ToFixedPipe } from '../../common/pipes/to-fixed.pipe';

@NgModule({
  declarations: [
    PopupComponent,
    LoadingStubComponent,
    GenresSelectorComponent,
    UserBarComponent,
    IOSCheckboxComponent,
    KeysPipe,
    ValuesPipe,
    PrepareNumericDatePipe,
    PrepareSymbolicDatePipe,
    ToFixedPipe
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    PopupComponent,
    LoadingStubComponent,
    GenresSelectorComponent,
    UserBarComponent,
    IOSCheckboxComponent,
    KeysPipe,
    ValuesPipe,
    PrepareNumericDatePipe,
    PrepareSymbolicDatePipe,
    ToFixedPipe
  ]
})

export class SharedModule {}
