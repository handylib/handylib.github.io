import * as i0 from '@angular/core';
import { Component, ViewChild, Input, forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

class DittoComponent {
    cdRef;
    constructor(cdRef) {
        this.cdRef = cdRef;
    }
    showErrors = false;
    show = false;
    container;
    element;
    format = "YYYY-MM-DD HH:mm:ss";
    picker = 'date';
    view = 'date';
    hours = true;
    minutes = true;
    seconds = true;
    disableBackDateTime = false;
    disableFutureDateTime = false;
    backDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    futureDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    duration = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    config = {
        timepicker: '', //hour , minute
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
    _value = "";
    get value() {
        return this._value;
    }
    set value(value) {
        if (value !== "" && value !== null && typeof value !== "undefined" && this.format !== "") {
            if (moment(value, this.format).isValid()) {
                this._value = value;
            }
            else {
                console.log("Invalid date");
            }
        }
    }
    onApply = (_v) => { };
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
            var date = {
                date: Number(m.format('D')),
                formated: m.format("YYYY-MM-DD"),
                disabled: false
            };
            if (this.disableBackDateTime == true) {
                if (moment(date.formated, 'YYYY-MM-DD').isBefore(moment(this.backDateTime, this.format))) {
                    date.disabled = true;
                }
            }
            if (this.disableFutureDateTime == true) {
                if (moment(date.formated, 'YYYY-MM-DD').isAfter(moment(this.futureDateTime, this.format))) {
                    date.disabled = true;
                }
            }
            dates.push(date);
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
        this.config.startYear = this.config.startYear - 15;
    }
    setNextMonth() {
        this.value = moment(this.value, this.format).add(1, "M").format(this.format);
    }
    setPrevMonth() {
        this.value = moment(this.value, this.format).add(-1, "M").format(this.format);
    }
    getYearsRange() {
        var years = [];
        var startYear = this.config.startYear - 7;
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
            inst.config.position.x = (window.innerWidth - containerRect.width) / 2;
            inst.config.position.y = (window.innerHeight - containerRect.height) / 2;
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
        var date = moment(this.value, this.format).format("YYYY-MM-DD LT");
        date = date.replace("AM", value).replace("PM", value);
        this.value = moment(date, "YYYY-MM-DD LT").format(this.format);
    }
    setDate(d) {
        if (!d.disabled) {
            this.value = moment(this.value, this.format).set("D", d.date).format(this.format);
            if (this.picker == 'datetime') {
                this.view = 'hour';
            }
            else {
                this.view = 'date';
            }
        }
    }
    setMonth(m) {
        if (!this.isMonthDisabled(m)) {
            this.value = moment(this.value, this.format).set("M", m).format(this.format);
            if (this.picker == 'datetime' || this.picker == 'date') {
                this.view = 'date';
            }
            else {
                this.view = 'month';
            }
        }
    }
    setYear(y) {
        if (!this.isYearDisabled(y)) {
            this.value = moment(this.value, this.format).set("year", y).format(this.format);
            if (this.picker == 'datetime' || this.picker == 'date') {
                this.view = 'month';
            }
            else {
                this.view = 'year';
            }
        }
    }
    setHour(h) {
        this.value = moment(this.value, this.format).set("h", h).format(this.format);
        if (this.picker == 'datetime' || this.picker == 'time') {
            this.view = 'minute';
        }
    }
    setMinute(value) {
        this.value = moment(this.value, this.format).set("m", value).format(this.format);
        if (this.picker == "time") {
            this.config.timepicker = "";
        }
        else {
            this.view = "date";
        }
    }
    setDurationHours(value) {
        this.duration.hours = value;
        if (this.minutes) {
            this.view = 'minutes';
        }
        else if (this.seconds) {
            this.view = 'seconds';
        }
    }
    setDurationMinutes(value) {
        this.duration.minutes = value;
        if (this.seconds) {
            this.view = 'seconds';
        }
    }
    setDurationSeconds(value) {
        this.duration.seconds = value;
    }
    apply() {
        if (this.picker == 'duration') {
            var durations = [];
            if (this.hours) {
                durations.push(this.padint(this.duration.hours));
            }
            if (this.minutes) {
                durations.push(this.padint(this.duration.minutes));
            }
            if (this.seconds) {
                durations.push(this.padint(this.duration.seconds));
            }
            this.onApply(durations.join(':'));
        }
        else {
            var m = moment(this.value, this.format);
            if (this.isMomentDisabled(m)) {
                this.showErrors = true;
                setTimeout(() => { this.showErrors = false; }, 1500);
                return;
            }
            this.onApply(this.value);
        }
        this.closeDatePicker();
    }
    padint(n, w = 2) {
        let numberString = n.toString();
        let padding = Math.max(0, w - numberString.length);
        let paddedNumber = '0'.repeat(padding) + numberString;
        return paddedNumber;
    }
    getDisableMaskLabel() {
        var mid = '';
        if (this.picker == 'datetime') {
            mid = 'date and time';
        }
        else if (this.picker == 'date') {
            mid = 'date';
        }
        else if (this.picker == 'time') {
            mid = 'time';
        }
        else if (this.picker == 'month') {
            mid = 'month';
        }
        else if (this.picker == 'year') {
            mid = 'year';
        }
        if (this.disableBackDateTime && this.disableFutureDateTime) {
            return {
                label: "Please select " + mid + " between ",
                range: `${moment(this.backDateTime, this.format).format(this.format)} - ${moment(this.futureDateTime, this.format).format(this.format)}`
            };
        }
        if (this.disableBackDateTime) {
            return {
                label: "Please select a " + mid + " after ",
                range: `${moment(this.backDateTime, this.format).format(this.format)}`
            };
        }
        if (this.disableFutureDateTime) {
            return {
                label: "Please select a " + mid + " before ",
                range: `${moment(this.futureDateTime, this.format).format(this.format)}`
            };
        }
        return {
            label: "",
            range: ""
        };
    }
    isMonthDisabled(m) {
        var date = moment(this.value, this.format).set("M", m);
        return this.isMomentDisabled(date);
    }
    allYearRangeDisabled() {
        if (!this.disableBackDateTime && !this.disableFutureDateTime) {
            return false;
        }
        for (var year of this.getYearsRange()) {
            if (!this.isYearDisabled(year)) {
                return false;
            }
        }
        return true;
    }
    allMonthsDisabled() {
        if (!this.disableBackDateTime && !this.disableFutureDateTime) {
            return false;
        }
        var m = 0;
        for (var month of this.config.months) {
            if (!this.isMonthDisabled(m)) {
                return false;
            }
            m++;
        }
        return true;
    }
    isYearDisabled(y) {
        var date = moment(this.value, this.format).set("year", y);
        return this.isMomentDisabled(date, 'year');
    }
    isMomentDisabled(m, mode = 'none') {
        if (this.disableBackDateTime) {
            if (mode == 'year') {
                if (Number(m.format('YYYY')) < Number(moment(this.backDateTime, this.format).format('YYYY'))) {
                    return true;
                }
            }
            else if (m.isBefore(moment(this.backDateTime, this.format))) {
                return true;
            }
        }
        if (this.disableFutureDateTime) {
            if (mode == 'year') {
                if (Number(m.format('YYYY')) > Number(moment(this.futureDateTime, this.format).format('YYYY'))) {
                    return true;
                }
            }
            else if (m.isAfter(moment(this.futureDateTime, this.format))) {
                return true;
            }
        }
        return false;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.1", type: DittoComponent, selector: "ditto", inputs: { element: "element", format: "format", picker: "picker", view: "view", hours: "hours", minutes: "minutes", seconds: "seconds", disableBackDateTime: "disableBackDateTime", disableFutureDateTime: "disableFutureDateTime", backDateTime: "backDateTime", futureDateTime: "futureDateTime" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: "<div class=\"datepicker-overlay\" (click)=\"closeDatePicker()\" *ngIf=\"show\"></div>\r\n<div #container class=\"datepicker-fixed\" [style.top.px]=\"config.position.y\" [style.left.px]=\"config.position.x\" (click)=\"setPosition()\">\r\n    <div class=\"datepicker-container\" *ngIf=\"show\">\r\n\r\n        <div class=\"disabled-mask {{showErrors ? 'show' : ''}}\">\r\n            <button (click)=\"showErrors = false\">&times;</button>\r\n            <small>{{getDisableMaskLabel().label}}</small>\r\n            <span>{{getDisableMaskLabel().range}}</span>\r\n        </div>\r\n\r\n        <div class=\"datepicker-header\">\r\n            <div class=\"datepicker-header-label\">\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'date' || picker == 'datetime'\">\r\n                    <button (click)=\"view='year'\" class=\"{{view == 'year' ? 'active' : ''}}\" *ngIf=\"picker == 'datetime'\">{{getFormated('YYYY')}}</button>\r\n                    <div>\r\n                        <button (click)=\"view='month'\" class=\"{{view == 'month' ? 'active' : ''}}\">{{getFormated('MMM')}}</button>\r\n                        <button (click)=\"view='date'\" class=\"{{view == 'date' ? 'active' : ''}}\">{{getFormated('DD')}} <span *ngIf=\"picker == 'date'\">, </span></button>\r\n                        <button (click)=\"view='year'\" class=\"{{view == 'year' ? 'active' : ''}}\" *ngIf=\"picker == 'date'\">{{getFormated('YYYY')}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'month'\">\r\n                    <button class=\"active\">{{getFormated('MMMM')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'year'\">\r\n                    <button class=\"active\">{{getFormated('YYYY')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"picker == 'time' || picker == 'datetime'\" [style.paddingTop.px]=\"picker == 'datetime' ? 29 : 0\">\r\n                    <button (click)=\"view = 'time';view='hour'\" class=\"{{view == 'hour' ? 'active' : ''}}\">{{getFormated('hh')}}</button>\r\n                    <span>:</span>\r\n                    <button (click)=\"view = 'time';view='minute'\" class=\"{{view == 'minute'? 'active' : ''}}\">{{getFormated('mm')}}</button>\r\n                    <div>\r\n                        <button class=\"{{isCurrent('am','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('AM')\">AM</button>\r\n                        <button class=\"{{isCurrent('pm','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('PM')\">PM</button>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"picker == 'duration'\" [style.paddingTop.px]=\"29\">\r\n                    <button *ngIf=\"hours\" (click)=\"view = 'duration';view='hours'\" class=\"{{view == 'hours' ? 'active' : ''}}\">\r\n                        <span>H</span>\r\n                        {{duration.hours}}\r\n                    </button>\r\n                    <span *ngIf=\"hours && minutes\">:</span>\r\n                    <button *ngIf=\"minutes\" (click)=\"view = 'duration';view='minutes'\" class=\"{{view == 'minutes'? 'active' : ''}}\">\r\n                        <span>M</span>\r\n                        {{duration.minutes}}</button>\r\n                    <span *ngIf=\"minutes && seconds\">:</span>\r\n                    <button *ngIf=\"seconds\" (click)=\"view = 'duration';view='seconds'\" class=\"{{view == 'seconds'? 'active' : ''}}\">\r\n                        <span>S</span>\r\n                        {{duration.seconds}}\r\n                    </button>\r\n                </div>\r\n              \r\n            </div>\r\n           \r\n            <div class=\"datepicker-header-action\" *ngIf=\"(picker == 'date' || picker == 'datetime') && view == 'date'\">\r\n                <button (click)=\"setPrevMonth()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{getFormated('MMMM DD')}}</div>\r\n                <button (click)=\"setNextMonth()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(picker == 'date' || picker == 'datetime' || picker == 'year') && view == 'year'\">\r\n                <button (click)=\"setPrevYearRange()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{config.startYear - 8}} - {{config.startYear + 7}}</div>\r\n                <button (click)=\"setNextYearRange()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-body\">\r\n            <div class=\"datepicker-datepicker\" *ngIf=\"view == 'date' && (picker == 'date' || picker == 'datetime')\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of config.weeks\">\r\n                        <span>{{limitChar(week,3)}}</span>\r\n                    </li>\r\n                </ul>\r\n                \r\n                <ul class=\"datepicker-dates\">\r\n                    <li *ngFor=\"let d of getPrefixDays()\">\r\n                        <span></span>\r\n                    </li>\r\n                    <li *ngFor=\"let d of getDatesInMonthArray();trackBy:trackBy\" class=\"{{isCurrent(d.formated,'date') ? 'active' : ''}} {{d.disabled ? 'disabled' : ''}}\" (click)=\"setDate(d);\">\r\n                        <span>{{d.date}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"picker == 'time' || picker == 'datetime'\">\r\n                <span *ngIf=\"view == 'hour'\">Select Hour</span>\r\n                <ul class=\"picker-col-3\" *ngIf=\"view == 'hour'\">\r\n                    <li *ngFor=\"let n of getArrayOf(12);let h = index\">\r\n                        <button class=\"{{isCurrent(h+1,'hour') ? 'active' : ''}}\" (click)=\"setHour(h+1);\">{{h+1}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'minute'\">Select minute</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'minute'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\" class=\"{{isMonthDisabled(m) ? 'disabled' : ''}}\">\r\n                        <button class=\"{{isCurrent(m,'minute') ? 'active' : ''}}\" (click)=\"setMinute(m)\">{{m}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"picker\" *ngIf=\"picker == 'duration'\">\r\n                <span *ngIf=\"view == 'hours'\">Select Hours</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'hours'\">\r\n                    <li *ngFor=\"let n of getArrayOf(25);let h = index\">\r\n                        <button class=\"{{h == duration.hours ? 'active' : ''}}\" (click)=\"setDurationHours(h)\">{{h}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'minutes'\">Select Minutes</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'minutes'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\">\r\n                        <button class=\"{{m == duration.minutes ? 'active' : ''}}\" (click)=\"setDurationMinutes(m)\">{{m}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'seconds'\">Select Seconds</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'seconds'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let s = index\">\r\n                        <button class=\"{{s == duration.seconds ? 'active' : ''}}\" (click)=\"setDurationSeconds(s)\">{{s}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"picker\" *ngIf=\"view == 'month' || picker == 'month'\">\r\n                <div class=\"disabled-mask\" *ngIf=\"allMonthsDisabled()\">\r\n                    <small>{{getDisableMaskLabel().label}}</small>\r\n                    <span>{{getDisableMaskLabel().range}}</span>\r\n                </div>\r\n                <ul class=\"picker-col-2\">\r\n                    <li *ngFor=\"let month of config.months;let m = index\" class=\"{{isMonthDisabled(m) ? 'disabled' : ''}}\">\r\n                        <button (click)=\"setMonth(m);\" class=\"{{isCurrent(m+1 + '','month') ? 'active' : ''}}\">{{month}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"view == 'year'  || picker == 'year'\">\r\n                <div class=\"disabled-mask\" *ngIf=\"allYearRangeDisabled()\">\r\n                    <small>{{getDisableMaskLabel().label}}</small>\r\n                    <span>{{getDisableMaskLabel().range}}</span>\r\n                </div>\r\n                <ul class=\"picker-col-4\">\r\n                    <li *ngFor=\"let year of getYearsRange()\" class=\"{{isYearDisabled(year) ? 'disabled' : ''}}\">\r\n                        <button class=\"{{isCurrent(year,'year') ? 'active' : ''}}\" (click)=\"setYear(year);\">{{year}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-footer\">\r\n            <button (click)=\"closeDatePicker()\">Cancel</button>\r\n            <button (click)=\"apply()\">Apply</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".datepicker-overlay{position:fixed;z-index:9999;background:#0000001f;width:100%;height:100%;left:0;top:0}.datepicker-fixed{width:100%;max-width:300px;z-index:999999;position:fixed;-webkit-user-select:none;user-select:none}.datepicker-container{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action{display:flex;flex-direction:row;align-items:center}.datepicker-header-action>div{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action>button{border:none;background:transparent;height:40px}.datepicker-footer>button{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer>button:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks>li{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates>li{width:14.28%;display:block;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates>li.disabled,.picker .disabled,.picker .disabled button:hover{cursor:not-allowed;background:#b4b4b4}ul.datepicker-dates>li>span{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates>li>span:hover{background:#ddd}ul.datepicker-dates>li.active>span{background:#3f51b5;color:#fff}.datepicker-header-label-date,.datepicker-header-label-time{display:flex}.datepicker-header-label-date{flex-direction:column}.datepicker-header-label-time{flex-direction:row}.datepicker-header-label button{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none;position:relative}.datepicker-header-label button>span{position:absolute;top:-25px;font-size:12px;left:0;width:100%;text-align:center}.datepicker-header-label button.active{opacity:1;color:#ffeb3b}.datepicker-header-label button:hover{opacity:.8}.datepicker-header-label-date>button{width:100%;text-align:left}.datepicker-header-label-date>button{font-size:18px}.datepicker-header-label-date>div{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date>div>button{font-size:35px;line-height:30px}.datepicker-header-label-time>button{font-size:35px;line-height:30px}.datepicker-header-label-time>span{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time>div{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time>div>button{font-size:15px;line-height:15px}.picker>span{font-size:14px;display:block;width:100%;padding:5px}.picker>ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2>li{width:50%}ul.picker-col-3>li{width:33.33%}ul.picker-col-4>li{width:25%}ul.picker-col-6>li{width:16.66%}.picker>ul>li{padding:5px}.picker>ul>li>button{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:#0000000a}.picker>ul>li>button:hover{background:#ddd}.picker>ul>li>button.active{background:#3f51b5;color:#fff}.picker{position:relative}.disabled-mask{position:absolute;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;color:#fff;background:#00000091;z-index:1;visibility:hidden;opacity:0;transition:.1s all ease}.disabled-mask>button{position:absolute;top:5px;right:5px;border:none;width:30px;height:30px;color:#fff;font-size:20px;padding:0;background:transparent;outline:none}.disabled-mask>small{font-size:11px}.disabled-mask>span{font-weight:700;font-size:14px}.disabled-mask.show{visibility:visible;opacity:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.1", ngImport: i0, type: DittoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ditto', template: "<div class=\"datepicker-overlay\" (click)=\"closeDatePicker()\" *ngIf=\"show\"></div>\r\n<div #container class=\"datepicker-fixed\" [style.top.px]=\"config.position.y\" [style.left.px]=\"config.position.x\" (click)=\"setPosition()\">\r\n    <div class=\"datepicker-container\" *ngIf=\"show\">\r\n\r\n        <div class=\"disabled-mask {{showErrors ? 'show' : ''}}\">\r\n            <button (click)=\"showErrors = false\">&times;</button>\r\n            <small>{{getDisableMaskLabel().label}}</small>\r\n            <span>{{getDisableMaskLabel().range}}</span>\r\n        </div>\r\n\r\n        <div class=\"datepicker-header\">\r\n            <div class=\"datepicker-header-label\">\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'date' || picker == 'datetime'\">\r\n                    <button (click)=\"view='year'\" class=\"{{view == 'year' ? 'active' : ''}}\" *ngIf=\"picker == 'datetime'\">{{getFormated('YYYY')}}</button>\r\n                    <div>\r\n                        <button (click)=\"view='month'\" class=\"{{view == 'month' ? 'active' : ''}}\">{{getFormated('MMM')}}</button>\r\n                        <button (click)=\"view='date'\" class=\"{{view == 'date' ? 'active' : ''}}\">{{getFormated('DD')}} <span *ngIf=\"picker == 'date'\">, </span></button>\r\n                        <button (click)=\"view='year'\" class=\"{{view == 'year' ? 'active' : ''}}\" *ngIf=\"picker == 'date'\">{{getFormated('YYYY')}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'month'\">\r\n                    <button class=\"active\">{{getFormated('MMMM')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-date\" *ngIf=\"picker == 'year'\">\r\n                    <button class=\"active\">{{getFormated('YYYY')}}</button>\r\n                </div>\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"picker == 'time' || picker == 'datetime'\" [style.paddingTop.px]=\"picker == 'datetime' ? 29 : 0\">\r\n                    <button (click)=\"view = 'time';view='hour'\" class=\"{{view == 'hour' ? 'active' : ''}}\">{{getFormated('hh')}}</button>\r\n                    <span>:</span>\r\n                    <button (click)=\"view = 'time';view='minute'\" class=\"{{view == 'minute'? 'active' : ''}}\">{{getFormated('mm')}}</button>\r\n                    <div>\r\n                        <button class=\"{{isCurrent('am','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('AM')\">AM</button>\r\n                        <button class=\"{{isCurrent('pm','ampm') ? 'active' : ''}}\" (click)=\"setAmPm('PM')\">PM</button>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"datepicker-header-label-time\" *ngIf=\"picker == 'duration'\" [style.paddingTop.px]=\"29\">\r\n                    <button *ngIf=\"hours\" (click)=\"view = 'duration';view='hours'\" class=\"{{view == 'hours' ? 'active' : ''}}\">\r\n                        <span>H</span>\r\n                        {{duration.hours}}\r\n                    </button>\r\n                    <span *ngIf=\"hours && minutes\">:</span>\r\n                    <button *ngIf=\"minutes\" (click)=\"view = 'duration';view='minutes'\" class=\"{{view == 'minutes'? 'active' : ''}}\">\r\n                        <span>M</span>\r\n                        {{duration.minutes}}</button>\r\n                    <span *ngIf=\"minutes && seconds\">:</span>\r\n                    <button *ngIf=\"seconds\" (click)=\"view = 'duration';view='seconds'\" class=\"{{view == 'seconds'? 'active' : ''}}\">\r\n                        <span>S</span>\r\n                        {{duration.seconds}}\r\n                    </button>\r\n                </div>\r\n              \r\n            </div>\r\n           \r\n            <div class=\"datepicker-header-action\" *ngIf=\"(picker == 'date' || picker == 'datetime') && view == 'date'\">\r\n                <button (click)=\"setPrevMonth()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{getFormated('MMMM DD')}}</div>\r\n                <button (click)=\"setNextMonth()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n            <div class=\"datepicker-header-action\" *ngIf=\"(picker == 'date' || picker == 'datetime' || picker == 'year') && view == 'year'\">\r\n                <button (click)=\"setPrevYearRange()\"><i class=\"fa fa-arrow-left\"></i></button>\r\n                <div>{{config.startYear - 8}} - {{config.startYear + 7}}</div>\r\n                <button (click)=\"setNextYearRange()\"><i class=\"fa fa-arrow-right\"></i></button>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-body\">\r\n            <div class=\"datepicker-datepicker\" *ngIf=\"view == 'date' && (picker == 'date' || picker == 'datetime')\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of config.weeks\">\r\n                        <span>{{limitChar(week,3)}}</span>\r\n                    </li>\r\n                </ul>\r\n                \r\n                <ul class=\"datepicker-dates\">\r\n                    <li *ngFor=\"let d of getPrefixDays()\">\r\n                        <span></span>\r\n                    </li>\r\n                    <li *ngFor=\"let d of getDatesInMonthArray();trackBy:trackBy\" class=\"{{isCurrent(d.formated,'date') ? 'active' : ''}} {{d.disabled ? 'disabled' : ''}}\" (click)=\"setDate(d);\">\r\n                        <span>{{d.date}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"picker == 'time' || picker == 'datetime'\">\r\n                <span *ngIf=\"view == 'hour'\">Select Hour</span>\r\n                <ul class=\"picker-col-3\" *ngIf=\"view == 'hour'\">\r\n                    <li *ngFor=\"let n of getArrayOf(12);let h = index\">\r\n                        <button class=\"{{isCurrent(h+1,'hour') ? 'active' : ''}}\" (click)=\"setHour(h+1);\">{{h+1}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'minute'\">Select minute</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'minute'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\" class=\"{{isMonthDisabled(m) ? 'disabled' : ''}}\">\r\n                        <button class=\"{{isCurrent(m,'minute') ? 'active' : ''}}\" (click)=\"setMinute(m)\">{{m}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"picker\" *ngIf=\"picker == 'duration'\">\r\n                <span *ngIf=\"view == 'hours'\">Select Hours</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'hours'\">\r\n                    <li *ngFor=\"let n of getArrayOf(25);let h = index\">\r\n                        <button class=\"{{h == duration.hours ? 'active' : ''}}\" (click)=\"setDurationHours(h)\">{{h}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'minutes'\">Select Minutes</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'minutes'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let m = index\">\r\n                        <button class=\"{{m == duration.minutes ? 'active' : ''}}\" (click)=\"setDurationMinutes(m)\">{{m}}</button>\r\n                    </li>\r\n                </ul>\r\n                <span *ngIf=\"view == 'seconds'\">Select Seconds</span>\r\n                <ul class=\"picker-col-6\" *ngIf=\"view == 'seconds'\">\r\n                    <li *ngFor=\"let n of getArrayOf(60);let s = index\">\r\n                        <button class=\"{{s == duration.seconds ? 'active' : ''}}\" (click)=\"setDurationSeconds(s)\">{{s}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"picker\" *ngIf=\"view == 'month' || picker == 'month'\">\r\n                <div class=\"disabled-mask\" *ngIf=\"allMonthsDisabled()\">\r\n                    <small>{{getDisableMaskLabel().label}}</small>\r\n                    <span>{{getDisableMaskLabel().range}}</span>\r\n                </div>\r\n                <ul class=\"picker-col-2\">\r\n                    <li *ngFor=\"let month of config.months;let m = index\" class=\"{{isMonthDisabled(m) ? 'disabled' : ''}}\">\r\n                        <button (click)=\"setMonth(m);\" class=\"{{isCurrent(m+1 + '','month') ? 'active' : ''}}\">{{month}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"picker\" *ngIf=\"view == 'year'  || picker == 'year'\">\r\n                <div class=\"disabled-mask\" *ngIf=\"allYearRangeDisabled()\">\r\n                    <small>{{getDisableMaskLabel().label}}</small>\r\n                    <span>{{getDisableMaskLabel().range}}</span>\r\n                </div>\r\n                <ul class=\"picker-col-4\">\r\n                    <li *ngFor=\"let year of getYearsRange()\" class=\"{{isYearDisabled(year) ? 'disabled' : ''}}\">\r\n                        <button class=\"{{isCurrent(year,'year') ? 'active' : ''}}\" (click)=\"setYear(year);\">{{year}}</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"datepicker-footer\">\r\n            <button (click)=\"closeDatePicker()\">Cancel</button>\r\n            <button (click)=\"apply()\">Apply</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".datepicker-overlay{position:fixed;z-index:9999;background:#0000001f;width:100%;height:100%;left:0;top:0}.datepicker-fixed{width:100%;max-width:300px;z-index:999999;position:fixed;-webkit-user-select:none;user-select:none}.datepicker-container{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action{display:flex;flex-direction:row;align-items:center}.datepicker-header-action>div{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action>button{border:none;background:transparent;height:40px}.datepicker-footer>button{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer>button:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks>li{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates>li{width:14.28%;display:block;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates>li.disabled,.picker .disabled,.picker .disabled button:hover{cursor:not-allowed;background:#b4b4b4}ul.datepicker-dates>li>span{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates>li>span:hover{background:#ddd}ul.datepicker-dates>li.active>span{background:#3f51b5;color:#fff}.datepicker-header-label-date,.datepicker-header-label-time{display:flex}.datepicker-header-label-date{flex-direction:column}.datepicker-header-label-time{flex-direction:row}.datepicker-header-label button{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none;position:relative}.datepicker-header-label button>span{position:absolute;top:-25px;font-size:12px;left:0;width:100%;text-align:center}.datepicker-header-label button.active{opacity:1;color:#ffeb3b}.datepicker-header-label button:hover{opacity:.8}.datepicker-header-label-date>button{width:100%;text-align:left}.datepicker-header-label-date>button{font-size:18px}.datepicker-header-label-date>div{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date>div>button{font-size:35px;line-height:30px}.datepicker-header-label-time>button{font-size:35px;line-height:30px}.datepicker-header-label-time>span{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time>div{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time>div>button{font-size:15px;line-height:15px}.picker>span{font-size:14px;display:block;width:100%;padding:5px}.picker>ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2>li{width:50%}ul.picker-col-3>li{width:33.33%}ul.picker-col-4>li{width:25%}ul.picker-col-6>li{width:16.66%}.picker>ul>li{padding:5px}.picker>ul>li>button{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:#0000000a}.picker>ul>li>button:hover{background:#ddd}.picker>ul>li>button.active{background:#3f51b5;color:#fff}.picker{position:relative}.disabled-mask{position:absolute;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;color:#fff;background:#00000091;z-index:1;visibility:hidden;opacity:0;transition:.1s all ease}.disabled-mask>button{position:absolute;top:5px;right:5px;border:none;width:30px;height:30px;color:#fff;font-size:20px;padding:0;background:transparent;outline:none}.disabled-mask>small{font-size:11px}.disabled-mask>span{font-weight:700;font-size:14px}.disabled-mask.show{visibility:visible;opacity:1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { container: [{
                type: ViewChild,
                args: ["container"]
            }], element: [{
                type: Input,
                args: ["element"]
            }], format: [{
                type: Input,
                args: ["format"]
            }], picker: [{
                type: Input,
                args: ['picker']
            }], view: [{
                type: Input,
                args: ['view']
            }], hours: [{
                type: Input,
                args: ['hours']
            }], minutes: [{
                type: Input,
                args: ['minutes']
            }], seconds: [{
                type: Input,
                args: ['seconds']
            }], disableBackDateTime: [{
                type: Input,
                args: ['disableBackDateTime']
            }], disableFutureDateTime: [{
                type: Input,
                args: ['disableFutureDateTime']
            }], backDateTime: [{
                type: Input,
                args: ['backDateTime']
            }], futureDateTime: [{
                type: Input,
                args: ['futureDateTime']
            }] } });

class DittoDirective {
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
                    this.component.instance.config.startYear = Number(moment(this._value, this.format).format('YYYY'));
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

/**
 * Generated bundle index. Do not edit.
 */

export { DittoDirective };
//# sourceMappingURL=handylib-ditto.mjs.map
