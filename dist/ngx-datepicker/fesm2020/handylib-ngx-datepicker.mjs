import * as i0 from '@angular/core';
import { Injectable, Component, Inject, ViewChild, Input, forwardRef, Directive, NgModule } from '@angular/core';
import moment from 'moment';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class NgxDatepickerService {
    constructor() { }
}
NgxDatepickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxDatepickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class DatepickerComponent {
    constructor(document, cdRef) {
        this.document = document;
        this.cdRef = cdRef;
        this.show = false;
        this.format = "YYYY-MM-DD HH:mm:ss";
        this.config = {
            mode: "datetime",
            view: "datepicker",
            timepicker: '',
            position: {
                x: 0,
                y: 0
            },
            startYear: new Date().getFullYear(),
            icons: {
                left: "🡰",
                right: "🡲",
                up: "🡱",
                down: "🡳"
            },
            weeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        };
        this._value = "";
        this.onApply = (_v) => { };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (value !== "" && value !== null && typeof value !== "undefined") {
            if (moment(value, this.format).isValid()) {
                this._value = value;
            }
            else {
                console.log("Invalid date");
            }
        }
    }
    trackBy(n) {
        return n;
    }
    getPrefixDays() {
        var date = moment(this.value, this.format).startOf('month');
        var day = Number(date.format("d"));
        return new Array(day);
    }
    getDatesInMonthArray() {
        var dates = [];
        var a = moment(this.value, this.format).startOf('month').format('YYYY-MM-DD');
        var b = moment(this.value, this.format).endOf('month').format('YYYY-MM-DD');
        for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
            dates.push({
                date: m.format('D'),
                formated: m.format("YYYY-MM-DD")
            });
        }
        return dates;
    }
    getDaysInMonth() {
        return new Array(moment().daysInMonth());
    }
    getArrayOf(n) {
        return new Array(n);
    }
    titleCase(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }
    prefixZero(n) {
        return ('0' + n).slice(-2);
    }
    limitChar(str, n) {
        return str.substring(0, n);
    }
    setNextYearRange() {
        this.config.startYear = this.config.startYear + 15;
    }
    setPrevYearRange() {
        this.config.startYear = this.config.startYear - 14;
    }
    setNextMonth() {
        this.value = moment(this.value, this.format).add(1, "M").format(this.format);
    }
    setPrevMonth() {
        this.value = moment(this.value, this.format).add(-1, "M").format(this.format);
    }
    getYearsRange() {
        var years = [];
        var startYear = this.config.startYear - 8;
        var endYear = this.config.startYear + 7;
        for (var y = startYear; y <= endYear; y++) {
            years.push(y);
        }
        return years;
    }
    setPosition() {
        var inst = this;
        var directiveRect = inst.element.nativeElement.getBoundingClientRect();
        var containerRect = inst.container.nativeElement.getBoundingClientRect();
        if (window.innerWidth <= 600 || window.innerHeight <= 600) {
            inst.config.position.x = (window.innerWidth - containerRect.width) / 2;
            inst.config.position.y = (window.innerHeight - containerRect.height) / 2;
            inst.cdRef.detectChanges();
            return {
                container: containerRect,
                directive: directiveRect
            };
        }
        if (window.innerHeight <= directiveRect.height + containerRect.height + directiveRect.y) {
            inst.config.position.x = directiveRect.x;
            inst.config.position.y = ((directiveRect.y - containerRect.height) + directiveRect.height) - directiveRect.height;
        }
        else if (window.innerWidth <= directiveRect.width + containerRect.width + directiveRect.x) {
            inst.config.position.y = directiveRect.y + directiveRect.height;
            inst.config.position.x = ((directiveRect.x - containerRect.width) + directiveRect.width);
        }
        else {
            inst.config.position.x = directiveRect.x;
            inst.config.position.y = directiveRect.y + directiveRect.height;
        }
        inst.cdRef.detectChanges();
        return {
            container: containerRect,
            directive: directiveRect
        };
    }
    getFormated(format) {
        return moment(this.value, this.format).format(format);
    }
    isCurrent(value, mode) {
        if (mode == "hour") {
            if (value == moment(this.value, this.format).format("h")) {
                return true;
            }
        }
        else if (mode == "minute") {
            if (value == moment(this.value, this.format).format("m")) {
                return true;
            }
        }
        else if (mode == "ampm") {
            if (value.toLowerCase() == moment(this.value, this.format).format("A").toLowerCase()) {
                return true;
            }
        }
        else if (mode == "date") {
            if (value == moment(this.value, this.format).format("YYYY-MM-DD")) {
                return true;
            }
        }
        else if (mode == "month") {
            if (value.toString().toLowerCase() == moment(this.value, this.format).format("M").toLowerCase()) {
                return true;
            }
        }
        else if (mode == "year") {
            if (value.toString().toLowerCase() == moment(this.value, this.format).format("YYYY").toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    setAmPm(value) {
        var date = moment(this.value, this.format).format("YYYY-MM-DD hh:mm:ss A");
        date = date.replace("AM", value).replace("PM", value);
        this.value = moment(date, "YYYY-MM-DD hh:mm:ss A").format(this.format);
    }
    setDate(value) {
        this.value = moment(this.value, this.format).set("D", value).format(this.format);
    }
    setMonth(value) {
        this.value = moment(this.value, this.format).set("M", value).format(this.format);
    }
    setYear(value) {
        this.value = moment(this.value, this.format).set("year", value).format(this.format);
    }
    setHour(value) {
        this.value = moment(this.value, this.format).set("h", value).format(this.format);
    }
    setMinute(value) {
        this.value = moment(this.value, this.format).set("m", value).format(this.format);
        if (this.config.mode == "time") {
            this.config.timepicker = "";
        }
        else {
            this.config.view = "datepicker";
        }
    }
    apply() {
        this.onApply(this.value);
        this.closeDatePicker();
    }
    openDatePicker(event) {
        document.body.style.overflow = "hidden";
        var inst = this;
        inst.show = true;
        if (inst._value == "") {
            inst._value = moment().format(inst.format);
        }
        var interval = setInterval(function () {
            var rects = inst.setPosition();
            if (rects.container.height > 0) {
                clearInterval(interval);
            }
        });
        inst.cdRef.detectChanges();
    }
    closeDatePicker() {
        var inst = this;
        inst.show = false;
        document.body.style.overflow = "auto";
    }
    ngAfterViewInit() {
        var inst = this;
        inst.element.nativeElement.onfocus = inst.openDatePicker.bind(this);
        inst.element.nativeElement.onclick = inst.openDatePicker.bind(this);
        inst.setPosition();
        if (typeof window !== "undefined") {
            window.onscroll = function () {
                inst.setPosition();
                inst.cdRef.detectChanges();
            };
            window.onresize = function () {
                inst.setPosition();
                inst.cdRef.detectChanges();
            };
        }
    }
    ngOnInit() {
        var inst = this;
    }
}
DatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatepickerComponent, deps: [{ token: DOCUMENT }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DatepickerComponent, selector: "datepicker", inputs: { element: "element", format: "format" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: "<div class=\"datepicker-overlay\" (click)=\"closeDatePicker()\" *ngIf=\"show\"></div>\r\n<div #container class=\"datepicker-fixed\" [style.top.px]=\"config.position.y\" [style.left.px]=\"config.position.x\" (click)=\"setPosition()\">\r\n    <div class=\"datepicker-container\" *ngIf=\"show\">\r\n        <div class=\"datepicker-header\">\r\n            <div class=\"datepicker-header-label\">\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'date' || config.mode == 'datetime'\">\r\n                    <button (click)=\"config.view='yearpicker'\" class=\"{{config.view == 'yearpicker' ? 'active' : ''}}\" *ngIf=\"config.mode == 'datetime'\">{{getFormated('YYYY')}}</button>\r\n                    <div>\r\n                        <button (click)=\"config.view='monthpicker'\" class=\"{{config.view == 'monthpicker' ? 'active' : ''}}\">{{getFormated('MMM')}}</button>\r\n                        <button (click)=\"config.view='datepicker'\" class=\"{{config.view == 'datepicker' ? 'active' : ''}}\">{{getFormated('DD')}} <span *ngIf=\"config.mode == 'date'\">, </span></button>\r\n                        <button (click)=\"config.view='yearpicker'\" class=\"{{config.view == 'yearpicker' ? 'active' : ''}}\" *ngIf=\"config.mode == 'date'\">{{getFormated('YYYY')}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'month'\">\r\n                    <button class=\"active\">{{getFormated('MMMM')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'year'\">\r\n                    <button class=\"active\">{{getFormated('YYYY')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"config.mode == 'time' || config.mode == 'datetime'\" [style.paddingTop.px]=\"config.mode == 'datetime' ? 29 : 0\">\r\n                    <button (click)=\"config.view='timepicker';config.timepicker='hour'\" class=\"{{config.view == 'timepicker' && config.timepicker == 'hour' ? 'active' : ''}}\">{{getFormated('hh')}}</button>\r\n                    <span>:</span>\r\n                    <button (click)=\"config.view='timepicker';config.timepicker='minute'\" class=\"{{config.view == 'timepicker' && config.timepicker == 'minute'? 'active' : ''}}\">{{getFormated('mm')}}</button>\r\n                    <div>\r\n                        <button class=\"{{isCurrent('am','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('AM')\">AM</button>\r\n                        <button class=\"{{isCurrent('pm','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('PM')\">PM</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(config.mode == 'date' || config.mode == 'datetime') && config.view == 'datepicker'\">\r\n                <button (click)=\"setPrevMonth()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{getFormated('MMMM DD')}}</div>\r\n                <button (click)=\"setNextMonth()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(config.mode == 'date' || config.mode == 'datetime' || config.mode == 'year') && config.view == 'yearpicker'\">\r\n                <button (click)=\"setPrevYearRange()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{config.startYear - 8}} - {{config.startYear + 7}}</div>\r\n                <button (click)=\"setNextYearRange()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-body\">\r\n            <div class=\"datepicker-datepicker\" *ngIf=\"config.view == 'datepicker' && (config.mode == 'date' || config.mode == 'datetime')\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of config.weeks\">\r\n                        <span>{{limitChar(week,3)}}</span>\r\n                    </li>\r\n                </ul>\r\n\r\n                <ul class=\"datepicker-dates\">\r\n                    <li *ngFor=\"let d of getPrefixDays()\">\r\n                        <span></span>\r\n                    </li>\r\n                    <li *ngFor=\"let d of getDatesInMonthArray();trackBy:trackBy\" class=\"{{isCurrent(d.formated,'date') ? 'active' : ''}}\" (click)=\"setDate(d.date)\">\r\n                        <span>{{d.date}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'timepicker'\">\r\n                <span *ngIf=\"config.timepicker == 'hour'\">Select Hour</span>\r\n                <ul class=\"picker-col-3\" *ngIf=\"config.timepicker == 'hour'\">\r\n                    <li *ngFor=\"let n of getArrayOf(12);let h = index\">\r\n                        <button class=\"{{isCurrent(h+1,'hour') ? 'active' : ''}}\" (click)=\"setHour(h+1);config.timepicker = 'minute'\">{{h+1}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"config.timepicker == 'minute'\">Select minute</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"config.timepicker == 'minute'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\">\r\n                        <button class=\"{{isCurrent(m+1,'minute') ? 'active' : ''}}\" (click)=\"setMinute(m+1)\">{{m+1}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'monthpicker' || config.mode == 'month'\">\r\n                <ul class=\"picker-col-2\">\r\n                    <li *ngFor=\"let month of config.months;let m = index\">\r\n                        <button (click)=\"setMonth(m);config.view = 'datepicker'\" class=\"{{isCurrent(m+1 + '','month') ? 'active' : ''}}\">{{month}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'yearpicker'  || config.mode == 'year'\">\r\n                <ul class=\"picker-col-4\">\r\n                    <li *ngFor=\"let year of getYearsRange()\">\r\n                        <button class=\"{{isCurrent(year,'year') ? 'active' : ''}}\" (click)=\"setYear(year);config.view = config.mode == 'year' ? 'yearpicker' : 'datepicker'\">{{year}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-footer\">\r\n            <button (click)=\"closeDatePicker()\">Cancel</button>\r\n            <button (click)=\"apply()\">Apply</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".datepicker-overlay{position:fixed;z-index:9999;background:#0000001f;width:100%;height:100%;left:0px;top:0px}.datepicker-fixed{width:100%;max-width:300px;z-index:999999;position:fixed}.datepicker-container{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action{display:flex;flex-direction:row;align-items:center}.datepicker-header-action>div{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action>button{border:none;background:transparent;height:40px}.datepicker-footer>button{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer>button:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks>li{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates>li{width:14.28%;display:inline-block;align-items:center;justify-content:center;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates>li>span{position:absolute;top:0px;left:0px;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates>li>span:hover{background:#ddd}ul.datepicker-dates>li.active>span{background:#3f51b5;color:#fff}.datepicker-header-label-date,.datepicker-header-label-time{display:flex}.datepicker-header-label-date{flex-direction:column}.datepicker-header-label-time{flex-direction:row}.datepicker-header-label button{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none}.datepicker-header-label button.active{opacity:1}.datepicker-header-label button:hover{opacity:.8}.datepicker-header-label-date>button{width:100%;text-align:left}.datepicker-header-label-date>button{font-size:18px}.datepicker-header-label-date>div{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date>div>button{font-size:35px;line-height:30px}.datepicker-header-label-time>button{font-size:35px;line-height:30px}.datepicker-header-label-time>span{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time>div{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time>div>button{font-size:15px;line-height:15px}.picker>span{font-size:14px;display:block;width:100%;padding:5px}.picker>ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2>li{width:50%}ul.picker-col-3>li{width:33.33%}ul.picker-col-4>li{width:25%}ul.picker-col-6>li{width:16.66%}.picker>ul>li{padding:5px}.picker>ul>li>button{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:#0000000a}.picker>ul>li>button:hover{background:#ddd}.picker>ul>li>button.active{background:#3f51b5;color:#fff}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'datepicker', template: "<div class=\"datepicker-overlay\" (click)=\"closeDatePicker()\" *ngIf=\"show\"></div>\r\n<div #container class=\"datepicker-fixed\" [style.top.px]=\"config.position.y\" [style.left.px]=\"config.position.x\" (click)=\"setPosition()\">\r\n    <div class=\"datepicker-container\" *ngIf=\"show\">\r\n        <div class=\"datepicker-header\">\r\n            <div class=\"datepicker-header-label\">\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'date' || config.mode == 'datetime'\">\r\n                    <button (click)=\"config.view='yearpicker'\" class=\"{{config.view == 'yearpicker' ? 'active' : ''}}\" *ngIf=\"config.mode == 'datetime'\">{{getFormated('YYYY')}}</button>\r\n                    <div>\r\n                        <button (click)=\"config.view='monthpicker'\" class=\"{{config.view == 'monthpicker' ? 'active' : ''}}\">{{getFormated('MMM')}}</button>\r\n                        <button (click)=\"config.view='datepicker'\" class=\"{{config.view == 'datepicker' ? 'active' : ''}}\">{{getFormated('DD')}} <span *ngIf=\"config.mode == 'date'\">, </span></button>\r\n                        <button (click)=\"config.view='yearpicker'\" class=\"{{config.view == 'yearpicker' ? 'active' : ''}}\" *ngIf=\"config.mode == 'date'\">{{getFormated('YYYY')}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'month'\">\r\n                    <button class=\"active\">{{getFormated('MMMM')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"config.mode == 'year'\">\r\n                    <button class=\"active\">{{getFormated('YYYY')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"config.mode == 'time' || config.mode == 'datetime'\" [style.paddingTop.px]=\"config.mode == 'datetime' ? 29 : 0\">\r\n                    <button (click)=\"config.view='timepicker';config.timepicker='hour'\" class=\"{{config.view == 'timepicker' && config.timepicker == 'hour' ? 'active' : ''}}\">{{getFormated('hh')}}</button>\r\n                    <span>:</span>\r\n                    <button (click)=\"config.view='timepicker';config.timepicker='minute'\" class=\"{{config.view == 'timepicker' && config.timepicker == 'minute'? 'active' : ''}}\">{{getFormated('mm')}}</button>\r\n                    <div>\r\n                        <button class=\"{{isCurrent('am','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('AM')\">AM</button>\r\n                        <button class=\"{{isCurrent('pm','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('PM')\">PM</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(config.mode == 'date' || config.mode == 'datetime') && config.view == 'datepicker'\">\r\n                <button (click)=\"setPrevMonth()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{getFormated('MMMM DD')}}</div>\r\n                <button (click)=\"setNextMonth()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(config.mode == 'date' || config.mode == 'datetime' || config.mode == 'year') && config.view == 'yearpicker'\">\r\n                <button (click)=\"setPrevYearRange()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{config.startYear - 8}} - {{config.startYear + 7}}</div>\r\n                <button (click)=\"setNextYearRange()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-body\">\r\n            <div class=\"datepicker-datepicker\" *ngIf=\"config.view == 'datepicker' && (config.mode == 'date' || config.mode == 'datetime')\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of config.weeks\">\r\n                        <span>{{limitChar(week,3)}}</span>\r\n                    </li>\r\n                </ul>\r\n\r\n                <ul class=\"datepicker-dates\">\r\n                    <li *ngFor=\"let d of getPrefixDays()\">\r\n                        <span></span>\r\n                    </li>\r\n                    <li *ngFor=\"let d of getDatesInMonthArray();trackBy:trackBy\" class=\"{{isCurrent(d.formated,'date') ? 'active' : ''}}\" (click)=\"setDate(d.date)\">\r\n                        <span>{{d.date}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'timepicker'\">\r\n                <span *ngIf=\"config.timepicker == 'hour'\">Select Hour</span>\r\n                <ul class=\"picker-col-3\" *ngIf=\"config.timepicker == 'hour'\">\r\n                    <li *ngFor=\"let n of getArrayOf(12);let h = index\">\r\n                        <button class=\"{{isCurrent(h+1,'hour') ? 'active' : ''}}\" (click)=\"setHour(h+1);config.timepicker = 'minute'\">{{h+1}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"config.timepicker == 'minute'\">Select minute</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"config.timepicker == 'minute'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\">\r\n                        <button class=\"{{isCurrent(m+1,'minute') ? 'active' : ''}}\" (click)=\"setMinute(m+1)\">{{m+1}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'monthpicker' || config.mode == 'month'\">\r\n                <ul class=\"picker-col-2\">\r\n                    <li *ngFor=\"let month of config.months;let m = index\">\r\n                        <button (click)=\"setMonth(m);config.view = 'datepicker'\" class=\"{{isCurrent(m+1 + '','month') ? 'active' : ''}}\">{{month}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"config.view == 'yearpicker'  || config.mode == 'year'\">\r\n                <ul class=\"picker-col-4\">\r\n                    <li *ngFor=\"let year of getYearsRange()\">\r\n                        <button class=\"{{isCurrent(year,'year') ? 'active' : ''}}\" (click)=\"setYear(year);config.view = config.mode == 'year' ? 'yearpicker' : 'datepicker'\">{{year}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-footer\">\r\n            <button (click)=\"closeDatePicker()\">Cancel</button>\r\n            <button (click)=\"apply()\">Apply</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".datepicker-overlay{position:fixed;z-index:9999;background:#0000001f;width:100%;height:100%;left:0px;top:0px}.datepicker-fixed{width:100%;max-width:300px;z-index:999999;position:fixed}.datepicker-container{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action{display:flex;flex-direction:row;align-items:center}.datepicker-header-action>div{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action>button{border:none;background:transparent;height:40px}.datepicker-footer>button{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer>button:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks>li{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates>li{width:14.28%;display:inline-block;align-items:center;justify-content:center;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates>li>span{position:absolute;top:0px;left:0px;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates>li>span:hover{background:#ddd}ul.datepicker-dates>li.active>span{background:#3f51b5;color:#fff}.datepicker-header-label-date,.datepicker-header-label-time{display:flex}.datepicker-header-label-date{flex-direction:column}.datepicker-header-label-time{flex-direction:row}.datepicker-header-label button{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none}.datepicker-header-label button.active{opacity:1}.datepicker-header-label button:hover{opacity:.8}.datepicker-header-label-date>button{width:100%;text-align:left}.datepicker-header-label-date>button{font-size:18px}.datepicker-header-label-date>div{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date>div>button{font-size:35px;line-height:30px}.datepicker-header-label-time>button{font-size:35px;line-height:30px}.datepicker-header-label-time>span{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time>div{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time>div>button{font-size:15px;line-height:15px}.picker>span{font-size:14px;display:block;width:100%;padding:5px}.picker>ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2>li{width:50%}ul.picker-col-3>li{width:33.33%}ul.picker-col-4>li{width:25%}ul.picker-col-6>li{width:16.66%}.picker>ul>li{padding:5px}.picker>ul>li>button{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:#0000000a}.picker>ul>li>button:hover{background:#ddd}.picker>ul>li>button.active{background:#3f51b5;color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ["container"]
            }], element: [{
                type: Input,
                args: ["element"]
            }], format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxDatepickerDirective {
    constructor(cRef, eRef, Service) {
        this.cRef = cRef;
        this.eRef = eRef;
        this.Service = Service;
        this.initiated = false;
        this._value = "";
        this.format = "YYYY-MM-DD";
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
        inst.component.instance.config.mode = "date";
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
NgxDatepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxDatepickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgxDatepickerDirective, selector: "[datepicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDatepickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[datepicker]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxDatepickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxDatetimepickerDirective {
    constructor(cRef, eRef, Service) {
        this.cRef = cRef;
        this.eRef = eRef;
        this.Service = Service;
        this.initiated = false;
        this._value = "";
        this.format = "YYYY-MM-DD HH:mm:ss";
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
        inst.component.instance.config.mode = "datetime";
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
NgxDatetimepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatetimepickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxDatetimepickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgxDatetimepickerDirective, selector: "[datetimepicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDatetimepickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatetimepickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[datetimepicker]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxDatetimepickerDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxTimepickerDirective {
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
NgxTimepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxTimepickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
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
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxMonthpickerDirective {
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
NgxMonthpickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxMonthpickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
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
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxYearpickerDirective {
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
NgxYearpickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxYearpickerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: NgxDatepickerService }], target: i0.ɵɵFactoryTarget.Directive });
NgxYearpickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgxYearpickerDirective, selector: "[yearpicker]", inputs: { format: "format" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxYearpickerDirective),
            multi: true
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxYearpickerDirective, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: NgxDatepickerService }]; }, propDecorators: { format: [{
                type: Input,
                args: ["format"]
            }] } });

class NgxDatepickerModule {
}
NgxDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, declarations: [DatepickerComponent,
        NgxDatepickerDirective,
        NgxDatetimepickerDirective,
        NgxTimepickerDirective,
        NgxMonthpickerDirective,
        NgxYearpickerDirective], imports: [CommonModule], exports: [DatepickerComponent,
        NgxDatepickerDirective,
        NgxTimepickerDirective,
        NgxDatetimepickerDirective,
        NgxMonthpickerDirective,
        NgxYearpickerDirective] });
NgxDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DatepickerComponent,
                        NgxDatepickerDirective,
                        NgxDatetimepickerDirective,
                        NgxTimepickerDirective,
                        NgxMonthpickerDirective,
                        NgxYearpickerDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        DatepickerComponent,
                        NgxDatepickerDirective,
                        NgxTimepickerDirective,
                        NgxDatetimepickerDirective,
                        NgxMonthpickerDirective,
                        NgxYearpickerDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-datepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DatepickerComponent, NgxDatepickerDirective, NgxDatepickerModule, NgxDatepickerService, NgxDatetimepickerDirective, NgxMonthpickerDirective, NgxTimepickerDirective, NgxYearpickerDirective };
//# sourceMappingURL=handylib-ngx-datepicker.mjs.map
