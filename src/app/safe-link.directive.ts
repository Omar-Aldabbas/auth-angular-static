import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  @Input({ required: true, alias: 'appSafeLink' }) queryParam: string = 'myapp';

  //   private hostElRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
  constructor(private hostElRef: ElementRef<HTMLAnchorElement>) {}

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app');

    if (wantsToLeave) {
      //   const address = (event.target as HTMLAnchorElement).href;
      //   (event.target as HTMLAnchorElement).href =
      //     address + '?from=' + this.queryParam;
      //   return;
      const address = this.hostElRef.nativeElement.href;

      this.hostElRef.nativeElement.href = address + '?from=' + this.queryParam;
      return;
    }

    event.preventDefault();
  }
}
