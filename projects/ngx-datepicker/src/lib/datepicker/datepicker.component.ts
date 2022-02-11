import { AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Options } from '../ngx-datepicker.module';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  constructor(
    private eRef: ElementRef
  ) { }


  show: boolean = false;
  showDatepicker: boolean = true;
  showTimepicker: boolean = false;
  showHourpicker: boolean = false;
  showMinutepicker: boolean = false;
  showSecondpicker: boolean = false;
  showMonthpicker: boolean = false;
  showYearpicker: boolean = false;


  defaultOptions: Options = {
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

  date: any = this.formatDateStringToObject("YYYY-MM-DD", new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate());
  startYear: number = this.date.year;


  get value() {
    return this.formatDateObjectToString(this.date, this.getOptions()?.formats?.output);
  }

  set value(value: string) {
    this.date = this.formatDateStringToObject(this.getOptions()?.formats?.input, value);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.show = true;
    } else {
      this.show = false;
      this.hidePickers();
      this.showDatepicker = true;
    }
  }

  @Input("options") options: Options = {};
  @ViewChild("calendar") calendar!: ElementRef;
  @ViewChild("input") input!: ElementRef;

  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (value !== null) {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
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
    } else {
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
    } else {
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
    } else {
      this.date.year++;
      this.date.month = 1;
    }
  }

  prevMonth() {
    if (this.date.month > 0) {
      this.date.month--;
    } else {
      this.date.year--;
      this.date.month = 12;
    }
  }

  getArrayOf(size: number) {
    return new Array(size);
  }

  titleCase(str: string) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  prefixZero(n: number) {
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

  setYear(y: number) {
    this.date.year = y;
    this.hidePickers();
    this.showDatepicker = true;
  }

  setDate(d: any) {
    var inst = this;
    this.date = d;
    this.updateValue();
    setTimeout(function () {
      inst.show = false;
    }, 50);
  }

  setMonth(m: number) {
    this.date.month = m;
    this.hidePickers();
    this.showYearpicker = true;
  }

  setHours(h: number) {

    this.date.hour.h = Number(h);
    this.setHour24();
    this.updateValue();
    this.hidePickers();
    this.showTimepicker = true;
  }

  setMinutes(m: number) {
    this.date.minutes = m;
    this.hidePickers();
    this.updateValue();
    this.showTimepicker = true;
  }


  setHour24() {
    this.date.hour.hh = this.date.hour.h;
    if (this.date.hour.a == "PM" && this.date.hour.h < 12) {
      this.date.hour.hh = this.date.hour.h + 12
    }

    if (this.date.hour.a == "AM" && this.date.hour.h == 12) {
      this.date.hour.hh = this.date.hour.h - 12
    }

    this.date.hour.hh = this.prefixZero(this.date.hour.hh);
    console.log(this.date.hour.hh);

  }

  nextHour() {
    if (this.date.hour.h < 12) {
      this.date.hour.h++;
    } else {
      this.date.hour.h = 1;
    }
    this.setHour24();
    this.updateValue();
  }

  prevHour() {
    if (this.date.hour.h > 1) {
      this.date.hour.h--;
    } else {
      this.date.hour.h = 12;
    }
    this.setHour24();
    this.updateValue();
  }

  nextMinute() {
    if (this.date.minutes < 59) {
      this.date.minutes++;
    } else {
      this.date.minutes = 0;
    }
  }

  prevMinute() {
    if (this.date.minutes < 0) {
      this.date.minutes--;
    } else {
      this.date.minutes = 59;
    }
  }


  toggleAmPm() {
    this.date.hour.a = this.date.hour.a == "AM" ? "PM" : "AM";
    this.setHour24();
    this.updateValue();
  }


  formatDateObjectToString(date: any, format: string) {
    var months = this.getOptions().months;
    var replaceObj: any = {
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

  formatDateStringToObject(format: string, value: string) {
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

      var v: any = inst.getValueFromFormat("HH", format, value, "n", false);
      if (v == false) {
        v = inst.getValueFromFormat("H", format, value, "n", false);
      }

      if (v !== false) {
        hour.hh = v;
        if (v >= 12) {
          hour.h = v - 12;
          hour.a = "PM";
        } else {
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
        } else {
          hour.h = v;
          hour.a = a;
          if (a == "AM") {
            hour.hh = v;
          } else {
            hour.hh = 12 + v;
          }
        }
      }

      return hour;

    }

    function getMonth() {
      var v: any = inst.getValueFromFormat("MMMM", format, value, "n", false);
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

  getValueFromFormat(key: string, format: string, value: string, mode: string, defaultValue: any = "") {
    var formatKeyStart = format.indexOf(key);
    if (formatKeyStart >= 0) {
      var formatKeyEnd = formatKeyStart + key.length;
      if (key == "MMMM") {
        formatKeyEnd = formatKeyStart + 9;
      } else if (/A|a/.test(key) == true) {
        formatKeyEnd = formatKeyStart + 2;
      }

      var val: any = value.substring(formatKeyStart, formatKeyEnd);

      if (/MMMM|MMM/.test(key) == true) {
        var months = this.getOptions().months;
        for (var i = 0; i < months.length; i++) {
          if (key == "MMMM") {
            if (val.toLowerCase().indexOf(months[i].toLowerCase()) >= 0) {
              val = i + 1;
              break;
            }
          } else if (key == "MMM") {
            if (val.toLowerCase().indexOf(months[i].toLowerCase().substring(0, 3)) >= 0) {
              val = i + 1;
              break;
            }
          }
        }
      }

      if (mode == "n") {
        return Number(val);
      } else if (mode == "lc") {
        return val.toLowerCase();
      } else if (mode == "uc") {
        return val.toUpperCase();
      } else {
        return val;
      }
    } else {
      return defaultValue;
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var inst = this;


  }

}
