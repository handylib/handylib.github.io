import * as i0 from '@angular/core';
import { Injectable, EventEmitter, forwardRef, Component, Input, ViewChild, Output, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgxSelectpickerService {
    constructor() { }
}
NgxSelectpickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxSelectpickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class SelectpickerComponent {
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

class NgxSelectpickerModule {
}
NgxSelectpickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxSelectpickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerModule, declarations: [SelectpickerComponent], imports: [CommonModule], exports: [SelectpickerComponent] });
NgxSelectpickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxSelectpickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SelectpickerComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        SelectpickerComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-selectpicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxSelectpickerModule, NgxSelectpickerService, SelectpickerComponent };
//# sourceMappingURL=handylib-ngx-selectpicker.mjs.map
