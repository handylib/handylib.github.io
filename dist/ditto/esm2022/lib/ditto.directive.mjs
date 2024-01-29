import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DittoComponent } from './ditto/ditto.component';
import moment from 'moment';
import * as i0 from "@angular/core";
export class DittoDirective {
    cRef;
    eRef;
    constructor(cRef, eRef) {
        this.cRef = cRef;
        this.eRef = eRef;
    }
    format = "";
    picker = 'date';
    hours = true;
    minutes = true;
    seconds = true;
    backDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    futureDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    disableBackDateTime = false;
    disableFutureDateTime = false;
    component;
    initiated = false;
    ngOnDestroy() {
    }
    setView() {
        if (this.initiated) {
            if (this.picker == 'date' || this.picker == 'datetime') {
                this.component.instance.view = 'year';
            }
            else if (this.picker == 'time') {
                this.component.instance.view = 'hour';
            }
            if (this.picker == 'duration') {
                if (this.hours) {
                    this.component.instance.view = 'hours';
                }
                else if (this.minutes) {
                    this.component.instance.view = 'minutes';
                }
                else if (this.seconds) {
                    this.component.instance.view = 'seconds';
                }
            }
            if (this.picker == 'year') {
                this.component.instance.view = 'year';
            }
            if (this.picker == 'month') {
                this.component.instance.view = 'month';
            }
            this.component.instance.disableBackDateTime = this.disableBackDateTime;
            this.component.instance.disableFutureDateTime = this.disableFutureDateTime;
            this.component.instance.backDateTime = this.backDateTime;
            this.component.instance.futureDateTime = this.futureDateTime;
        }
    }
    ngOnChanges(changes) {
        if (this.initiated) {
            this.component.instance.hours = this.hours;
            this.component.instance.minutes = this.minutes;
            this.component.instance.seconds = this.seconds;
            this.setView();
        }
    }
    ngAfterViewInit() {
        if (this.format == "") {
            if (this.picker == 'datetime') {
                this.format = 'YYYY-MM-DD HH:mm:ss';
            }
            else if (this.picker == 'date') {
                this.format = 'YYYY-MM-DD';
            }
            else if (this.picker == 'time') {
                this.format = 'HH:mm:ss';
            }
            else if (this.picker == 'month') {
                this.format = 'MMMM';
            }
            else if (this.picker == 'year') {
                this.format = 'YYYY';
            }
            else if (this.picker == 'duration') {
                this.format = '';
            }
        }
        this.cRef.clear();
        this.component = this.cRef.createComponent(DittoComponent);
        this.initiated = true;
        this.component.instance.value = this.value;
        this.component.instance.element = this.eRef;
        this.component.instance.format = this.format;
        this.component.instance.picker = this.picker;
        this.component.instance.hours = this.hours;
        this.component.instance.minutes = this.minutes;
        this.component.instance.seconds = this.seconds;
        this.setView();
        this.component.instance.onApply = (value) => {
            this.value = value;
            this.component.changeDetectorRef.detectChanges();
        };
        this.component.changeDetectorRef.detectChanges();
    }
    ngOnInit() {
    }
    _value = "";
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
    onChange = (_) => { };
    onTouched = (_) => { };
    writeValue(value) {
        if (value !== null) {
            this.value = value;
            if (this.initiated == true) {
                this.component.instance.value = value;
                if (this.picker == 'year' || this.picker == 'datetime' || this.picker == 'date') {
                    var startYear = Number(moment(this._value, this.format).format('YYYY'));
                    if (!isNaN(startYear)) {
                        this.component.instance.config.startYear = startYear;
                    }
                }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.1", type: DittoDirective, selector: "[ditto]", inputs: { format: "format", picker: "picker", hours: "hours", minutes: "minutes", seconds: "seconds", backDateTime: "backDateTime", futureDateTime: "futureDateTime", disableBackDateTime: "disableBackDateTime", disableFutureDateTime: "disableFutureDateTime" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DittoDirective),
                multi: true
            }
        ], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ditto]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DittoDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }], propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }], picker: [{
                type: Input,
                args: ['picker']
            }], hours: [{
                type: Input,
                args: ['hours']
            }], minutes: [{
                type: Input,
                args: ['minutes']
            }], seconds: [{
                type: Input,
                args: ['seconds']
            }], backDateTime: [{
                type: Input,
                args: ['backDateTime']
            }], futureDateTime: [{
                type: Input,
                args: ['futureDateTime']
            }], disableBackDateTime: [{
                type: Input,
                args: ['disableBackDateTime']
            }], disableFutureDateTime: [{
                type: Input,
                args: ['disableFutureDateTime']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl0dG8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGl0dG8vc3JjL2xpYi9kaXR0by5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUErQixTQUFTLEVBQWMsVUFBVSxFQUFFLEtBQUssRUFBaUUsTUFBTSxlQUFlLENBQUM7QUFDckssT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBVzVCLE1BQU0sT0FBTyxjQUFjO0lBR2Y7SUFDQTtJQUZWLFlBQ1UsSUFBc0IsRUFDdEIsSUFBZ0I7UUFEaEIsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN0QixDQUFDO0lBR1ksTUFBTSxHQUFXLEVBQUUsQ0FBQztJQUNwQixNQUFNLEdBQWtFLE1BQU0sQ0FBQztJQUNoRixLQUFLLEdBQWEsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBYSxJQUFJLENBQUM7SUFDekIsT0FBTyxHQUFhLElBQUksQ0FBQztJQUNwQixZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDcEQsY0FBYyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25ELG1CQUFtQixHQUFhLEtBQUssQ0FBQztJQUNwQyxxQkFBcUIsR0FBYSxLQUFLLENBQUM7SUFFeEUsU0FBUyxDQUFnQztJQUN6QyxTQUFTLEdBQVksS0FBSyxDQUFDO0lBRTNCLFdBQVc7SUFFWCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO1lBR2pCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFN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SyxFQUFFLElBQUk7eUJBQ1o7cUJBQUM7aUJBQ0w7OEdBU2tCLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUTtnQkFDRSxNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVE7Z0JBQ0MsS0FBSztzQkFBcEIsS0FBSzt1QkFBQyxPQUFPO2dCQUNJLE9BQU87c0JBQXhCLEtBQUs7dUJBQUMsU0FBUztnQkFDRSxPQUFPO3NCQUF4QixLQUFLO3VCQUFDLFNBQVM7Z0JBQ08sWUFBWTtzQkFBbEMsS0FBSzt1QkFBQyxjQUFjO2dCQUNJLGNBQWM7c0JBQXRDLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQUNPLG1CQUFtQjtzQkFBaEQsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBQ0kscUJBQXFCO3NCQUFwRCxLQUFLO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERpdHRvQ29tcG9uZW50IH0gZnJvbSAnLi9kaXR0by9kaXR0by5jb21wb25lbnQnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tkaXR0b10nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGl0dG9EaXJlY3RpdmUpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIERpdHRvRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgZVJlZjogRWxlbWVudFJlZixcclxuICApIHsgfVxyXG5cclxuXHJcbiAgQElucHV0KFwiZm9ybWF0XCIpIGZvcm1hdDogc3RyaW5nID0gXCJcIjtcclxuICBASW5wdXQoJ3BpY2tlcicpIHBpY2tlciA6ICdkYXRlJyB8ICd0aW1lJyB8ICdkYXRldGltZScgfCAnZHVyYXRpb24nIHwgJ21vbnRoJyB8ICd5ZWFyJyA9ICdkYXRlJztcclxuICBASW5wdXQoJ2hvdXJzJykgaG91cnMgOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoJ21pbnV0ZXMnKSBtaW51dGVzIDogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCdzZWNvbmRzJykgc2Vjb25kcyA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgnYmFja0RhdGVUaW1lJykgYmFja0RhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgQElucHV0KCdmdXR1cmVEYXRlVGltZScpIGZ1dHVyZURhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgQElucHV0KCdkaXNhYmxlQmFja0RhdGVUaW1lJykgZGlzYWJsZUJhY2tEYXRlVGltZSA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoJ2Rpc2FibGVGdXR1cmVEYXRlVGltZScpIGRpc2FibGVGdXR1cmVEYXRlVGltZSA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29tcG9uZW50ITogQ29tcG9uZW50UmVmPERpdHRvQ29tcG9uZW50PjtcclxuICBpbml0aWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcblxyXG4gIH1cclxuXHJcbiAgc2V0Vmlldygpe1xyXG4gICAgaWYodGhpcy5pbml0aWF0ZWQpe1xyXG4gICAgXHJcblxyXG4gICAgICBpZih0aGlzLnBpY2tlciA9PSAnZGF0ZScgfHwgdGhpcy5waWNrZXIgPT0gJ2RhdGV0aW1lJyl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudmlldyA9ICd5ZWFyJztcclxuICAgICAgfWVsc2UgaWYodGhpcy5waWNrZXIgPT0gJ3RpbWUnKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52aWV3ID0gJ2hvdXInO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgaWYodGhpcy5waWNrZXIgPT0gJ2R1cmF0aW9uJyl7XHJcbiAgICAgICAgaWYodGhpcy5ob3Vycyl7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52aWV3ID0gJ2hvdXJzJztcclxuICAgICAgICB9ZWxzZSAgIGlmKHRoaXMubWludXRlcyl7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52aWV3ID0gJ21pbnV0ZXMnO1xyXG4gICAgICAgIH1lbHNlICAgaWYodGhpcy5zZWNvbmRzKXtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnZpZXcgPSAnc2Vjb25kcyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgaWYodGhpcy5waWNrZXIgPT0gJ3llYXInKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS52aWV3ID0gJ3llYXInO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgaWYodGhpcy5waWNrZXIgPT0gJ21vbnRoJyl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudmlldyA9ICdtb250aCc7XHJcbiAgICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZGlzYWJsZUJhY2tEYXRlVGltZSA9IHRoaXMuZGlzYWJsZUJhY2tEYXRlVGltZTtcclxuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZGlzYWJsZUZ1dHVyZURhdGVUaW1lID0gdGhpcy5kaXNhYmxlRnV0dXJlRGF0ZVRpbWU7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmJhY2tEYXRlVGltZSA9IHRoaXMuYmFja0RhdGVUaW1lO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5mdXR1cmVEYXRlVGltZSAgPSB0aGlzLmZ1dHVyZURhdGVUaW1lO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZih0aGlzLmluaXRpYXRlZCl7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmhvdXJzID0gdGhpcy5ob3VycztcclxuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UubWludXRlcyA9IHRoaXMubWludXRlcztcclxuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2Uuc2Vjb25kcyA9IHRoaXMuc2Vjb25kcztcclxuICAgICAgdGhpcy5zZXRWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcblxyXG4gICAgaWYodGhpcy5mb3JtYXQgPT0gXCJcIil7XHJcbiAgICAgIGlmKHRoaXMucGlja2VyID09ICdkYXRldGltZScpe1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gJ1lZWVktTU0tREQgSEg6bW06c3MnO1xyXG4gICAgICB9ZWxzZSBpZih0aGlzLnBpY2tlciA9PSAnZGF0ZScpe1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gJ1lZWVktTU0tREQnO1xyXG4gICAgICB9ZWxzZSBpZih0aGlzLnBpY2tlciA9PSAndGltZScpe1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gJ0hIOm1tOnNzJztcclxuICAgICAgfWVsc2UgaWYodGhpcy5waWNrZXIgPT0gJ21vbnRoJyl7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAnTU1NTSc7XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMucGlja2VyID09ICd5ZWFyJyl7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAnWVlZWSc7XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMucGlja2VyID09ICdkdXJhdGlvbicpe1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gJyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiBcclxuICAgIHRoaXMuY1JlZi5jbGVhcigpO1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNSZWYuY3JlYXRlQ29tcG9uZW50KERpdHRvQ29tcG9uZW50KTtcclxuICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcclxuXHJcbiAgIFxyXG5cclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQgPSB0aGlzLmVSZWY7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5mb3JtYXQgPSB0aGlzLmZvcm1hdDtcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnBpY2tlciA9IHRoaXMucGlja2VyO1xyXG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuaG91cnMgPSB0aGlzLmhvdXJzO1xyXG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UubWludXRlcyA9IHRoaXMubWludXRlcztcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnNlY29uZHMgPSB0aGlzLnNlY29uZHM7XHJcblxyXG4gICAgdGhpcy5zZXRWaWV3KCk7XHJcblxyXG5cclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLm9uQXBwbHkgPSAgKHZhbHVlOiBzdHJpbmcpPT57XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gIH1cclxuXHJcblxyXG4gIF92YWx1ZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgdGhpcy5vblRvdWNoZWQodGhpcy52YWx1ZSk7XHJcbiAgICAgIHRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcbiAgb25Ub3VjaGVkID0gKF86IGFueSkgPT4geyB9O1xyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLmluaXRpYXRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLnBpY2tlciA9PSAneWVhcicgfHwgdGhpcy5waWNrZXIgPT0gJ2RhdGV0aW1lJyB8fCB0aGlzLnBpY2tlciA9PSAnZGF0ZScpe1xyXG4gICAgICAgICB2YXIgc3RhcnRZZWFyICA9IE51bWJlcihtb21lbnQodGhpcy5fdmFsdWUsdGhpcy5mb3JtYXQpLmZvcm1hdCgnWVlZWScpKTtcclxuICAgICAgICAgaWYoIWlzTmFOKHN0YXJ0WWVhcikpe1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnLnN0YXJ0WWVhciA9IHN0YXJ0WWVhcjtcclxuICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==