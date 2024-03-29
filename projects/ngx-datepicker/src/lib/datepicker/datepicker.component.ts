import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }


  show: boolean = false;
  @ViewChild("container") container !: ElementRef;
  @Input("element") element !: ElementRef;
  @Input("format") format: string = "YYYY-MM-DD HH:mm:ss";
  @Input('disableBackSelection')

  duration : {
    hours : number,
    minutes : number,
    seconds : number
  } = {
    hours : 0,
    minutes : 0,
    seconds : 0
  };

  config = {
    mode: "datetime",//time, datetime,date,duration
    view: "datepicker", //datepicker, timepicker, monthpicker,yearpicker , durationpicker
    timepicker: '', //hour , minute
    durationpicker : 'hours', //hours , minutes , seconds
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

  _value: string = "";

  get value() {
    return this._value;
  }

  set value(value: string) {
    if (value !== "" && value !== null && typeof value !== "undefined") {
      if (moment(value, this.format).isValid()) {
        this._value = value;
      } else {
        console.log("Invalid date");
      }
    }
  }

  onApply: any = (_v: string) => { }


  trackBy(n: number) {
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





  getArrayOf(n: number) {
    return new Array(n);
  }

  titleCase(str: string) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  prefixZero(n: number) {
    return ('0' + n).slice(-2);
  }

  limitChar(str: string, n: number) {
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

      inst.config.position.x = (window.innerWidth - containerRect.width) / 2;
      inst.config.position.y = (window.innerHeight - containerRect.height) / 2;

    } else if (window.innerWidth <= directiveRect.width + containerRect.width + directiveRect.x) {
      inst.config.position.y = directiveRect.y + directiveRect.height;
      inst.config.position.x = ((directiveRect.x - containerRect.width) + directiveRect.width);
    } else {
      inst.config.position.x = directiveRect.x;
      inst.config.position.y = directiveRect.y + directiveRect.height;
    }

    inst.cdRef.detectChanges();
    return {
      container: containerRect,
      directive: directiveRect
    };
  }



  getFormated(format: string) {
    return moment(this.value, this.format).format(format);
  }

  isCurrent(value: any, mode: string) {

    if (mode == "hour") {
      if (value == moment(this.value, this.format).format("h")) {
        return true;
      }
    } else if (mode == "minute") {
      if (value == moment(this.value, this.format).format("m")) {
        return true;
      }
    } else if (mode == "ampm") {
      if (value.toLowerCase() == moment(this.value, this.format).format("A").toLowerCase()) {
        return true;
      }
    } else if (mode == "date") {
      if (value == moment(this.value, this.format).format("YYYY-MM-DD")) {
        return true;
      }
    } else if (mode == "month") {
      if (value.toString().toLowerCase() == moment(this.value, this.format).format("M").toLowerCase()) {
        return true;
      }
    } else if (mode == "year") {
      if (value.toString().toLowerCase() == moment(this.value, this.format).format("YYYY").toLowerCase()) {
        return true;
      }
    }

    return false;
  }


  setAmPm(value: string) {
    var date = moment(this.value, this.format).format("YYYY-MM-DD hh:mm:ss A");
    date = date.replace("AM", value).replace("PM", value);
    this.value = moment(date, "YYYY-MM-DD hh:mm:ss A").format(this.format);
  }


  setDate(value: any) {
    this.value = moment(this.value, this.format).set("D", value).format(this.format);
  }

  setMonth(value: number) {
    this.value = moment(this.value, this.format).set("M", value).format(this.format);
  }

  setYear(value: number) {
    this.value = moment(this.value, this.format).set("year", value).format(this.format);
  }

  setHour(value: number) {
    this.value = moment(this.value, this.format).set("h", value).format(this.format);
  }

  setMinute(value: number) {
    this.value = moment(this.value, this.format).set("m", value).format(this.format);
    if (this.config.mode == "time") {
      this.config.timepicker = "";
    } else {
      this.config.view = "datepicker";
    }
  }


  setDurationHours(value: number) {
    this.duration.hours = value;
  }

  setDurationMinutes(value: number) {
    this.duration.minutes = value;
  }


  setDurationSeconds(value: number) {
    this.duration.seconds = value ;
  }

  apply() {
    if(this.config.mode == 'duration'){
      this.onApply(`${this.padint(this.duration.hours)}:${this.padint(this.duration.minutes)}:${this.padint(this.duration.seconds)}`);
    }else{
      this.onApply(this.value);
    }
    this.closeDatePicker();
  }

   padint(n : number, w : number = 2) {
    let numberString = n.toString();
    let padding = Math.max(0, w - numberString.length);
    let paddedNumber = '0'.repeat(padding) + numberString;
    return paddedNumber;
}




  openDatePicker(event: any) {
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

  ngAfterViewInit(): void {
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

  ngOnInit(): void {
    var inst = this;
  }
}
