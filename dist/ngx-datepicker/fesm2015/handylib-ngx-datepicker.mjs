import * as i0 from '@angular/core';
import { Injectable, forwardRef, Component, HostListener, Input, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgxDatepickerService {
    constructor() { }
}
NgxDatepickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxDatepickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class DatepickerComponent {
    constructor(eRef) {
        this.eRef = eRef;
        this.show = false;
        this.showDatepicker = true;
        this.showTimepicker = false;
        this.showHourpicker = false;
        this.showMinutepicker = false;
        this.showSecondpicker = false;
        this.showMonthpicker = false;
        this.showYearpicker = false;
        this.defaultOptions = {
            classes: {
                container: "datepicker-card",
                input: "datepicker-input"
            },
            styles: {
                container: {
                    width: "350px",
                }
            },
            icons: {
                left: "🡰",
                right: "🡲",
                up: "🡱",
                down: "🡳"
            },
            formats: {
                input: "YYYY-MM-DD",
                output: "YYYY-MM-DD",
                preview: "YYYY-MM-DD"
            },
            weeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        };
        this.date = this.formatDateStringToObject("YYYY-MM-DD", new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate());
        this.startYear = this.date.year;
        this.options = {};
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
    }
    get value() {
        var _a, _b;
        return this.formatDateObjectToString(this.date, (_b = (_a = this.getOptions()) === null || _a === void 0 ? void 0 : _a.formats) === null || _b === void 0 ? void 0 : _b.output);
    }
    set value(value) {
        var _a, _b;
        this.date = this.formatDateStringToObject((_b = (_a = this.getOptions()) === null || _a === void 0 ? void 0 : _a.formats) === null || _b === void 0 ? void 0 : _b.input, value);
    }
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            this.show = true;
        }
        else {
            this.show = false;
            this.hidePickers();
            this.showDatepicker = true;
        }
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
    hidePickers() {
        this.showDatepicker = false;
        this.showTimepicker = false;
        this.showHourpicker = false;
        this.showMinutepicker = false;
        this.showSecondpicker = false;
        this.showMonthpicker = false;
        this.showYearpicker = false;
    }
    openTimepicker() {
        this.hidePickers();
        this.showTimepicker = true;
    }
    openDatepicker() {
        this.hidePickers();
        this.showDatepicker = true;
    }
    openMonthpicker() {
        this.hidePickers();
        this.showMonthpicker = true;
    }
    openYearpicker() {
        this.hidePickers();
        this.showYearpicker = true;
    }
    openHourpicker() {
        this.hidePickers();
        this.showHourpicker = true;
    }
    openMinutepicker() {
        this.hidePickers();
        this.showMinutepicker = true;
    }
    getOptions() {
        return Object.assign({}, this.defaultOptions, this.options);
    }
    getInputDate() {
        var _a, _b;
        var inst = this;
        return inst.formatDateObjectToString(inst.date, (_b = (_a = this.getOptions()) === null || _a === void 0 ? void 0 : _a.formats) === null || _b === void 0 ? void 0 : _b.preview);
    }
    getDateLabel() {
        var inst = this;
        var options = inst.getOptions();
        return inst.formatDateObjectToString(inst.date, "MMMM YYYY");
    }
    getYearLabel() {
        var startYear = this.startYear - 7;
        var endYear = this.startYear + 7;
        return startYear + " - " + endYear;
    }
    getMonthDates() {
        var inst = this;
        inst.options = inst.getOptions();
        var endingDate = new Date(this.date.year, this.date.month, 0).getDate();
        var dates = [];
        var prevDateObj = Object.assign({}, this.date);
        if (this.date.month > 1) {
            prevDateObj.month--;
        }
        else {
            prevDateObj.month = 12;
            prevDateObj.year--;
        }
        var prevEndingDate = new Date(prevDateObj.year, prevDateObj.month, 0).getDate();
        var prevMonthOffset = 0;
        for (var d = prevEndingDate; d > prevEndingDate - this.date.startDay; d--) {
            var dateObj = Object.assign({}, prevDateObj);
            dateObj.date = d;
            dates.unshift({
                current: false,
                date: dateObj
            });
            prevMonthOffset++;
        }
        for (var d = 1; d <= endingDate; d++) {
            var dateObj = Object.assign({}, this.date);
            dateObj.date = d;
            dates.push({
                current: true,
                date: dateObj
            });
        }
        var nextDateObj = Object.assign({}, this.date);
        if (this.date.month < 12) {
            nextDateObj.month++;
        }
        else {
            nextDateObj.month = 1;
            nextDateObj.year++;
        }
        for (var d = 1; d < 31; d++) {
            if (dates.length >= 42) {
                continue;
            }
            var dateObj = Object.assign({}, nextDateObj);
            dateObj.date = d;
            dates.push({
                current: false,
                date: dateObj
            });
        }
        return dates;
    }
    nextMonth() {
        if (this.date.month < 12) {
            this.date.month++;
        }
        else {
            this.date.year++;
            this.date.month = 1;
        }
    }
    prevMonth() {
        if (this.date.month > 0) {
            this.date.month--;
        }
        else {
            this.date.year--;
            this.date.month = 12;
        }
    }
    getArrayOf(size) {
        return new Array(size);
    }
    titleCase(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }
    prefixZero(n) {
        return ('0' + n).slice(-2);
    }
    setNextYearRange() {
        this.startYear = this.startYear + 14;
    }
    setPrevYearRange() {
        this.startYear = this.startYear - 14;
    }
    getYearsRange() {
        var years = [];
        var startYear = this.startYear - 7;
        var endYear = this.startYear + 7;
        for (var y = startYear; y <= endYear; y++) {
            years.push(y);
        }
        return years;
    }
    updateValue() {
        this.onChange(this.value);
        this.onTouched(this.value);
    }
    setYear(y) {
        this.date.year = y;
        this.hidePickers();
        this.showDatepicker = true;
    }
    setDate(d) {
        var inst = this;
        this.date = d;
        this.updateValue();
        setTimeout(function () {
            inst.show = false;
        }, 50);
    }
    setMonth(m) {
        this.date.month = m;
        this.hidePickers();
        this.showYearpicker = true;
    }
    setHours(h) {
        this.date.hour.h = Number(h);
        this.setHour24();
        this.updateValue();
        this.hidePickers();
        this.showTimepicker = true;
    }
    setMinutes(m) {
        this.date.minutes = m;
        this.hidePickers();
        this.updateValue();
        this.showTimepicker = true;
    }
    setHour24() {
        this.date.hour.hh = this.date.hour.h;
        if (this.date.hour.a == "PM" && this.date.hour.h < 12) {
            this.date.hour.hh = this.date.hour.h + 12;
        }
        if (this.date.hour.a == "AM" && this.date.hour.h == 12) {
            this.date.hour.hh = this.date.hour.h - 12;
        }
        this.date.hour.hh = this.prefixZero(this.date.hour.hh);
        console.log(this.date.hour.hh);
    }
    nextHour() {
        if (this.date.hour.h < 12) {
            this.date.hour.h++;
        }
        else {
            this.date.hour.h = 1;
        }
        this.setHour24();
        this.updateValue();
    }
    prevHour() {
        if (this.date.hour.h > 1) {
            this.date.hour.h--;
        }
        else {
            this.date.hour.h = 12;
        }
        this.setHour24();
        this.updateValue();
    }
    nextMinute() {
        if (this.date.minutes < 59) {
            this.date.minutes++;
        }
        else {
            this.date.minutes = 0;
        }
    }
    prevMinute() {
        if (this.date.minutes < 0) {
            this.date.minutes--;
        }
        else {
            this.date.minutes = 59;
        }
    }
    toggleAmPm() {
        this.date.hour.a = this.date.hour.a == "AM" ? "PM" : "AM";
        this.setHour24();
        this.updateValue();
    }
    formatDateObjectToString(date, format) {
        var months = this.getOptions().months;
        var replaceObj = {
            "YYYY": date.year,
            "DD": this.prefixZero(date.date),
            "D": this.date,
            "A": date.hour.a.substring(0, 1),
            "hh": this.prefixZero(date.hour.h),
            "h": date.hour.h,
            "HH": this.prefixZero(date.hour.hh),
            "H": date.hour.h,
            "ss": this.prefixZero(date.seconds),
            "s": date.seconds,
            "mm": this.prefixZero(date.minutes),
            "m": date.minutes,
            "MMMM": typeof months[date.month - 1] !== "undefined" ? months[date.month - 1].toLowerCase() : date.month,
            "MMM": typeof months[date.month - 1] !== "undefined" ? months[date.month - 1].substring(0, 3).toLowerCase() : date.month,
            "MM": this.prefixZero(date.month),
            "M": date.month,
        };
        for (var key in replaceObj) {
            format = format.replace(key, replaceObj[key]);
        }
        format = format.replace("P", "PM").replace("A", "AM");
        return this.titleCase(format);
    }
    formatDateStringToObject(format, value) {
        var inst = this;
        var d = new Date();
        var date = {
            from: value,
            valid: true,
            year: this.getValueFromFormat("YYYY", format, value, "n", d.getFullYear()),
            month: getMonth(),
            date: this.getValueFromFormat("DD", format, value, "n", d.getDate()),
            hour: getHour(),
            minutes: this.getValueFromFormat("mm", format, value, "n", d.getMinutes()),
            seconds: this.getValueFromFormat("ss", format, value, "n", d.getSeconds()),
            hasTime: /hh|mm|ss|A/.test(format),
            hasDate: /YYYY|MM|DD/.test(format),
            endDate: 0,
            startDay: 0,
            endDay: 0
        };
        if (date.hasDate) {
            if (typeof date.year !== "number" || typeof date.month !== "number" || typeof date.date !== "number") {
                date.valid = false;
            }
        }
        if (date.hasTime) {
            if (typeof date.hour !== "number" || typeof date.minutes !== "number") {
                date.valid = false;
            }
        }
        date.endDate = new Date(date.year, date.month - 1, 0, date.hour.hh, date.minutes, date.seconds).getDate();
        date.startDay = new Date(date.year, date.month - 1, 1, date.hour.hh, date.minutes, date.seconds).getDay();
        date.endDay = new Date(date.year, date.month - 1, date.endDate, date.hour.hh, date.minutes, date.seconds).getDay();
        function getHour() {
            var hour = {
                h: 0,
                hh: 0,
                a: ""
            };
            var a = inst.getValueFromFormat("A", format, value, "uc", false);
            var v = inst.getValueFromFormat("HH", format, value, "n", false);
            if (v == false) {
                v = inst.getValueFromFormat("H", format, value, "n", false);
            }
            if (v !== false) {
                hour.hh = v;
                if (v >= 12) {
                    hour.h = v - 12;
                    hour.a = "PM";
                }
                else {
                    hour.a = "AM";
                }
            }
            v = inst.getValueFromFormat("hh", format, value, "n", false);
            if (v == false) {
                v = inst.getValueFromFormat("h", format, value, "n", false);
            }
            if (v !== false) {
                if (a == false) {
                    hour.h = v;
                    hour.hh = v;
                    hour.a = "AM";
                }
                else {
                    hour.h = v;
                    hour.a = a;
                    if (a == "AM") {
                        hour.hh = v;
                    }
                    else {
                        hour.hh = 12 + v;
                    }
                }
            }
            return hour;
        }
        function getMonth() {
            var v = inst.getValueFromFormat("MMMM", format, value, "n", false);
            if (v == false) {
                v = inst.getValueFromFormat("MMM", format, value, "n", false);
            }
            if (v == false) {
                v = inst.getValueFromFormat("MM", format, value, "n", false);
            }
            if (v == false) {
                v = inst.getValueFromFormat("M", format, value, "n", false);
            }
            return v;
        }
        return date;
    }
    getValueFromFormat(key, format, value, mode, defaultValue = "") {
        var formatKeyStart = format.indexOf(key);
        if (formatKeyStart >= 0) {
            var formatKeyEnd = formatKeyStart + key.length;
            if (key == "MMMM") {
                formatKeyEnd = formatKeyStart + 9;
            }
            else if (/A|a/.test(key) == true) {
                formatKeyEnd = formatKeyStart + 2;
            }
            var val = value.substring(formatKeyStart, formatKeyEnd);
            if (/MMMM|MMM/.test(key) == true) {
                var months = this.getOptions().months;
                for (var i = 0; i < months.length; i++) {
                    if (key == "MMMM") {
                        if (val.toLowerCase().indexOf(months[i].toLowerCase()) >= 0) {
                            val = i + 1;
                            break;
                        }
                    }
                    else if (key == "MMM") {
                        if (val.toLowerCase().indexOf(months[i].toLowerCase().substring(0, 3)) >= 0) {
                            val = i + 1;
                            break;
                        }
                    }
                }
            }
            if (mode == "n") {
                return Number(val);
            }
            else if (mode == "lc") {
                return val.toLowerCase();
            }
            else if (mode == "uc") {
                return val.toUpperCase();
            }
            else {
                return val;
            }
        }
        else {
            return defaultValue;
        }
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        var inst = this;
    }
}
DatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatepickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
DatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DatepickerComponent, selector: "datepicker", inputs: { options: "options" }, host: { listeners: { "document:click": "clickout($event)" } }, providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        }], viewQueries: [{ propertyName: "calendar", first: true, predicate: ["calendar"], descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: "<div class=\"component-container\">\r\n    <input type=\"text\" [class]=\"getOptions()?.classes?.input\" #input [value]=\"getInputDate()\" (focus)=\"show=true\">\r\n    <div class=\"component-absolute {{getOptions()?.classes?.container}}\" [style.display]=\"show==true ? 'block' : 'none'\" #calendar [style.width]=\"getOptions()?.styles?.container?.width\">\r\n        <div class=\"date-picker\" [style.display]=\"showDatepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"prevMonth()\">{{getOptions()?.icons?.left}}</div>\r\n                <div (click)=\"openMonthpicker()\">{{getDateLabel()}}</div>\r\n                <div (click)=\"nextMonth()\">{{getOptions()?.icons?.right}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of getOptions()?.weeks\">\r\n                        <div><span>{{week.substr(0,3)}}</span></div>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"datepicker-days\">\r\n                    <li *ngFor=\"let d of getMonthDates();let i = index\">\r\n                        <div (click)=\"setDate(d.date)\" [style.background]=\"d.current == false ? '#ddd' : ''\" class=\"{{(d.date.date== date.date && d.date.month == date.month) ? 'active' : ''}}\"><span>{{d.date.date}}</span></div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"datepicker-footer\" *ngIf=\"date.hasTime\">\r\n                <button class=\"datepicker-btn\" (click)=\"openTimepicker()\">Pick Time</button>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"month-picker\" [style.display]=\"showMonthpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"openYearpicker()\">{{getYearLabel()}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-months\">\r\n                    <li *ngFor=\"let month of getOptions()?.months;let i = index\" (click)=\"setMonth(i+1)\">\r\n                        <div class=\"{{i== date.month ? 'active' : ''}}\">\r\n                            <span>{{month}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"month-picker\" [style.display]=\"showYearpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"setPrevYearRange()\">{{getOptions()?.icons?.left}}</div>\r\n                <div>{{getYearLabel()}}</div>\r\n                <div (click)=\"setNextYearRange()\">{{getOptions()?.icons?.right}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-months\">\r\n                    <li *ngFor=\"let y of getYearsRange()\">\r\n                        <div class=\"{{y== date.year ? 'active' : ''}}\" (click)=\"setYear(y)\">\r\n                            <span>{{y}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n\r\n\r\n        <div class=\"time-picker\" [style.display]=\"showTimepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <div class=\"timepicker-inputs\">\r\n                    <div class=\"timepicker-input\">\r\n                        <button (click)=\"nextHour()\">{{getOptions()?.icons?.up}}</button>\r\n                        <div (click)=\"openHourpicker()\">\r\n                            <span>{{date.hour.h}}</span>\r\n                        </div>\r\n                        <button (click)=\"prevHour()\">{{getOptions()?.icons?.down}}</button>\r\n                    </div>\r\n                    <div class=\"timepicker-input\">\r\n                        <button (click)=\"nextMinute()\">{{getOptions()?.icons?.up}}</button>\r\n                        <div>\r\n                            <span (click)=\"openMinutepicker()\">{{date.minutes}}</span>\r\n                        </div>\r\n                        <button (click)=\"prevMinute()\">{{getOptions()?.icons?.down}}</button>\r\n                    </div>\r\n                    <div class=\"timepicker-input\">\r\n                        <div (click)=\"toggleAmPm()\">\r\n                            <span>{{date.hour.a}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"datepicker-footer\">\r\n                <button class=\"datepicker-btn\" (click)=\"openDatepicker()\">Pick Date</button>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"hour-picker\" [style.display]=\"showHourpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-hours\">\r\n                    <li *ngFor=\"let h of getArrayOf(12);let i=index\">\r\n                        <div (click)=\"setHours(i+1)\">\r\n                            <span>{{i+1}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"hour-picker\" [style.display]=\"showMinutepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-minutes\">\r\n                    <li *ngFor=\"let m of getArrayOf(60);let i=index\">\r\n                        <div (click)=\"setMinutes(i+1)\">\r\n                            <span>{{i+1}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>", styles: [".component-container{position:relative}.component-absolute{position:absolute;z-index:9}ul.datepicker-weeks,ul.datepicker-days{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap}ul.datepicker-weeks>li,ul.datepicker-days>li{width:14.2857%;display:inline-flex;justify-content:center;align-items:center}ul.datepicker-weeks>li>div,ul.datepicker-days>li>div{height:0;display:flex;flex-direction:column;align-items:center;align-content:center;justify-content:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width:100%;cursor:pointer;padding-bottom:100%;position:relative}ul.datepicker-weeks{border-bottom:1px solid #ddd}.datepicker-header{background:#1266f1;color:#fff;display:flex;flex-direction:row;align-items:center;align-content:center;box-shadow:0 2px 5px #0003,0 2px 10px #0000001a;text-align:center}.datepicker-header>div{flex:1;width:33.33%;display:flex;flex-direction:column;align-items:center;justify-content:center;height:40px;cursor:pointer}ul.datepicker-days>li:hover>div{background:#ddd}ul.datepicker-weeks>li>div>span,ul.datepicker-days>li>div>span{position:absolute;bottom:0px;top:0px;display:flex;align-items:center;justify-content:center}.datepicker-body{width:100%;padding:0;display:flex;flex-direction:column}.datepicker-footer{padding:5px}.datepicker-btn{height:30px;border-radius:5px;width:100%;border:none;box-shadow:0 2px 5px #0003,0 2px 10px #0000001a;background:#1266f1;color:#fff;text-transform:uppercase;font-weight:500}.timepicker-inputs{width:100%;display:flex;flex-direction:row;align-items:center}.timepicker-input{min-height:150px;display:flex;flex-direction:column;flex:1;padding:5px;position:relative}.timepicker-input>button{height:35px;background:#fff}.timepicker-input>button,.timepicker-input>div{width:100%;border:none;border-radius:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#000;cursor:pointer;flex:1}.timepicker-input>button:hover,.timepicker-input>div:hover{background:#ddd}.timepicker-input:before{content:\"\";top:-10px}.timepicker-input:after{top:10px}.timepicker-input:last-child:after,.timepicker-input:last-child:before{display:none}.timepicker-input:after,.timepicker-input:before{content:\"\";position:absolute;height:3px;width:3px;background:#1266f1;bottom:0px;right:0px;margin-top:auto;margin-bottom:auto;border-radius:100%}ul.datepicker-months,ul.datepicker-years,ul.datepicker-hours,ul.datepicker-minutes{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap}ul.datepicker-hours>li{width:33.33%;display:flex;align-items:center;justify-content:center;padding:5px}ul.datepicker-hours>li>div{height:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;border-radius:5px;cursor:pointer;font-weight:500}ul.datepicker-hours>li:hover>div{background:#ddd}ul.datepicker-minutes>li{width:12.5%;display:flex;flex-direction:column;align-items:center;justify-content:center}ul.datepicker-minutes>li>div{height:0;padding-bottom:100%;display:flex;align-items:center;justify-content:center;position:relative;width:100%;border-radius:5px;cursor:pointer}ul.datepicker-minutes>li>div>span{position:absolute;top:0px;bottom:0px;margin:auto;display:flex;align-items:center;justify-content:center;width:100%}ul.datepicker-minutes>li:hover>div{background:#ddd}ul.datepicker-months>li,ul.datepicker-years>li{width:33.33%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5px}ul.datepicker-months>li>div,ul.datepicker-years>li>div{height:30px;border-radius:30px;width:100%;text-align:center;display:flex;align-items:center;justify-content:center;cursor:pointer}ul.datepicker-months>li>div>span,ul.datepicker-years>li>div>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}ul.datepicker-months>li>div:hover,ul.datepicker-years>li>div:hover{background:#ddd}ul.datepicker-months>li>div.active,ul.datepicker-days>li>div.active,ul.datepicker-years>li>div.active{background:#1266f1;color:#fff}.datepicker-card{background:#fff;border-radius:5px;overflow:hidden;box-shadow:0 10px 15px -3px #00000012,0 4px 6px -2px #0000000d}.datepicker-input{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.6;color:#4f4f4f;background-color:#fff;background-clip:padding-box;border:1px solid #bdbdbd;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.25rem;transition:all .2s linear}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'datepicker', providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DatepickerComponent),
                            multi: true
                        }], template: "<div class=\"component-container\">\r\n    <input type=\"text\" [class]=\"getOptions()?.classes?.input\" #input [value]=\"getInputDate()\" (focus)=\"show=true\">\r\n    <div class=\"component-absolute {{getOptions()?.classes?.container}}\" [style.display]=\"show==true ? 'block' : 'none'\" #calendar [style.width]=\"getOptions()?.styles?.container?.width\">\r\n        <div class=\"date-picker\" [style.display]=\"showDatepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"prevMonth()\">{{getOptions()?.icons?.left}}</div>\r\n                <div (click)=\"openMonthpicker()\">{{getDateLabel()}}</div>\r\n                <div (click)=\"nextMonth()\">{{getOptions()?.icons?.right}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-weeks\">\r\n                    <li *ngFor=\"let week of getOptions()?.weeks\">\r\n                        <div><span>{{week.substr(0,3)}}</span></div>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"datepicker-days\">\r\n                    <li *ngFor=\"let d of getMonthDates();let i = index\">\r\n                        <div (click)=\"setDate(d.date)\" [style.background]=\"d.current == false ? '#ddd' : ''\" class=\"{{(d.date.date== date.date && d.date.month == date.month) ? 'active' : ''}}\"><span>{{d.date.date}}</span></div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"datepicker-footer\" *ngIf=\"date.hasTime\">\r\n                <button class=\"datepicker-btn\" (click)=\"openTimepicker()\">Pick Time</button>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"month-picker\" [style.display]=\"showMonthpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"openYearpicker()\">{{getYearLabel()}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-months\">\r\n                    <li *ngFor=\"let month of getOptions()?.months;let i = index\" (click)=\"setMonth(i+1)\">\r\n                        <div class=\"{{i== date.month ? 'active' : ''}}\">\r\n                            <span>{{month}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"month-picker\" [style.display]=\"showYearpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-header\">\r\n                <div (click)=\"setPrevYearRange()\">{{getOptions()?.icons?.left}}</div>\r\n                <div>{{getYearLabel()}}</div>\r\n                <div (click)=\"setNextYearRange()\">{{getOptions()?.icons?.right}}</div>\r\n            </div>\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-months\">\r\n                    <li *ngFor=\"let y of getYearsRange()\">\r\n                        <div class=\"{{y== date.year ? 'active' : ''}}\" (click)=\"setYear(y)\">\r\n                            <span>{{y}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n\r\n\r\n        <div class=\"time-picker\" [style.display]=\"showTimepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <div class=\"timepicker-inputs\">\r\n                    <div class=\"timepicker-input\">\r\n                        <button (click)=\"nextHour()\">{{getOptions()?.icons?.up}}</button>\r\n                        <div (click)=\"openHourpicker()\">\r\n                            <span>{{date.hour.h}}</span>\r\n                        </div>\r\n                        <button (click)=\"prevHour()\">{{getOptions()?.icons?.down}}</button>\r\n                    </div>\r\n                    <div class=\"timepicker-input\">\r\n                        <button (click)=\"nextMinute()\">{{getOptions()?.icons?.up}}</button>\r\n                        <div>\r\n                            <span (click)=\"openMinutepicker()\">{{date.minutes}}</span>\r\n                        </div>\r\n                        <button (click)=\"prevMinute()\">{{getOptions()?.icons?.down}}</button>\r\n                    </div>\r\n                    <div class=\"timepicker-input\">\r\n                        <div (click)=\"toggleAmPm()\">\r\n                            <span>{{date.hour.a}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"datepicker-footer\">\r\n                <button class=\"datepicker-btn\" (click)=\"openDatepicker()\">Pick Date</button>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"hour-picker\" [style.display]=\"showHourpicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-hours\">\r\n                    <li *ngFor=\"let h of getArrayOf(12);let i=index\">\r\n                        <div (click)=\"setHours(i+1)\">\r\n                            <span>{{i+1}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"hour-picker\" [style.display]=\"showMinutepicker==true ? 'block' : 'none'\">\r\n            <div class=\"datepicker-body\">\r\n                <ul class=\"datepicker-minutes\">\r\n                    <li *ngFor=\"let m of getArrayOf(60);let i=index\">\r\n                        <div (click)=\"setMinutes(i+1)\">\r\n                            <span>{{i+1}}</span>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>", styles: [".component-container{position:relative}.component-absolute{position:absolute;z-index:9}ul.datepicker-weeks,ul.datepicker-days{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap}ul.datepicker-weeks>li,ul.datepicker-days>li{width:14.2857%;display:inline-flex;justify-content:center;align-items:center}ul.datepicker-weeks>li>div,ul.datepicker-days>li>div{height:0;display:flex;flex-direction:column;align-items:center;align-content:center;justify-content:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width:100%;cursor:pointer;padding-bottom:100%;position:relative}ul.datepicker-weeks{border-bottom:1px solid #ddd}.datepicker-header{background:#1266f1;color:#fff;display:flex;flex-direction:row;align-items:center;align-content:center;box-shadow:0 2px 5px #0003,0 2px 10px #0000001a;text-align:center}.datepicker-header>div{flex:1;width:33.33%;display:flex;flex-direction:column;align-items:center;justify-content:center;height:40px;cursor:pointer}ul.datepicker-days>li:hover>div{background:#ddd}ul.datepicker-weeks>li>div>span,ul.datepicker-days>li>div>span{position:absolute;bottom:0px;top:0px;display:flex;align-items:center;justify-content:center}.datepicker-body{width:100%;padding:0;display:flex;flex-direction:column}.datepicker-footer{padding:5px}.datepicker-btn{height:30px;border-radius:5px;width:100%;border:none;box-shadow:0 2px 5px #0003,0 2px 10px #0000001a;background:#1266f1;color:#fff;text-transform:uppercase;font-weight:500}.timepicker-inputs{width:100%;display:flex;flex-direction:row;align-items:center}.timepicker-input{min-height:150px;display:flex;flex-direction:column;flex:1;padding:5px;position:relative}.timepicker-input>button{height:35px;background:#fff}.timepicker-input>button,.timepicker-input>div{width:100%;border:none;border-radius:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#000;cursor:pointer;flex:1}.timepicker-input>button:hover,.timepicker-input>div:hover{background:#ddd}.timepicker-input:before{content:\"\";top:-10px}.timepicker-input:after{top:10px}.timepicker-input:last-child:after,.timepicker-input:last-child:before{display:none}.timepicker-input:after,.timepicker-input:before{content:\"\";position:absolute;height:3px;width:3px;background:#1266f1;bottom:0px;right:0px;margin-top:auto;margin-bottom:auto;border-radius:100%}ul.datepicker-months,ul.datepicker-years,ul.datepicker-hours,ul.datepicker-minutes{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap}ul.datepicker-hours>li{width:33.33%;display:flex;align-items:center;justify-content:center;padding:5px}ul.datepicker-hours>li>div{height:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;border-radius:5px;cursor:pointer;font-weight:500}ul.datepicker-hours>li:hover>div{background:#ddd}ul.datepicker-minutes>li{width:12.5%;display:flex;flex-direction:column;align-items:center;justify-content:center}ul.datepicker-minutes>li>div{height:0;padding-bottom:100%;display:flex;align-items:center;justify-content:center;position:relative;width:100%;border-radius:5px;cursor:pointer}ul.datepicker-minutes>li>div>span{position:absolute;top:0px;bottom:0px;margin:auto;display:flex;align-items:center;justify-content:center;width:100%}ul.datepicker-minutes>li:hover>div{background:#ddd}ul.datepicker-months>li,ul.datepicker-years>li{width:33.33%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5px}ul.datepicker-months>li>div,ul.datepicker-years>li>div{height:30px;border-radius:30px;width:100%;text-align:center;display:flex;align-items:center;justify-content:center;cursor:pointer}ul.datepicker-months>li>div>span,ul.datepicker-years>li>div>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}ul.datepicker-months>li>div:hover,ul.datepicker-years>li>div:hover{background:#ddd}ul.datepicker-months>li>div.active,ul.datepicker-days>li>div.active,ul.datepicker-years>li>div.active{background:#1266f1;color:#fff}.datepicker-card{background:#fff;border-radius:5px;overflow:hidden;box-shadow:0 10px 15px -3px #00000012,0 4px 6px -2px #0000000d}.datepicker-input{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.6;color:#4f4f4f;background-color:#fff;background-clip:padding-box;border:1px solid #bdbdbd;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.25rem;transition:all .2s linear}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { clickout: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], options: [{
                type: Input,
                args: ["options"]
            }], calendar: [{
                type: ViewChild,
                args: ["calendar"]
            }], input: [{
                type: ViewChild,
                args: ["input"]
            }] } });

class NgxDatepickerModule {
}
NgxDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, declarations: [DatepickerComponent], imports: [CommonModule], exports: [DatepickerComponent] });
NgxDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DatepickerComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        DatepickerComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-datepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DatepickerComponent, NgxDatepickerModule, NgxDatepickerService };
//# sourceMappingURL=handylib-ngx-datepicker.mjs.map
