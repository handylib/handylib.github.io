import { Component, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SelectpickerComponent {
    constructor(eRef) {
        this.eRef = eRef;
        this.show = false;
        this.focused = false;
        this.searchFocused = false;
        this.defaultOptions = {
            classes: {
                input: {
                    focus: "border-2 border-primary",
                    blur: "",
                    common: "form-control"
                },
                searchInput: {
                    focus: "",
                    blur: "",
                    common: "form-control"
                },
                container: {
                    common: "card"
                }
            },
            styles: {
                container: {
                    width: "100%",
                    maxWidth: "300px"
                }
            },
            search: false,
            searchPlaceholder: "Search..",
            searchThreshold: 0,
            searching: false
        };
        this.placeholder = "Select an option";
        this.data = [];
        this.options = {};
        this.search = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
    }
    getOptions() {
        return Object.assign({}, this.defaultOptions, this.options);
    }
    getItems() {
        return this.innerData;
    }
    get value() {
        return this.innerValue;
    }
    set value(value) {
        this.innerValue = value;
        this.onChange(value);
        this.onTouched(value);
    }
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            this.show = true;
            this.focused = true;
            this.searchFocused = true;
        }
        else {
            this.show = false;
            this.focused = false;
            this.searchFocused = false;
        }
    }
    setOutputValue(value, index) {
        var inst = this;
        this.value = value;
        setTimeout(function () {
            inst.show = false;
        }, 50);
    }
    writeValue(value) {
        if (value !== null) {
            this.value = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    handleSearch(event) {
        var options = this.getOptions();
        if (event.target.value.length == 0) {
            this.innerData = this.data;
        }
        if (options.search == true) {
            if (typeof options.searchThreshold !== "undefined") {
                if (event.target.value.length >= options.searchThreshold) {
                    if (this.search.observed) {
                        this.search.emit(event.target.value);
                    }
                    else {
                        this.innerData = this.data.filter(function (item) {
                            if (item?.label) {
                                return item.label.indexOf(event.target.value) >= 0;
                            }
                            return false;
                        });
                    }
                }
            }
        }
    }
    getValueTitle() {
        for (var item of this.data) {
            if (item.id == this.value) {
                return item.label;
            }
        }
        return this.placeholder;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        var inst = this;
    }
    ngOnChanges(changes) {
        if ("data" in changes) {
            this.innerData = changes["data"].currentValue;
        }
    }
}
SelectpickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SelectpickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
SelectpickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: SelectpickerComponent, selector: "selectpicker", inputs: { placeholder: "placeholder", data: "data", options: "options" }, outputs: { search: "search" }, host: { listeners: { "document:click": "clickout($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectpickerComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"component-container\">\n    <div class=\"{{getOptions()?.classes?.input?.common}} {{focused ? getOptions()?.classes?.input?.focus : getOptions()?.classes?.input?.blur}}\" #input (click)=\"show=true;focused=true\">\n        <label>{{getValueTitle()}}</label>\n        <span class=\"selectpicker-icon selectpicker-icon-down\"></span>\n    </div>\n    <div [style.display]=\"show==true ? 'block' : 'none'\" class=\"component-absolute {{getOptions()?.classes?.container?.common}}\" #container [style]=\"getOptions()?.styles?.container\">\n        <div class=\"selectpicker-search\" *ngIf=\"getOptions()?.search\">\n            <input type=\"text\" [placeholder]=\"getOptions()?.searchPlaceholder\" class=\"{{getOptions()?.classes?.searchInput?.common}} {{searchFocused ? getOptions()?.classes?.searchInput?.focus : getOptions()?.classes?.searchInput?.blur}}\" (keyup)=\"handleSearch($event)\">\n        </div>\n        <ng-content *ngIf=\"getOptions()?.searching\"></ng-content>\n        <ul class=\"selectpicker-options\">\n            <li *ngFor=\"let item of getItems();let i = index\" (click)=\"setOutputValue(item.id,i)\" class=\"{{item?.id == value ? 'active' : ''}}\">\n                <span>{{item.label}}</span>\n            </li>\n        </ul>\n    </div>\n</div>", styles: [".component-container{position:relative}.component-absolute{z-index:9;position:absolute}.selectpicker-search{width:100%;padding:10px;border-bottom:1px solid #ddd}ul.selectpicker-options{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;width:100%;max-height:200px;overflow:auto}ul.selectpicker-options>li{width:100%;align-items:center;padding:10px;font-weight:400;cursor:pointer}ul.selectpicker-options>li:hover{background:#ddd;color:#000}ul.selectpicker-options>li.active{background:#1266f1;color:#fff}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SelectpickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'selectpicker', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SelectpickerComponent),
                            multi: true
                        }
                    ], template: "<div class=\"component-container\">\n    <div class=\"{{getOptions()?.classes?.input?.common}} {{focused ? getOptions()?.classes?.input?.focus : getOptions()?.classes?.input?.blur}}\" #input (click)=\"show=true;focused=true\">\n        <label>{{getValueTitle()}}</label>\n        <span class=\"selectpicker-icon selectpicker-icon-down\"></span>\n    </div>\n    <div [style.display]=\"show==true ? 'block' : 'none'\" class=\"component-absolute {{getOptions()?.classes?.container?.common}}\" #container [style]=\"getOptions()?.styles?.container\">\n        <div class=\"selectpicker-search\" *ngIf=\"getOptions()?.search\">\n            <input type=\"text\" [placeholder]=\"getOptions()?.searchPlaceholder\" class=\"{{getOptions()?.classes?.searchInput?.common}} {{searchFocused ? getOptions()?.classes?.searchInput?.focus : getOptions()?.classes?.searchInput?.blur}}\" (keyup)=\"handleSearch($event)\">\n        </div>\n        <ng-content *ngIf=\"getOptions()?.searching\"></ng-content>\n        <ul class=\"selectpicker-options\">\n            <li *ngFor=\"let item of getItems();let i = index\" (click)=\"setOutputValue(item.id,i)\" class=\"{{item?.id == value ? 'active' : ''}}\">\n                <span>{{item.label}}</span>\n            </li>\n        </ul>\n    </div>\n</div>", styles: [".component-container{position:relative}.component-absolute{z-index:9;position:absolute}.selectpicker-search{width:100%;padding:10px;border-bottom:1px solid #ddd}ul.selectpicker-options{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;width:100%;max-height:200px;overflow:auto}ul.selectpicker-options>li{width:100%;align-items:center;padding:10px;font-weight:400;cursor:pointer}ul.selectpicker-options>li:hover{background:#ddd;color:#000}ul.selectpicker-options>li.active{background:#1266f1;color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { placeholder: [{
                type: Input,
                args: ["placeholder"]
            }], data: [{
                type: Input,
                args: ["data"]
            }], options: [{
                type: Input,
                args: ["options"]
            }], container: [{
                type: ViewChild,
                args: ["container"]
            }], input: [{
                type: ViewChild,
                args: ["input"]
            }], search: [{
                type: Output,
                args: ["search"]
            }], clickout: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0cGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZWxlY3RwaWNrZXIvc3JjL2xpYi9zZWxlY3RwaWNrZXIvc2VsZWN0cGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZWxlY3RwaWNrZXIvc3JjL2xpYi9zZWxlY3RwaWNrZXIvc2VsZWN0cGlja2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekssT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFnQnpFLE1BQU0sT0FBTyxxQkFBcUI7SUFFaEMsWUFDVSxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBSTFCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkvQixtQkFBYyxHQUFZO1lBQ3hCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLHlCQUF5QjtvQkFDaEMsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsTUFBTSxFQUFFLGNBQWM7aUJBQ3ZCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxJQUFJLEVBQUUsRUFBRTtvQkFDUixNQUFNLEVBQUUsY0FBYztpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0Y7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFO29CQUNULEtBQUssRUFBRSxNQUFNO29CQUNiLFFBQVEsRUFB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RSxDQUFDLHFCQUFxQixDQUFDO1lBQ3BELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRix3T0NmSCxxd0NBZ0JNOzJGRENPLHFCQUFxQjtrQkFaakMsU0FBUzsrQkFDRSxjQUFjLGFBR2I7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUM7NEJBQ3BELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lHQW1FcUIsV0FBVztzQkFBaEMsS0FBSzt1QkFBQyxhQUFhO2dCQUNMLElBQUk7c0JBQWxCLEtBQUs7dUJBQUMsTUFBTTtnQkFDSyxPQUFPO3NCQUF4QixLQUFLO3VCQUFDLFNBQVM7Z0JBQ1EsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXO2dCQUNGLEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTztnQkFDQSxNQUFNO3NCQUF2QixNQUFNO3VCQUFDLFFBQVE7Z0JBSWhCLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9wdGlvbnMsIFNlbGVjdFBpY2tlckl0ZW1zIH0gZnJvbSAnLi4vbmd4LXNlbGVjdHBpY2tlci5tb2R1bGUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdHBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3RwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3RwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RwaWNrZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0cGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuXG4gIHNob3c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWFyY2hGb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyVmFsdWU6IGFueTtcbiAgaW5uZXJEYXRhOiBhbnk7XG5cbiAgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnMgPSB7XG4gICAgY2xhc3Nlczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgZm9jdXM6IFwiYm9yZGVyLTIgYm9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgYmx1cjogXCJcIixcbiAgICAgICAgY29tbW9uOiBcImZvcm0tY29udHJvbFwiXG4gICAgICB9LFxuICAgICAgc2VhcmNoSW5wdXQ6IHtcbiAgICAgICAgZm9jdXM6IFwiXCIsXG4gICAgICAgIGJsdXI6IFwiXCIsXG4gICAgICAgIGNvbW1vbjogXCJmb3JtLWNvbnRyb2xcIlxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBjb21tb246IFwiY2FyZFwiXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIG1heFdpZHRoOiBcIjMwMHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlYXJjaDogZmFsc2UsXG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6IFwiU2VhcmNoLi5cIixcbiAgICBzZWFyY2hUaHJlc2hvbGQ6IDAsXG4gICAgc2VhcmNoaW5nOiBmYWxzZVxuICB9O1xuXG5cblxuXG5cbiAgZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5vcHRpb25zKTtcbiAgfVxuXG5cbiAgZ2V0SXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJEYXRhO1xuICB9XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgdGhpcy5vblRvdWNoZWQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KFwicGxhY2Vob2xkZXJcIikgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiU2VsZWN0IGFuIG9wdGlvblwiO1xuICBASW5wdXQoXCJkYXRhXCIpIGRhdGE6IFNlbGVjdFBpY2tlckl0ZW1zID0gW107XG4gIEBJbnB1dChcIm9wdGlvbnNcIikgb3B0aW9uczogT3B0aW9ucyA9IHt9O1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJpbnB1dFwiKSBpbnB1dCE6IEVsZW1lbnRSZWY7XG4gIEBPdXRwdXQoXCJzZWFyY2hcIikgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrb3V0KGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zaG93ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLnNlYXJjaEZvY3VzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hGb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cblxuICBzZXRPdXRwdXRWYWx1ZSh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGluc3Quc2hvdyA9IGZhbHNlO1xuICAgIH0sIDUwKTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBvblRvdWNoZWQgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmblxuICB9XG5cblxuICBoYW5kbGVTZWFyY2goZXZlbnQ6IGFueSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5pbm5lckRhdGEgPSB0aGlzLmRhdGE7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNlYXJjaCA9PSB0cnVlKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2VhcmNoVGhyZXNob2xkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID49IG9wdGlvbnMuc2VhcmNoVGhyZXNob2xkKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VhcmNoLm9ic2VydmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5lbWl0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJEYXRhID0gdGhpcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICBpZiAoaXRlbT8ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5sYWJlbC5pbmRleE9mKGV2ZW50LnRhcmdldC52YWx1ZSkgPj0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGdldFZhbHVlVGl0bGUoKSB7XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGlmIChpdGVtLmlkID09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyO1xuICB9XG5cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgIHZhciBpbnN0ID0gdGhpcztcblxuXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKFwiZGF0YVwiIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuaW5uZXJEYXRhID0gY2hhbmdlc1tcImRhdGFcIl0uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb21wb25lbnQtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInt7Z2V0T3B0aW9ucygpPy5jbGFzc2VzPy5pbnB1dD8uY29tbW9ufX0ge3tmb2N1c2VkID8gZ2V0T3B0aW9ucygpPy5jbGFzc2VzPy5pbnB1dD8uZm9jdXMgOiBnZXRPcHRpb25zKCk/LmNsYXNzZXM/LmlucHV0Py5ibHVyfX1cIiAjaW5wdXQgKGNsaWNrKT1cInNob3c9dHJ1ZTtmb2N1c2VkPXRydWVcIj5cbiAgICAgICAgPGxhYmVsPnt7Z2V0VmFsdWVUaXRsZSgpfX08L2xhYmVsPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdHBpY2tlci1pY29uIHNlbGVjdHBpY2tlci1pY29uLWRvd25cIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbc3R5bGUuZGlzcGxheV09XCJzaG93PT10cnVlID8gJ2Jsb2NrJyA6ICdub25lJ1wiIGNsYXNzPVwiY29tcG9uZW50LWFic29sdXRlIHt7Z2V0T3B0aW9ucygpPy5jbGFzc2VzPy5jb250YWluZXI/LmNvbW1vbn19XCIgI2NvbnRhaW5lciBbc3R5bGVdPVwiZ2V0T3B0aW9ucygpPy5zdHlsZXM/LmNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0cGlja2VyLXNlYXJjaFwiICpuZ0lmPVwiZ2V0T3B0aW9ucygpPy5zZWFyY2hcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtwbGFjZWhvbGRlcl09XCJnZXRPcHRpb25zKCk/LnNlYXJjaFBsYWNlaG9sZGVyXCIgY2xhc3M9XCJ7e2dldE9wdGlvbnMoKT8uY2xhc3Nlcz8uc2VhcmNoSW5wdXQ/LmNvbW1vbn19IHt7c2VhcmNoRm9jdXNlZCA/IGdldE9wdGlvbnMoKT8uY2xhc3Nlcz8uc2VhcmNoSW5wdXQ/LmZvY3VzIDogZ2V0T3B0aW9ucygpPy5jbGFzc2VzPy5zZWFyY2hJbnB1dD8uYmx1cn19XCIgKGtleXVwKT1cImhhbmRsZVNlYXJjaCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudCAqbmdJZj1cImdldE9wdGlvbnMoKT8uc2VhcmNoaW5nXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8dWwgY2xhc3M9XCJzZWxlY3RwaWNrZXItb3B0aW9uc1wiPlxuICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldEl0ZW1zKCk7bGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJzZXRPdXRwdXRWYWx1ZShpdGVtLmlkLGkpXCIgY2xhc3M9XCJ7e2l0ZW0/LmlkID09IHZhbHVlID8gJ2FjdGl2ZScgOiAnJ319XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgIDwvZGl2PlxuPC9kaXY+Il19