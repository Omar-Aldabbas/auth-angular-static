import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  @Input({ required: true, alias: 'appAuth' }) userType: Permission = 'guest';

  private service = inject(AuthService);
  private template = inject(TemplateRef); //access to the content
  private viewContainerRef = inject(ViewContainerRef); //refrance to aplace acccess to the place
  //by the prev injection we can say where to render what  

  constructor() {
    effect(() => {
      if (this.service.activePermission() === this.userType) {
        console.log('SHOW ELEMENT');
        this.viewContainerRef.createEmbeddedView(this.template)
  
      } else {
        console.log("DON'T SHOW ELEMeNT");
        this.viewContainerRef.clear()
      }
    });
  }
}
