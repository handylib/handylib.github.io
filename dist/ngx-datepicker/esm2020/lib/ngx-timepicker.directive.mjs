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
        if (typeof value !== "undefined" && value !== null) {
            this._value = value;
            this.onChange(this.value);
            this.onTouched(this.value);
            this.eRef.nativeElement.value = value;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsVUFBVSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFZeEUsTUFBTSxPQUFPLHNCQUFzQjtJQUVqQyxZQUNVLElBQXNCLEVBQ3RCLElBQWdCLEVBQ2hCLE9BQTZCO1FBRjdCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFLdkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQTZCM0IsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQWVILFdBQU0sR0FBVyxVQUFVLENBQUM7UUFFN0MsYUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFuRHhCLENBQUM7SUFNTCxXQUFXO0lBRVgsQ0FBQztJQUlELGVBQWU7UUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBYTtZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUdELFFBQVE7SUFDUixDQUFDO0lBS0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN2QztJQUNILENBQUM7SUFPRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNsRDtTQUNGO0lBQ0gsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7bUhBekVVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLHFFQVB0QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ3JELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FBQzsyRkFFTyxzQkFBc0I7a0JBVGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQzs0QkFDckQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQUM7aUJBQ0w7bUtBdURrQixNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hEYXRlcGlja2VyU2VydmljZSB9IGZyb20gJy4vbmd4LWRhdGVwaWNrZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0aW1lcGlja2VyXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4VGltZXBpY2tlckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBTZXJ2aWNlOiBOZ3hEYXRlcGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgY29tcG9uZW50OiBhbnk7XG4gIGluaXRpYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gIH1cblxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICBpbnN0LmNSZWYuY2xlYXIoKTtcbiAgICBpbnN0LmNvbXBvbmVudCA9IHRoaXMuY1JlZi5jcmVhdGVDb21wb25lbnQoRGF0ZXBpY2tlckNvbXBvbmVudCk7XG4gICAgaW5zdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLnZhbHVlID0gaW5zdC52YWx1ZTtcbiAgICBpbnN0LmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50ID0gdGhpcy5lUmVmO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmZvcm1hdCA9IGluc3QuZm9ybWF0O1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZy5tb2RlID0gXCJ0aW1lXCI7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2Uub25BcHBseSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpbnN0LnZhbHVlID0gdmFsdWU7XG4gICAgICBpbnN0LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIGluc3QuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuXG4gIF92YWx1ZTogc3RyaW5nID0gXCJcIjtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoXCJmb3JtYXRcIikgZm9ybWF0OiBzdHJpbmcgPSBcIkhIOm1tOnNzXCI7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIG9uVG91Y2hlZCA9IChfOiBhbnkpID0+IHsgfTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmluaXRpYXRlZCA9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cblxuXG59XG4iXX0=