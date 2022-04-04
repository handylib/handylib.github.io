import { AfterViewInit, ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgxDatepickerService } from './ngx-datepicker.service';
import * as i0 from "@angular/core";
export declare class NgxMonthpickerDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    private cRef;
    private eRef;
    private Service;
    constructor(cRef: ViewContainerRef, eRef: ElementRef, Service: NgxDatepickerService);
    component: any;
    initiated: boolean;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    _value: string;
    get value(): string;
    set value(value: string);
    format: string;
    onChange: (_: any) => void;
    onTouched: (_: any) => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMonthpickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxMonthpickerDirective, "[monthpicker]", never, { "format": "format"; }, {}, never>;
}
