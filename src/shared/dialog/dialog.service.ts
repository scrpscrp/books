import { Overlay } from '@angular/cdk/overlay';
import { ComponentType, ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogRef } from './dialog.ref';
import { DIALOG_DATA } from './dialog.token';

export interface DialogConfig {
  data?: unknown;
  panelClass?:string
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private readonly overlay: Overlay, private injector: Injector) {}

  public open<T>(
    component: ComponentType<T>,
    config?: DialogConfig
  ): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: config?.panelClass ? config.panelClass : 'overlay-panel',
      
    });

    const dialogRef = new DialogRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRef
        },
        {
          provide: DIALOG_DATA,
          useValue: config?.data
        }
      ]
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
