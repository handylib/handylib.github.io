import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';


import { defaultConfig } from './default.config';

@Component({
  selector: 'datetimepicker',
  templateUrl: "./datetimepicker.component.html",
  styleUrls: ["./datetimepicker.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true
    }
  ]
})
export class DatetimepickerComponent implements OnInit, ControlValueAccessor {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }


  private onTouchedCallback: (_: any) => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (moment(value, this.config.outputFormat).isValid()) {
      this.value = moment(value, this.config.outputFormat).format(this.config.outputFormat);
      this.inputValue = moment(value, this.config.outputFormat).format(this.config.outputFormat);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  @Input("options") options: any;




  defaultConfig: any = defaultConfig;


  get config() {
    for (var key in this.options) {
      this.defaultConfig[key] = this.options[key];
    }
    return this.defaultConfig;
  }


  get value() {
    return this.innerValue;
  }

  set value(value: string) {
    this.innerValue = value;
  }

  inputValue: string = moment().format(this.config.outputFormat);
  innerValue: string = moment().format(this.config.outputFormat);

  weekNames: any = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames: any = moment.months();
  dayNames: any = this.getSelectedMonthDays();

  getInputDatetime() {
    return moment(this.inputValue, this.config.outputFormat).format(this.config.inputFormat);
  }

  getOutputDatetime() {
    return moment(this.value, this.config.outputFormat).format(this.config.outputFormat);
  }

  openDropdown() {

    this.defaultConfig.openDropdown = true;
  }

  closeDropdown() {
    this.value = moment(this.inputValue, this.config.outputFormat).format(this.config.outputFormat);
    this.defaultConfig.openDropdown = false;
    this.dayNames = this.getSelectedMonthDays();
  }

  getWeekNames(letters: number) {
    return this.weekNames.map(function (week: string) {
      return week.substr(0, letters);
    });
  }



  getSelectedMonthDays() {
    var days = [];
    for (var i = 1; i <= moment(this.value, this.config.outputFormat).daysInMonth(); i++) {
      days.push({
        day: i,
        current: moment(this.value, this.config.outputFormat).set("date", i).isSame(moment(this.inputValue, this.config.outputFormat))
      });
    }
    return days;
  }

  getDatepickerLabel() {
    return moment(this.value, this.config.outputFormat).format("MMMM, YYYY");
  }


  onDateSelect(date: number) {
    this.value = moment(this.value, this.config.outputFormat).set("date", date).format(this.config.outputFormat);

    if (this.config.showTimepicker == false) {
      this.finalSelect();
    } else {
      for (var i = 1; i < this.dayNames.length; i++) {
        if (Number(this.dayNames[i].day) === Number(date)) {
          this.dayNames[i].current = true;
        } else {
          this.dayNames[i].current = false;
        }
      }
    }



  }


  nextMonth() {
    this.value = moment(this.value).add(1, "month").format(this.config.outputFormat);
    this.dayNames = this.getSelectedMonthDays();
  }

  prevMonth() {
    this.value = moment(this.value).add(-1, "month").format(this.config.outputFormat);
    this.dayNames = this.getSelectedMonthDays();
  }


  increase(type: any) {
    this.value = moment(this.value, this.config.outputFormat).add(1, type).format(this.config.outputFormat);
  }

  decrease(type: any) {
    this.value = moment(this.value, this.config.outputFormat).add(-1, type).format(this.config.outputFormat);
  }

  toggleAmPm() {
    var datetime = moment(this.value, this.config.outputFormat).format("YYYY-MM-DD hh:mm A");
    var ampm = moment(this.value, this.config.outputFormat).format("A");
    ampm = ampm == "AM" ? "PM" : "AM";
    datetime = datetime.replace("AM", ampm).replace("PM", ampm);
    this.value = moment(datetime, "YYYY-MM-DD hh:mm A").format(this.config.outputFormat);
  }

  getDateFormated(format: string) {
    return moment(this.value, this.config.outputFormat).format(format);
  }


  trackByFn(index: number, item: any) {
    return item;
  }



  finalSelect() {
    this.inputValue = moment(this.value, this.config.outputFormat).format(this.config.outputFormat);
    this.onChangeCallback(this.inputValue);
    this.onTouchedCallback(this.inputValue);
    this.closeDropdown();
  }



  ngOnInit(): void {
    var inst = this;
    this.renderer.listen('window', 'click', function (e: any) {
      if (!inst.elementRef.nativeElement.contains(e.target)) {
        inst.closeDropdown();
      }
    });
  }

}
