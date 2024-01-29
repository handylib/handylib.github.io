import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DittoComponent } from './ditto/ditto.component';
import { DittoDirective } from './ditto.directive';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class DittoModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.1", ngImport: i0, type: DittoModule, declarations: [DittoComponent,
            DittoDirective], imports: [FormsModule,
            CommonModule], exports: [DittoDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoModule, imports: [FormsModule,
            CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DittoComponent,
                        DittoDirective
                    ],
                    exports: [
                        DittoDirective
                    ],
                    imports: [
                        FormsModule,
                        CommonModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl0dG8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGl0dG8vc3JjL2xpYi9kaXR0by5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBaUI3QyxNQUFNLE9BQU8sV0FBVzt1R0FBWCxXQUFXO3dHQUFYLFdBQVcsaUJBWHBCLGNBQWM7WUFDZCxjQUFjLGFBTWQsV0FBVztZQUNYLFlBQVksYUFKWixjQUFjO3dHQU9MLFdBQVcsWUFKcEIsV0FBVztZQUNYLFlBQVk7OzJGQUdILFdBQVc7a0JBYnZCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2QsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUc7d0JBQ1IsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxZQUFZO3FCQUNiO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGl0dG9Db21wb25lbnQgfSBmcm9tICcuL2RpdHRvL2RpdHRvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERpdHRvRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXR0by5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERpdHRvQ29tcG9uZW50LFxyXG4gICAgRGl0dG9EaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHMgOiBbXHJcbiAgICBEaXR0b0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXR0b01vZHVsZSB7IH1cclxuIl19