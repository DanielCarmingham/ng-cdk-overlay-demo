import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from './over.ref';
import { OverlayComponent } from './overlay/overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T
  ): MyOverlayRef<T> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'modal-background'
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const tokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, tokens);
  }
}
