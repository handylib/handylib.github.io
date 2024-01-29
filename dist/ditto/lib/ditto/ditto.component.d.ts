import { AfterViewInit, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import moment from 'moment';
import * as i0 from "@angular/core";
type DittoDateType = {
    date: number;
    formated: string;
    disabled: boolean;
};
export declare class DittoComponent implements OnInit, AfterViewInit {
    private cdRef;
    constructor(cdRef: ChangeDetectorRef);
    showErrors: boolean;
    show: boolean;
    container: ElementRef;
    element: ElementRef;
    format: string;
    picker: 'date' | 'time' | 'datetime' | 'duration' | 'month' | 'year';
    view: 'date' | 'time' | 'datetime' | 'duration' | 'month' | 'year' | 'hour' | 'minute' | 'hours' | 'minutes' | 'seconds';
    hours: boolean;
    minutes: boolean;
    seconds: boolean;
    disableBackDateTime: boolean;
    disableFutureDateTime: boolean;
    backDateTime: string;
    futureDateTime: string;
    duration: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    config: {
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
    getPrefixDays(): any[];
    getDatesInMonthArray(): DittoDateType[];
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
    setDate(d: DittoDateType): void;
    setMonth(m: number): void;
    setYear(y: number): void;
    setHour(h: number): void;
    setMinute(value: number): void;
    setDurationHours(value: number): void;
    setDurationMinutes(value: number): void;
    setDurationSeconds(value: number): void;
    apply(): void;
    padint(n: number, w?: number): string;
    getDisableMaskLabel(): {
        label: string;
        range: string;
    };
    isMonthDisabled(m: number): boolean;
    allYearRangeDisabled(): boolean;
    allMonthsDisabled(): boolean;
    isYearDisabled(y: number): boolean;
    isMomentDisabled(m: moment.Moment, mode?: 'year' | 'month' | 'hour' | 'none'): boolean;
    openDatePicker(event: any): void;
    closeDatePicker(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DittoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DittoComponent, "ditto", never, { "element": { "alias": "element"; "required": false; }; "format": { "alias": "format"; "required": false; }; "picker": { "alias": "picker"; "required": false; }; "view": { "alias": "view"; "required": false; }; "hours": { "alias": "hours"; "required": false; }; "minutes": { "alias": "minutes"; "required": false; }; "seconds": { "alias": "seconds"; "required": false; }; "disableBackDateTime": { "alias": "disableBackDateTime"; "required": false; }; "disableFutureDateTime": { "alias": "disableFutureDateTime"; "required": false; }; "backDateTime": { "alias": "backDateTime"; "required": false; }; "futureDateTime": { "alias": "futureDateTime"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
