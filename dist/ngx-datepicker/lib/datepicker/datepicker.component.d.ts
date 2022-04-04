import { AfterViewInit, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DatepickerComponent implements OnInit, AfterViewInit {
    private document;
    private cdRef;
    constructor(document: Document, cdRef: ChangeDetectorRef);
    show: boolean;
    container: ElementRef;
    element: ElementRef;
    format: string;
    config: {
        mode: string;
        view: string;
        timepicker: string;
        position: {
            x: number;
            y: number;
        };
        startYear: number;
        icons: {
            left: string;
            right: string;
            up: string;
            down: string;
        };
        weeks: string[];
        months: string[];
    };
    _value: string;
    get value(): string;
    set value(value: string);
    onApply: any;
    trackBy(n: number): number;
    getDatesInMonthArray(): {
        date: string;
        formated: string;
    }[];
    getDaysInMonth(): any[];
    getArrayOf(n: number): any[];
    titleCase(str: string): string;
    prefixZero(n: number): string;
    limitChar(str: string, n: number): string;
    setNextYearRange(): void;
    setPrevYearRange(): void;
    setNextMonth(): void;
    setPrevMonth(): void;
    getYearsRange(): number[];
    setPosition(): {
        container: any;
        directive: any;
    };
    getFormated(format: string): string;
    isCurrent(value: any, mode: string): boolean;
    setAmPm(value: string): void;
    setDate(value: any): void;
    setMonth(value: number): void;
    setYear(value: number): void;
    setHour(value: number): void;
    setMinute(value: number): void;
    apply(): void;
    openDatePicker(event: any): void;
    closeDatePicker(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatepickerComponent, "datepicker", never, { "element": "element"; "format": "format"; }, {}, never, never>;
}
