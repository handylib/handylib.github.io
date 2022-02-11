import { Component, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DatepickerComponent {
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
        return this.formatDateObjectToString(this.date, this.getOptions()?.formats?.output);
    }
    set value(value) {
        this.date = this.formatDateStringToObject(this.getOptions()?.formats?.input, value);
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
        var inst = this;
        return inst.formatDateObjectToString(inst.date, this.getOptions()?.formats?.preview);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFhekUsTUFBTSxPQUFPLG1CQUFtQjtJQUU5QixZQUNVLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFJMUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLG1CQUFjLEdBQVk7WUFDeEIsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLEtBQUssRUFBRSxrQkFBa0I7YUFDMUI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFO29CQUNULEtBQUssRUFBRSxPQUFPO2lCQUNmO2FBQ0Y7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsRUFBRSxFQUFF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bUJBQW1CLENBQUM7WUFDbEQsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLGlOQ1pKLGd6TEFxSE07MkZEdkdPLG1CQUFtQjtrQkFWL0IsU0FBUzsrQkFDRSxZQUFZLGFBR1gsQ0FBQzs0QkFDVixPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQztpR0F5REYsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVd4QixPQUFPO3NCQUF4QixLQUFLO3VCQUFDLFNBQVM7Z0JBQ08sUUFBUTtzQkFBOUIsU0FBUzt1QkFBQyxVQUFVO2dCQUNELEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuLi9uZ3gtZGF0ZXBpY2tlci5tb2R1bGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlcGlja2VyQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlUmVmOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cblxuICBzaG93OiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dEYXRlcGlja2VyOiBib29sZWFuID0gdHJ1ZTtcbiAgc2hvd1RpbWVwaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2hvd0hvdXJwaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2hvd01pbnV0ZXBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93U2Vjb25kcGlja2VyOiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dNb250aHBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93WWVhcnBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnMgPSB7XG4gICAgY2xhc3Nlczoge1xuICAgICAgY29udGFpbmVyOiBcImRhdGVwaWNrZXItY2FyZFwiLFxuICAgICAgaW5wdXQ6IFwiZGF0ZXBpY2tlci1pbnB1dFwiXG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICB3aWR0aDogXCIzNTBweFwiLFxuICAgICAgfVxuICAgIH0sXG4gICAgaWNvbnM6IHtcbiAgICAgIGxlZnQ6IFwi8J+hsFwiLFxuICAgICAgcmlnaHQ6IFwi8J+hslwiLFxuICAgICAgdXA6IFwi8J+hsVwiLFxuICAgICAgZG93bjogXCLwn6GzXCJcbiAgICB9LFxuICAgIGZvcm1hdHM6IHtcbiAgICAgIGlucHV0OiBcIllZWVktTU0tRERcIixcbiAgICAgIG91dHB1dDogXCJZWVlZLU1NLUREXCIsXG4gICAgICBwcmV2aWV3OiBcIllZWVktTU0tRERcIlxuICAgIH0sXG4gICAgd2Vla3M6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaGlyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIG1vbnRoczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG4gIH07XG5cbiAgZGF0ZTogYW55ID0gdGhpcy5mb3JtYXREYXRlU3RyaW5nVG9PYmplY3QoXCJZWVlZLU1NLUREXCIsIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBuZXcgRGF0ZSgpLmdldERhdGUoKSk7XG4gIHN0YXJ0WWVhcjogbnVtYmVyID0gdGhpcy5kYXRlLnllYXI7XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0RGF0ZU9iamVjdFRvU3RyaW5nKHRoaXMuZGF0ZSwgdGhpcy5nZXRPcHRpb25zKCk/LmZvcm1hdHM/Lm91dHB1dCk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZVN0cmluZ1RvT2JqZWN0KHRoaXMuZ2V0T3B0aW9ucygpPy5mb3JtYXRzPy5pbnB1dCwgdmFsdWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja291dChldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlUGlja2VycygpO1xuICAgICAgdGhpcy5zaG93RGF0ZXBpY2tlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KFwib3B0aW9uc1wiKSBvcHRpb25zOiBPcHRpb25zID0ge307XG4gIEBWaWV3Q2hpbGQoXCJjYWxlbmRhclwiKSBjYWxlbmRhciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJpbnB1dFwiKSBpbnB1dCE6IEVsZW1lbnRSZWY7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIG9uVG91Y2hlZCA9IChfOiBhbnkpID0+IHsgfTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgaGlkZVBpY2tlcnMoKSB7XG4gICAgdGhpcy5zaG93RGF0ZXBpY2tlciA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1RpbWVwaWNrZXIgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dIb3VycGlja2VyID0gZmFsc2U7XG4gICAgdGhpcy5zaG93TWludXRlcGlja2VyID0gZmFsc2U7XG4gICAgdGhpcy5zaG93U2Vjb25kcGlja2VyID0gZmFsc2U7XG4gICAgdGhpcy5zaG93TW9udGhwaWNrZXIgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dZZWFycGlja2VyID0gZmFsc2U7XG4gIH1cblxuICBvcGVuVGltZXBpY2tlcigpIHtcbiAgICB0aGlzLmhpZGVQaWNrZXJzKCk7XG4gICAgdGhpcy5zaG93VGltZXBpY2tlciA9IHRydWU7XG4gIH1cblxuICBvcGVuRGF0ZXBpY2tlcigpIHtcbiAgICB0aGlzLmhpZGVQaWNrZXJzKCk7XG4gICAgdGhpcy5zaG93RGF0ZXBpY2tlciA9IHRydWU7XG4gIH1cblxuICBvcGVuTW9udGhwaWNrZXIoKSB7XG4gICAgdGhpcy5oaWRlUGlja2VycygpO1xuICAgIHRoaXMuc2hvd01vbnRocGlja2VyID0gdHJ1ZTtcbiAgfVxuXG4gIG9wZW5ZZWFycGlja2VyKCkge1xuICAgIHRoaXMuaGlkZVBpY2tlcnMoKTtcbiAgICB0aGlzLnNob3dZZWFycGlja2VyID0gdHJ1ZTtcbiAgfVxuXG4gIG9wZW5Ib3VycGlja2VyKCkge1xuICAgIHRoaXMuaGlkZVBpY2tlcnMoKTtcbiAgICB0aGlzLnNob3dIb3VycGlja2VyID0gdHJ1ZTtcbiAgfVxuXG4gIG9wZW5NaW51dGVwaWNrZXIoKSB7XG4gICAgdGhpcy5oaWRlUGlja2VycygpO1xuICAgIHRoaXMuc2hvd01pbnV0ZXBpY2tlciA9IHRydWU7XG4gIH1cblxuICBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0SW5wdXREYXRlKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICByZXR1cm4gaW5zdC5mb3JtYXREYXRlT2JqZWN0VG9TdHJpbmcoaW5zdC5kYXRlLCB0aGlzLmdldE9wdGlvbnMoKT8uZm9ybWF0cz8ucHJldmlldyk7XG4gIH1cblxuICBnZXREYXRlTGFiZWwoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzO1xuICAgIHZhciBvcHRpb25zID0gaW5zdC5nZXRPcHRpb25zKCk7XG4gICAgcmV0dXJuIGluc3QuZm9ybWF0RGF0ZU9iamVjdFRvU3RyaW5nKGluc3QuZGF0ZSwgXCJNTU1NIFlZWVlcIik7XG4gIH1cblxuICBnZXRZZWFyTGFiZWwoKSB7XG4gICAgdmFyIHN0YXJ0WWVhciA9IHRoaXMuc3RhcnRZZWFyIC0gNztcbiAgICB2YXIgZW5kWWVhciA9IHRoaXMuc3RhcnRZZWFyICsgNztcbiAgICByZXR1cm4gc3RhcnRZZWFyICsgXCIgLSBcIiArIGVuZFllYXI7XG4gIH1cblxuICBnZXRNb250aERhdGVzKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICBpbnN0Lm9wdGlvbnMgPSBpbnN0LmdldE9wdGlvbnMoKTtcbiAgICB2YXIgZW5kaW5nRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZS55ZWFyLCB0aGlzLmRhdGUubW9udGgsIDApLmdldERhdGUoKTtcbiAgICB2YXIgZGF0ZXMgPSBbXTtcblxuXG4gICAgdmFyIHByZXZEYXRlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRlKTtcbiAgICBpZiAodGhpcy5kYXRlLm1vbnRoID4gMSkge1xuICAgICAgcHJldkRhdGVPYmoubW9udGgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldkRhdGVPYmoubW9udGggPSAxMjtcbiAgICAgIHByZXZEYXRlT2JqLnllYXItLTtcbiAgICB9XG4gICAgdmFyIHByZXZFbmRpbmdEYXRlID0gbmV3IERhdGUocHJldkRhdGVPYmoueWVhciwgcHJldkRhdGVPYmoubW9udGgsIDApLmdldERhdGUoKTtcbiAgICB2YXIgcHJldk1vbnRoT2Zmc2V0ID0gMDtcbiAgICBmb3IgKHZhciBkID0gcHJldkVuZGluZ0RhdGU7IGQgPiBwcmV2RW5kaW5nRGF0ZSAtIHRoaXMuZGF0ZS5zdGFydERheTsgZC0tKSB7XG4gICAgICB2YXIgZGF0ZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZEYXRlT2JqKTtcbiAgICAgIGRhdGVPYmouZGF0ZSA9IGQ7XG4gICAgICBkYXRlcy51bnNoaWZ0KHtcbiAgICAgICAgY3VycmVudDogZmFsc2UsXG4gICAgICAgIGRhdGU6IGRhdGVPYmpcbiAgICAgIH0pO1xuICAgICAgcHJldk1vbnRoT2Zmc2V0Kys7XG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGQgPSAxOyBkIDw9IGVuZGluZ0RhdGU7IGQrKykge1xuICAgICAgdmFyIGRhdGVPYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGUpO1xuICAgICAgZGF0ZU9iai5kYXRlID0gZDtcbiAgICAgIGRhdGVzLnB1c2goe1xuICAgICAgICBjdXJyZW50OiB0cnVlLFxuICAgICAgICBkYXRlOiBkYXRlT2JqXG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIHZhciBuZXh0RGF0ZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0ZSk7XG4gICAgaWYgKHRoaXMuZGF0ZS5tb250aCA8IDEyKSB7XG4gICAgICBuZXh0RGF0ZU9iai5tb250aCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RGF0ZU9iai5tb250aCA9IDE7XG4gICAgICBuZXh0RGF0ZU9iai55ZWFyKys7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZCA9IDE7IGQgPCAzMTsgZCsrKSB7XG4gICAgICBpZiAoZGF0ZXMubGVuZ3RoID49IDQyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGRhdGVPYmogPSBPYmplY3QuYXNzaWduKHt9LCBuZXh0RGF0ZU9iaik7XG4gICAgICBkYXRlT2JqLmRhdGUgPSBkO1xuICAgICAgZGF0ZXMucHVzaCh7XG4gICAgICAgIGN1cnJlbnQ6IGZhbHNlLFxuICAgICAgICBkYXRlOiBkYXRlT2JqXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZXM7XG4gIH1cblxuXG5cbiAgbmV4dE1vbnRoKCkge1xuICAgIGlmICh0aGlzLmRhdGUubW9udGggPCAxMikge1xuICAgICAgdGhpcy5kYXRlLm1vbnRoKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZS55ZWFyKys7XG4gICAgICB0aGlzLmRhdGUubW9udGggPSAxO1xuICAgIH1cbiAgfVxuXG4gIHByZXZNb250aCgpIHtcbiAgICBpZiAodGhpcy5kYXRlLm1vbnRoID4gMCkge1xuICAgICAgdGhpcy5kYXRlLm1vbnRoLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZS55ZWFyLS07XG4gICAgICB0aGlzLmRhdGUubW9udGggPSAxMjtcbiAgICB9XG4gIH1cblxuICBnZXRBcnJheU9mKHNpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG4gIH1cblxuICB0aXRsZUNhc2Uoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFxcdykvZywgcyA9PiBzLnRvVXBwZXJDYXNlKCkpO1xuICB9XG5cbiAgcHJlZml4WmVybyhuOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKCcwJyArIG4pLnNsaWNlKC0yKTtcbiAgfVxuXG4gIHNldE5leHRZZWFyUmFuZ2UoKSB7XG4gICAgdGhpcy5zdGFydFllYXIgPSB0aGlzLnN0YXJ0WWVhciArIDE0O1xuICB9XG5cbiAgc2V0UHJldlllYXJSYW5nZSgpIHtcbiAgICB0aGlzLnN0YXJ0WWVhciA9IHRoaXMuc3RhcnRZZWFyIC0gMTQ7XG4gIH1cblxuICBnZXRZZWFyc1JhbmdlKCkge1xuICAgIHZhciB5ZWFycyA9IFtdO1xuICAgIHZhciBzdGFydFllYXIgPSB0aGlzLnN0YXJ0WWVhciAtIDc7XG4gICAgdmFyIGVuZFllYXIgPSB0aGlzLnN0YXJ0WWVhciArIDc7XG4gICAgZm9yICh2YXIgeSA9IHN0YXJ0WWVhcjsgeSA8PSBlbmRZZWFyOyB5KyspIHtcbiAgICAgIHllYXJzLnB1c2goeSk7XG4gICAgfVxuICAgIHJldHVybiB5ZWFycztcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5vblRvdWNoZWQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRZZWFyKHk6IG51bWJlcikge1xuICAgIHRoaXMuZGF0ZS55ZWFyID0geTtcbiAgICB0aGlzLmhpZGVQaWNrZXJzKCk7XG4gICAgdGhpcy5zaG93RGF0ZXBpY2tlciA9IHRydWU7XG4gIH1cblxuICBzZXREYXRlKGQ6IGFueSkge1xuICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICB0aGlzLmRhdGUgPSBkO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGluc3Quc2hvdyA9IGZhbHNlO1xuICAgIH0sIDUwKTtcbiAgfVxuXG4gIHNldE1vbnRoKG06IG51bWJlcikge1xuICAgIHRoaXMuZGF0ZS5tb250aCA9IG07XG4gICAgdGhpcy5oaWRlUGlja2VycygpO1xuICAgIHRoaXMuc2hvd1llYXJwaWNrZXIgPSB0cnVlO1xuICB9XG5cbiAgc2V0SG91cnMoaDogbnVtYmVyKSB7XG5cbiAgICB0aGlzLmRhdGUuaG91ci5oID0gTnVtYmVyKGgpO1xuICAgIHRoaXMuc2V0SG91cjI0KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICAgIHRoaXMuaGlkZVBpY2tlcnMoKTtcbiAgICB0aGlzLnNob3dUaW1lcGlja2VyID0gdHJ1ZTtcbiAgfVxuXG4gIHNldE1pbnV0ZXMobTogbnVtYmVyKSB7XG4gICAgdGhpcy5kYXRlLm1pbnV0ZXMgPSBtO1xuICAgIHRoaXMuaGlkZVBpY2tlcnMoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgdGhpcy5zaG93VGltZXBpY2tlciA9IHRydWU7XG4gIH1cblxuXG4gIHNldEhvdXIyNCgpIHtcbiAgICB0aGlzLmRhdGUuaG91ci5oaCA9IHRoaXMuZGF0ZS5ob3VyLmg7XG4gICAgaWYgKHRoaXMuZGF0ZS5ob3VyLmEgPT0gXCJQTVwiICYmIHRoaXMuZGF0ZS5ob3VyLmggPCAxMikge1xuICAgICAgdGhpcy5kYXRlLmhvdXIuaGggPSB0aGlzLmRhdGUuaG91ci5oICsgMTJcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlLmhvdXIuYSA9PSBcIkFNXCIgJiYgdGhpcy5kYXRlLmhvdXIuaCA9PSAxMikge1xuICAgICAgdGhpcy5kYXRlLmhvdXIuaGggPSB0aGlzLmRhdGUuaG91ci5oIC0gMTJcbiAgICB9XG5cbiAgICB0aGlzLmRhdGUuaG91ci5oaCA9IHRoaXMucHJlZml4WmVybyh0aGlzLmRhdGUuaG91ci5oaCk7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRlLmhvdXIuaGgpO1xuXG4gIH1cblxuICBuZXh0SG91cigpIHtcbiAgICBpZiAodGhpcy5kYXRlLmhvdXIuaCA8IDEyKSB7XG4gICAgICB0aGlzLmRhdGUuaG91ci5oKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZS5ob3VyLmggPSAxO1xuICAgIH1cbiAgICB0aGlzLnNldEhvdXIyNCgpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxuXG4gIHByZXZIb3VyKCkge1xuICAgIGlmICh0aGlzLmRhdGUuaG91ci5oID4gMSkge1xuICAgICAgdGhpcy5kYXRlLmhvdXIuaC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGUuaG91ci5oID0gMTI7XG4gICAgfVxuICAgIHRoaXMuc2V0SG91cjI0KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgbmV4dE1pbnV0ZSgpIHtcbiAgICBpZiAodGhpcy5kYXRlLm1pbnV0ZXMgPCA1OSkge1xuICAgICAgdGhpcy5kYXRlLm1pbnV0ZXMrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlLm1pbnV0ZXMgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByZXZNaW51dGUoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZS5taW51dGVzIDwgMCkge1xuICAgICAgdGhpcy5kYXRlLm1pbnV0ZXMtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlLm1pbnV0ZXMgPSA1OTtcbiAgICB9XG4gIH1cblxuXG4gIHRvZ2dsZUFtUG0oKSB7XG4gICAgdGhpcy5kYXRlLmhvdXIuYSA9IHRoaXMuZGF0ZS5ob3VyLmEgPT0gXCJBTVwiID8gXCJQTVwiIDogXCJBTVwiO1xuICAgIHRoaXMuc2V0SG91cjI0KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cblxuICBmb3JtYXREYXRlT2JqZWN0VG9TdHJpbmcoZGF0ZTogYW55LCBmb3JtYXQ6IHN0cmluZykge1xuICAgIHZhciBtb250aHMgPSB0aGlzLmdldE9wdGlvbnMoKS5tb250aHM7XG4gICAgdmFyIHJlcGxhY2VPYmo6IGFueSA9IHtcbiAgICAgIFwiWVlZWVwiOiBkYXRlLnllYXIsXG4gICAgICBcIkREXCI6IHRoaXMucHJlZml4WmVybyhkYXRlLmRhdGUpLFxuICAgICAgXCJEXCI6IHRoaXMuZGF0ZSxcbiAgICAgIFwiQVwiOiBkYXRlLmhvdXIuYS5zdWJzdHJpbmcoMCwgMSksXG4gICAgICBcImhoXCI6IHRoaXMucHJlZml4WmVybyhkYXRlLmhvdXIuaCksXG4gICAgICBcImhcIjogZGF0ZS5ob3VyLmgsXG4gICAgICBcIkhIXCI6IHRoaXMucHJlZml4WmVybyhkYXRlLmhvdXIuaGgpLFxuICAgICAgXCJIXCI6IGRhdGUuaG91ci5oLFxuICAgICAgXCJzc1wiOiB0aGlzLnByZWZpeFplcm8oZGF0ZS5zZWNvbmRzKSxcbiAgICAgIFwic1wiOiBkYXRlLnNlY29uZHMsXG4gICAgICBcIm1tXCI6IHRoaXMucHJlZml4WmVybyhkYXRlLm1pbnV0ZXMpLFxuICAgICAgXCJtXCI6IGRhdGUubWludXRlcyxcbiAgICAgIFwiTU1NTVwiOiB0eXBlb2YgbW9udGhzW2RhdGUubW9udGggLSAxXSAhPT0gXCJ1bmRlZmluZWRcIiA/IG1vbnRoc1tkYXRlLm1vbnRoIC0gMV0udG9Mb3dlckNhc2UoKSA6IGRhdGUubW9udGgsXG4gICAgICBcIk1NTVwiOiB0eXBlb2YgbW9udGhzW2RhdGUubW9udGggLSAxXSAhPT0gXCJ1bmRlZmluZWRcIiA/IG1vbnRoc1tkYXRlLm1vbnRoIC0gMV0uc3Vic3RyaW5nKDAsIDMpLnRvTG93ZXJDYXNlKCkgOiBkYXRlLm1vbnRoLFxuICAgICAgXCJNTVwiOiB0aGlzLnByZWZpeFplcm8oZGF0ZS5tb250aCksXG4gICAgICBcIk1cIjogZGF0ZS5tb250aCxcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHJlcGxhY2VPYmopIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGtleSwgcmVwbGFjZU9ialtrZXldKTtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcIlBcIiwgXCJQTVwiKS5yZXBsYWNlKFwiQVwiLCBcIkFNXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMudGl0bGVDYXNlKGZvcm1hdCk7XG4gIH1cblxuICBmb3JtYXREYXRlU3RyaW5nVG9PYmplY3QoZm9ybWF0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXM7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBkYXRlID0ge1xuICAgICAgZnJvbTogdmFsdWUsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIHllYXI6IHRoaXMuZ2V0VmFsdWVGcm9tRm9ybWF0KFwiWVlZWVwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZC5nZXRGdWxsWWVhcigpKSxcbiAgICAgIG1vbnRoOiBnZXRNb250aCgpLFxuICAgICAgZGF0ZTogdGhpcy5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJERFwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZC5nZXREYXRlKCkpLFxuICAgICAgaG91cjogZ2V0SG91cigpLFxuICAgICAgbWludXRlczogdGhpcy5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJtbVwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZC5nZXRNaW51dGVzKCkpLFxuICAgICAgc2Vjb25kczogdGhpcy5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJzc1wiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZC5nZXRTZWNvbmRzKCkpLFxuICAgICAgaGFzVGltZTogL2hofG1tfHNzfEEvLnRlc3QoZm9ybWF0KSxcbiAgICAgIGhhc0RhdGU6IC9ZWVlZfE1NfERELy50ZXN0KGZvcm1hdCksXG4gICAgICBlbmREYXRlOiAwLFxuICAgICAgc3RhcnREYXk6IDAsXG4gICAgICBlbmREYXk6IDBcbiAgICB9O1xuXG5cblxuICAgIGlmIChkYXRlLmhhc0RhdGUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGF0ZS55ZWFyICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkYXRlLm1vbnRoICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkYXRlLmRhdGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgZGF0ZS52YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRlLmhhc1RpbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGF0ZS5ob3VyICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkYXRlLm1pbnV0ZXMgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgZGF0ZS52YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGUuZW5kRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIDAsIGRhdGUuaG91ci5oaCwgZGF0ZS5taW51dGVzLCBkYXRlLnNlY29uZHMpLmdldERhdGUoKTtcbiAgICBkYXRlLnN0YXJ0RGF5ID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgMSwgZGF0ZS5ob3VyLmhoLCBkYXRlLm1pbnV0ZXMsIGRhdGUuc2Vjb25kcykuZ2V0RGF5KCk7XG4gICAgZGF0ZS5lbmREYXkgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmVuZERhdGUsIGRhdGUuaG91ci5oaCwgZGF0ZS5taW51dGVzLCBkYXRlLnNlY29uZHMpLmdldERheSgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SG91cigpIHtcbiAgICAgIHZhciBob3VyID0ge1xuICAgICAgICBoOiAwLFxuICAgICAgICBoaDogMCxcbiAgICAgICAgYTogXCJcIlxuICAgICAgfTtcbiAgICAgIHZhciBhID0gaW5zdC5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJBXCIsIGZvcm1hdCwgdmFsdWUsIFwidWNcIiwgZmFsc2UpO1xuXG4gICAgICB2YXIgdjogYW55ID0gaW5zdC5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJISFwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZmFsc2UpO1xuICAgICAgaWYgKHYgPT0gZmFsc2UpIHtcbiAgICAgICAgdiA9IGluc3QuZ2V0VmFsdWVGcm9tRm9ybWF0KFwiSFwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgICAgaG91ci5oaCA9IHY7XG4gICAgICAgIGlmICh2ID49IDEyKSB7XG4gICAgICAgICAgaG91ci5oID0gdiAtIDEyO1xuICAgICAgICAgIGhvdXIuYSA9IFwiUE1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBob3VyLmEgPSBcIkFNXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdiA9IGluc3QuZ2V0VmFsdWVGcm9tRm9ybWF0KFwiaGhcIiwgZm9ybWF0LCB2YWx1ZSwgXCJuXCIsIGZhbHNlKTtcbiAgICAgIGlmICh2ID09IGZhbHNlKSB7XG4gICAgICAgIHYgPSBpbnN0LmdldFZhbHVlRnJvbUZvcm1hdChcImhcIiwgZm9ybWF0LCB2YWx1ZSwgXCJuXCIsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChhID09IGZhbHNlKSB7XG4gICAgICAgICAgaG91ci5oID0gdjtcbiAgICAgICAgICBob3VyLmhoID0gdjtcbiAgICAgICAgICBob3VyLmEgPSBcIkFNXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaG91ci5oID0gdjtcbiAgICAgICAgICBob3VyLmEgPSBhO1xuICAgICAgICAgIGlmIChhID09IFwiQU1cIikge1xuICAgICAgICAgICAgaG91ci5oaCA9IHY7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIuaGggPSAxMiArIHY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBob3VyO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TW9udGgoKSB7XG4gICAgICB2YXIgdjogYW55ID0gaW5zdC5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJNTU1NXCIsIGZvcm1hdCwgdmFsdWUsIFwiblwiLCBmYWxzZSk7XG4gICAgICBpZiAodiA9PSBmYWxzZSkge1xuICAgICAgICB2ID0gaW5zdC5nZXRWYWx1ZUZyb21Gb3JtYXQoXCJNTU1cIiwgZm9ybWF0LCB2YWx1ZSwgXCJuXCIsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYgPT0gZmFsc2UpIHtcbiAgICAgICAgdiA9IGluc3QuZ2V0VmFsdWVGcm9tRm9ybWF0KFwiTU1cIiwgZm9ybWF0LCB2YWx1ZSwgXCJuXCIsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYgPT0gZmFsc2UpIHtcbiAgICAgICAgdiA9IGluc3QuZ2V0VmFsdWVGcm9tRm9ybWF0KFwiTVwiLCBmb3JtYXQsIHZhbHVlLCBcIm5cIiwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdjtcbiAgICB9XG5cblxuXG5cblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgZ2V0VmFsdWVGcm9tRm9ybWF0KGtleTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbW9kZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IFwiXCIpIHtcbiAgICB2YXIgZm9ybWF0S2V5U3RhcnQgPSBmb3JtYXQuaW5kZXhPZihrZXkpO1xuICAgIGlmIChmb3JtYXRLZXlTdGFydCA+PSAwKSB7XG4gICAgICB2YXIgZm9ybWF0S2V5RW5kID0gZm9ybWF0S2V5U3RhcnQgKyBrZXkubGVuZ3RoO1xuICAgICAgaWYgKGtleSA9PSBcIk1NTU1cIikge1xuICAgICAgICBmb3JtYXRLZXlFbmQgPSBmb3JtYXRLZXlTdGFydCArIDk7XG4gICAgICB9IGVsc2UgaWYgKC9BfGEvLnRlc3Qoa2V5KSA9PSB0cnVlKSB7XG4gICAgICAgIGZvcm1hdEtleUVuZCA9IGZvcm1hdEtleVN0YXJ0ICsgMjtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbDogYW55ID0gdmFsdWUuc3Vic3RyaW5nKGZvcm1hdEtleVN0YXJ0LCBmb3JtYXRLZXlFbmQpO1xuXG4gICAgICBpZiAoL01NTU18TU1NLy50ZXN0KGtleSkgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgbW9udGhzID0gdGhpcy5nZXRPcHRpb25zKCkubW9udGhzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vbnRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChrZXkgPT0gXCJNTU1NXCIpIHtcbiAgICAgICAgICAgIGlmICh2YWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1vbnRoc1tpXS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIHZhbCA9IGkgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PSBcIk1NTVwiKSB7XG4gICAgICAgICAgICBpZiAodmFsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihtb250aHNbaV0udG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoMCwgMykpID49IDApIHtcbiAgICAgICAgICAgICAgdmFsID0gaSArIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobW9kZSA9PSBcIm5cIikge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gXCJsY1wiKSB7XG4gICAgICAgIHJldHVybiB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSBcInVjXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHZhciBpbnN0ID0gdGhpcztcblxuXG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cImNvbXBvbmVudC1jb250YWluZXJcIj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtjbGFzc109XCJnZXRPcHRpb25zKCk/LmNsYXNzZXM/LmlucHV0XCIgI2lucHV0IFt2YWx1ZV09XCJnZXRJbnB1dERhdGUoKVwiIChmb2N1cyk9XCJzaG93PXRydWVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb21wb25lbnQtYWJzb2x1dGUge3tnZXRPcHRpb25zKCk/LmNsYXNzZXM/LmNvbnRhaW5lcn19XCIgW3N0eWxlLmRpc3BsYXldPVwic2hvdz09dHJ1ZSA/ICdibG9jaycgOiAnbm9uZSdcIiAjY2FsZW5kYXIgW3N0eWxlLndpZHRoXT1cImdldE9wdGlvbnMoKT8uc3R5bGVzPy5jb250YWluZXI/LndpZHRoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtcGlja2VyXCIgW3N0eWxlLmRpc3BsYXldPVwic2hvd0RhdGVwaWNrZXI9PXRydWUgPyAnYmxvY2snIDogJ25vbmUnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwicHJldk1vbnRoKClcIj57e2dldE9wdGlvbnMoKT8uaWNvbnM/LmxlZnR9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwib3Blbk1vbnRocGlja2VyKClcIj57e2dldERhdGVMYWJlbCgpfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cIm5leHRNb250aCgpXCI+e3tnZXRPcHRpb25zKCk/Lmljb25zPy5yaWdodH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkYXRlcGlja2VyLXdlZWtzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCB3ZWVrIG9mIGdldE9wdGlvbnMoKT8ud2Vla3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48c3Bhbj57e3dlZWsuc3Vic3RyKDAsMyl9fTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRhdGVwaWNrZXItZGF5c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZCBvZiBnZXRNb250aERhdGVzKCk7bGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IChjbGljayk9XCJzZXREYXRlKGQuZGF0ZSlcIiBbc3R5bGUuYmFja2dyb3VuZF09XCJkLmN1cnJlbnQgPT0gZmFsc2UgPyAnI2RkZCcgOiAnJ1wiIGNsYXNzPVwie3soZC5kYXRlLmRhdGU9PSBkYXRlLmRhdGUgJiYgZC5kYXRlLm1vbnRoID09IGRhdGUubW9udGgpID8gJ2FjdGl2ZScgOiAnJ319XCI+PHNwYW4+e3tkLmRhdGUuZGF0ZX19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZm9vdGVyXCIgKm5nSWY9XCJkYXRlLmhhc1RpbWVcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRlcGlja2VyLWJ0blwiIChjbGljayk9XCJvcGVuVGltZXBpY2tlcigpXCI+UGljayBUaW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vbnRoLXBpY2tlclwiIFtzdHlsZS5kaXNwbGF5XT1cInNob3dNb250aHBpY2tlcj09dHJ1ZSA/ICdibG9jaycgOiAnbm9uZSdcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IChjbGljayk9XCJvcGVuWWVhcnBpY2tlcigpXCI+e3tnZXRZZWFyTGFiZWwoKX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkYXRlcGlja2VyLW1vbnRoc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbW9udGggb2YgZ2V0T3B0aW9ucygpPy5tb250aHM7bGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJzZXRNb250aChpKzEpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ7e2k9PSBkYXRlLm1vbnRoID8gJ2FjdGl2ZScgOiAnJ319XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e21vbnRofX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vbnRoLXBpY2tlclwiIFtzdHlsZS5kaXNwbGF5XT1cInNob3dZZWFycGlja2VyPT10cnVlID8gJ2Jsb2NrJyA6ICdub25lJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInNldFByZXZZZWFyUmFuZ2UoKVwiPnt7Z2V0T3B0aW9ucygpPy5pY29ucz8ubGVmdH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt7Z2V0WWVhckxhYmVsKCl9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwic2V0TmV4dFllYXJSYW5nZSgpXCI+e3tnZXRPcHRpb25zKCk/Lmljb25zPy5yaWdodH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkYXRlcGlja2VyLW1vbnRoc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgeSBvZiBnZXRZZWFyc1JhbmdlKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInt7eT09IGRhdGUueWVhciA/ICdhY3RpdmUnIDogJyd9fVwiIChjbGljayk9XCJzZXRZZWFyKHkpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3l9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXBpY2tlclwiIFtzdHlsZS5kaXNwbGF5XT1cInNob3dUaW1lcGlja2VyPT10cnVlID8gJ2Jsb2NrJyA6ICdub25lJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZXBpY2tlci1pbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZXBpY2tlci1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJuZXh0SG91cigpXCI+e3tnZXRPcHRpb25zKCk/Lmljb25zPy51cH19PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cIm9wZW5Ib3VycGlja2VyKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0ZS5ob3VyLmh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInByZXZIb3VyKClcIj57e2dldE9wdGlvbnMoKT8uaWNvbnM/LmRvd259fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lcGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm5leHRNaW51dGUoKVwiPnt7Z2V0T3B0aW9ucygpPy5pY29ucz8udXB9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5NaW51dGVwaWNrZXIoKVwiPnt7ZGF0ZS5taW51dGVzfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJwcmV2TWludXRlKClcIj57e2dldE9wdGlvbnMoKT8uaWNvbnM/LmRvd259fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lcGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInRvZ2dsZUFtUG0oKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tkYXRlLmhvdXIuYX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGF0ZXBpY2tlci1idG5cIiAoY2xpY2spPVwib3BlbkRhdGVwaWNrZXIoKVwiPlBpY2sgRGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJob3VyLXBpY2tlclwiIFtzdHlsZS5kaXNwbGF5XT1cInNob3dIb3VycGlja2VyPT10cnVlID8gJ2Jsb2NrJyA6ICdub25lJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkYXRlcGlja2VyLWhvdXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBoIG9mIGdldEFycmF5T2YoMTIpO2xldCBpPWluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInNldEhvdXJzKGkrMSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7aSsxfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXItcGlja2VyXCIgW3N0eWxlLmRpc3BsYXldPVwic2hvd01pbnV0ZXBpY2tlcj09dHJ1ZSA/ICdibG9jaycgOiAnbm9uZSdcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZGF0ZXBpY2tlci1taW51dGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBtIG9mIGdldEFycmF5T2YoNjApO2xldCBpPWluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInNldE1pbnV0ZXMoaSsxKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tpKzF9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+Il19