import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-datepicker.service";
export class NgxTimepickerDirective {
    constructor(cRef, eRef, Service) {
        this.cRef = cRef;
        this.eRef = eRef;
        this.Service = Service;
        this.initiated = false;
        this._value = "";
        this.format = "HH:mm:ss";
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
    }
    ngOnDestroy() {
    }
    ngAfterViewInit() {
        var inst = this;
        inst.cRef.clear();
        inst.component = this.cRef.createComponent(DatepickerComponent);
        inst.initiated = true;
        inst.component.instance.value = inst.value;
        inst.component.instance.element = this.eRef;
        inst.component.instance.format = inst.format;
        inst.component.instance.config.mode = "time";
        inst.component.instance.onApply = function (value) {
            inst.value = value;
            inst.component.changeDetectorRef.detectChanges();
        };
        inst.component.changeDetectorRef.detectChanges();
    }
    ngOnInit() {
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.onChange(this.value);
        this.onTouched(this.value);
        this.eRef.nativeElement.value = value;
    }
    writeValue(value) {
        if (value !== null) {
            this.value = value;
            if (this.initiated == true) {
                this.component.instance.value = value;
                this.component.changeDetectorRef.detectChanges();
            }
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
NgxTimepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxTimepickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxTimepickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgxTimepickerDirective, selector: "[timepicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxTimepickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxTimepickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[timepicker]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxTimepickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsVUFBVSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFZeEUsTUFBTSxPQUFPLHNCQUFzQjtJQUVqQyxZQUNVLElBQXNCLEVBQ3RCLElBQWdCLEVBQ2hCLE9BQTZCO1FBRjdCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFLdkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQTZCM0IsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQWFILFdBQU0sR0FBVyxVQUFVLENBQUM7UUFFN0MsYUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFqRHhCLENBQUM7SUFNTCxXQUFXO0lBRVgsQ0FBQztJQUlELGVBQWU7UUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBYTtZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUdELFFBQVE7SUFDUixDQUFDO0lBS0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQU9ELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ2xEO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzttSEF2RVUsc0JBQXNCO3VHQUF0QixzQkFBc0IscUVBUHRCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDckQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUFDOzJGQUVPLHNCQUFzQjtrQkFUbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDOzRCQUNyRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFBQztpQkFDTDttS0FxRGtCLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neERhdGVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtZGF0ZXBpY2tlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RpbWVwaWNrZXJdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hUaW1lcGlja2VyRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIFNlcnZpY2U6IE5neERhdGVwaWNrZXJTZXJ2aWNlXG4gICkgeyB9XG5cblxuICBjb21wb25lbnQ6IGFueTtcbiAgaW5pdGlhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgfVxuXG5cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIGluc3QuY1JlZi5jbGVhcigpO1xuICAgIGluc3QuY29tcG9uZW50ID0gdGhpcy5jUmVmLmNyZWF0ZUNvbXBvbmVudChEYXRlcGlja2VyQ29tcG9uZW50KTtcbiAgICBpbnN0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UudmFsdWUgPSBpbnN0LnZhbHVlO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQgPSB0aGlzLmVSZWY7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UuZm9ybWF0ID0gaW5zdC5mb3JtYXQ7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnLm1vZGUgPSBcInRpbWVcIjtcbiAgICBpbnN0LmNvbXBvbmVudC5pbnN0YW5jZS5vbkFwcGx5ID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGluc3QuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgaW5zdC5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG5cbiAgX3ZhbHVlOiBzdHJpbmcgPSBcIlwiO1xuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLm9uVG91Y2hlZCh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLmVSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KFwiZm9ybWF0XCIpIGZvcm1hdDogc3RyaW5nID0gXCJISDptbTpzc1wiO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBvblRvdWNoZWQgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5pbml0aWF0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG5cblxufVxuIl19