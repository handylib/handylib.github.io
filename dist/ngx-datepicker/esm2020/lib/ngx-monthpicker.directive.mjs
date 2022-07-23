import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-datepicker.service";
export class NgxMonthpickerDirective {
    constructor(cRef, eRef, Service) {
        this.cRef = cRef;
        this.eRef = eRef;
        this.Service = Service;
        this.initiated = false;
        this._value = "";
        this.format = "MM";
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
        inst.component.instance.config.mode = "month";
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
NgxMonthpickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxMonthpickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxMonthpickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgxMonthpickerDirective, selector: "[monthpicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxMonthpickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxMonthpickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[monthpicker]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxMonthpickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1vbnRocGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kYXRlcGlja2VyL3NyYy9saWIvbmd4LW1vbnRocGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQVl4RSxNQUFNLE9BQU8sdUJBQXVCO0lBRWxDLFlBQ1UsSUFBc0IsRUFDdEIsSUFBZ0IsRUFDaEIsT0FBNkI7UUFGN0IsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUt2QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBNkIzQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBZUgsV0FBTSxHQUFXLElBQUksQ0FBQztRQUV2QyxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixjQUFTLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQW5EeEIsQ0FBQztJQU1MLFdBQVc7SUFFWCxDQUFDO0lBSUQsZUFBZTtRQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFhO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBR0QsUUFBUTtJQUNSLENBQUM7SUFLRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQU9ELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ2xEO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOztvSEF6RVUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsc0VBUHZCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDdEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUFDOzJGQUVPLHVCQUF1QjtrQkFUbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDOzRCQUN0RCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFBQztpQkFDTDttS0F1RGtCLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neERhdGVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtZGF0ZXBpY2tlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21vbnRocGlja2VyXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4TW9udGhwaWNrZXJEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNb250aHBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIFNlcnZpY2U6IE5neERhdGVwaWNrZXJTZXJ2aWNlXG4gICkgeyB9XG5cblxuICBjb21wb25lbnQ6IGFueTtcbiAgaW5pdGlhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgfVxuXG5cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIGluc3QuY1JlZi5jbGVhcigpO1xuICAgIGluc3QuY29tcG9uZW50ID0gdGhpcy5jUmVmLmNyZWF0ZUNvbXBvbmVudChEYXRlcGlja2VyQ29tcG9uZW50KTtcbiAgICBpbnN0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UudmFsdWUgPSBpbnN0LnZhbHVlO1xuICAgIGluc3QuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQgPSB0aGlzLmVSZWY7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UuZm9ybWF0ID0gaW5zdC5mb3JtYXQ7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnLm1vZGUgPSBcIm1vbnRoXCI7XG4gICAgaW5zdC5jb21wb25lbnQuaW5zdGFuY2Uub25BcHBseSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpbnN0LnZhbHVlID0gdmFsdWU7XG4gICAgICBpbnN0LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIGluc3QuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuXG4gIF92YWx1ZTogc3RyaW5nID0gXCJcIjtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoXCJmb3JtYXRcIikgZm9ybWF0OiBzdHJpbmcgPSBcIk1NXCI7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIG9uVG91Y2hlZCA9IChfOiBhbnkpID0+IHsgfTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmluaXRpYXRlZCA9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cblxuXG59XG4iXX0=