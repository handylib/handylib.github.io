import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-datepicker.service";
export class NgxYearpickerDirective {
    constructor(cRef, eRef, Service) {
        this.cRef = cRef;
        this.eRef = eRef;
        this.Service = Service;
        this.initiated = false;
        this._value = "";
        this.format = "YYYY";
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
        inst.component.instance.config.mode = "year";
        inst.component.instance.config.view = "yearpicker";
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
NgxYearpickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0, type: NgxYearpickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxYearpickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.1", type: NgxYearpickerDirective, selector: "[yearpicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxYearpickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0, type: NgxYearpickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[yearpicker]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxYearpickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXllYXJwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gteWVhcnBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsVUFBVSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFZeEUsTUFBTSxPQUFPLHNCQUFzQjtJQUVqQyxZQUNVLElBQXNCLEVBQ3RCLElBQWdCLEVBQ2hCLE9BQTZCO1FBRjdCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFLdkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQThCM0IsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQWVILFdBQU0sR0FBVyxNQUFNLENBQUM7UUFFekMsYUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFwRHhCLENBQUM7SUFNTCxXQUFXO0lBRVgsQ0FBQztJQUlELGVBQWU7UUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBYTtZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUdELFFBQVE7SUFDUixDQUFDO0lBS0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN2QztJQUNILENBQUM7SUFPRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNsRDtTQUNGO0lBQ0gsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7bUhBMUVVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLHFFQVB0QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ3JELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FBQzsyRkFFTyxzQkFBc0I7a0JBVGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQzs0QkFDckQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQUM7aUJBQ0w7bUtBd0RrQixNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hEYXRlcGlja2VyU2VydmljZSB9IGZyb20gJy4vbmd4LWRhdGVwaWNrZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t5ZWFycGlja2VyXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4WWVhcnBpY2tlckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5neFllYXJwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBTZXJ2aWNlOiBOZ3hEYXRlcGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgY29tcG9uZW50OiBhbnk7XG4gIGluaXRpYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gIH1cblxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICBpbnN0LmNSZWYuY2xlYXIoKTtcbiAgICBpbnN0LmNvbXBvbmVudCA9IHRoaXMuY1JlZi5jcmVhdGVDb21wb25lbnQoRGF0ZXBpY2tlckNvbXBvbmVudCk7XG4gICAgaW5zdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLnZhbHVlID0gaW5zdC52YWx1ZTtcbiAgICBpbnN0LmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50ID0gdGhpcy5lUmVmO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmZvcm1hdCA9IGluc3QuZm9ybWF0O1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZy5tb2RlID0gXCJ5ZWFyXCI7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnLnZpZXcgPSBcInllYXJwaWNrZXJcIjtcbiAgICBpbnN0LmNvbXBvbmVudC5pbnN0YW5jZS5vbkFwcGx5ID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGluc3QuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgaW5zdC5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG5cbiAgX3ZhbHVlOiBzdHJpbmcgPSBcIlwiO1xuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5vblRvdWNoZWQodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLmVSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dChcImZvcm1hdFwiKSBmb3JtYXQ6IHN0cmluZyA9IFwiWVlZWVwiO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBvblRvdWNoZWQgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5pbml0aWF0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG5cblxufVxuIl19