import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';


 type DittoDateType = {
  date: number,
        formated: string,
        disabled : boolean
 };

@Component({
  selector: 'ditto',
  templateUrl: './ditto.component.html',
  styleUrls: ['./ditto.component.css'],
})
export class DittoComponent implements OnInit, AfterViewInit {

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  
  showErrors : boolean = false;
  show: boolean = false;
  @ViewChild("container") container !: ElementRef;
  @Input("element") element !: ElementRef;
  @Input("format") format: string = "YYYY-MM-DD HH:mm:ss";


  @Input('picker') picker : 'date' | 'time' | 'datetime' | 'duration' | 'month' | 'year' = 'date';
  @Input('view') view : 'date' | 'time' | 'datetime' | 'duration' | 'month' | 'year' | 'hour' | 'minute' | 'hours' | 'minutes' | 'seconds' = 'date';
  @Input('hours') hours : boolean = true;
  @Input('minutes') minutes : boolean = true;
  @Input('seconds') seconds : boolean = true;
  @Input('disableBackDateTime') disableBackDateTime : boolean = false;
  @Input('disableFutureDateTime') disableFutureDateTime : boolean = false;
  @Input('backDateTime') backDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  @Input('futureDateTime') futureDateTime = moment().format('YYYY-MM-DD HH:mm:ss');


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

  _value: string = "";

  get value() {
    return this._value;
  }

  set value(value: string) {
    if (value !== "" && value !== null && typeof value !== "undefined" && this.format !== "") {
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
    var dates : DittoDateType[] = [];
    var a = moment(this.value, this.format).startOf('month').format('YYYY-MM-DD');
    var b = moment(this.value, this.format).endOf('month').format('YYYY-MM-DD');

    for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
      var date : DittoDateType = {
        date: Number(m.format('D')),
        formated: m.format("YYYY-MM-DD"),
        disabled : false
      };
      if(this.disableBackDateTime  == true){
        if(moment(date.formated,'YYYY-MM-DD').isBefore(moment(this.backDateTime,this.format))){
          date.disabled =true;
        }
      }

      if(this.disableFutureDateTime  == true){
        if(moment(date.formated,'YYYY-MM-DD').isAfter(moment(this.futureDateTime,this.format))){
          date.disabled =true;
        }
      }
    

      dates.push(date);
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
    var date = moment(this.value, this.format).format("YYYY-MM-DD LT");
    date = date.replace("AM", value).replace("PM", value);
    this.value = moment(date, "YYYY-MM-DD LT").format(this.format);
  }


  setDate(d : DittoDateType) {
    if(!d.disabled){
      this.value = moment(this.value, this.format).set("D", d.date).format(this.format);

      if(this.picker == 'datetime'){
        this.view = 'hour';
      }else{
        this.view = 'date';
      }
    }

  }

  setMonth(m: number) {
    if(!this.isMonthDisabled(m)){
      this.value = moment(this.value, this.format).set("M", m).format(this.format);
      if(this.picker == 'datetime' || this.picker == 'date'){
        this.view = 'date'
      }else{
        this.view = 'month';
      }
    }

  }

  setYear(y: number) {
    if(!this.isYearDisabled(y)){
      this.value = moment(this.value, this.format).set("year", y).format(this.format);
      if(this.picker == 'datetime' || this.picker == 'date'){
        this.view = 'month'
      }else{
        this.view = 'year';
      }
    }

  }

  setHour(h: number) {
    this.value = moment(this.value, this.format).set("h", h).format(this.format);
      if(this.picker == 'datetime' || this.picker == 'time'){
        this.view = 'minute';
      }
  }

  setMinute(value: number) {
    this.value = moment(this.value, this.format).set("m", value).format(this.format);
    if (this.picker == "time") {
      this.config.timepicker = "";
    } else {
      this.view = "date";
    }
  }


  setDurationHours(value: number) {
    this.duration.hours = value;

    if(this.minutes){
      this.view = 'minutes';
    }else if(this.seconds){
      this.view = 'seconds';
    }
  }

  setDurationMinutes(value: number) {
    this.duration.minutes = value;

 if(this.seconds){
      this.view = 'seconds';
    }

  }


  setDurationSeconds(value: number) {
    this.duration.seconds = value ;
  }

  apply() {
    if(this.picker == 'duration'){

     var durations : string[] = [];

      if(this.hours){
        durations.push(this.padint(this.duration.hours));
      }

      if(this.minutes){
        durations.push(this.padint(this.duration.minutes));
      }

      if(this.seconds){
        durations.push(this.padint(this.duration.seconds));
      }


      this.onApply(durations.join(':'));
    }else{

      var m = moment(this.value,this.format);

      if(this.isMomentDisabled(m)){
        this.showErrors = true;
        setTimeout(()=>{this.showErrors = false;},1500);
        return;
      }

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


getDisableMaskLabel() : {
  label : string,
  range : string
}{
  var mid = '';
  if(this.picker == 'datetime'){
    mid = 'date and time';
  }else if(this.picker == 'date'){
    mid = 'date';
  }else if(this.picker == 'time'){
    mid = 'time';
  }else if(this.picker == 'month'){
    mid = 'month';
  }else if(this.picker == 'year'){
    mid = 'year';
  }

  if(this.disableBackDateTime && this.disableFutureDateTime){
    return {
      label : "Please select "+mid+" between ",
      range : `${moment(this.backDateTime,this.format).format(this.format)} - ${moment(this.futureDateTime,this.format).format(this.format)}`
    };
  }

  if(this.disableBackDateTime){
    return {
      label : "Please select a "+mid+" after ",
      range : `${moment(this.backDateTime,this.format).format(this.format)}`
    };
  }

  if(this.disableFutureDateTime){
    return {
      label : "Please select a "+mid+" before ",
      range : `${moment(this.futureDateTime,this.format).format(this.format)}`
    };
  }

  return {
    label : "",
    range : ""
  };
}



  isMonthDisabled(m:number) : boolean {
      var date = moment(this.value, this.format).set("M", m);
      return this.isMomentDisabled(date);
  }


  allYearRangeDisabled(){
    if(!this.disableBackDateTime && !this.disableFutureDateTime){
        return false;
    }
    for(var year of this.getYearsRange()){
      if(!this.isYearDisabled(year)){
        return false;
      }
    }
    return true;
  }


  allMonthsDisabled(){
    if(!this.disableBackDateTime && !this.disableFutureDateTime){
      return false;
  }
  var m = 0;
  for(var month of this.config.months){
    if(!this.isMonthDisabled(m)){
      return false;
    }
    m++;
  }
  return true;
  }

  isYearDisabled(y:number) : boolean{
    var date = moment(this.value, this.format).set("year", y);
    return this.isMomentDisabled(date,'year');
  }


  isMomentDisabled(m : moment.Moment, mode : 'year' | 'month' | 'hour' | 'none' = 'none') : boolean{
    if(this.disableBackDateTime){

      if(mode == 'year'){
        if(Number(m.format('YYYY')) < Number(moment(this.backDateTime,this.format).format('YYYY'))){
          return true;
        }
      }else  if(m.isBefore(moment(this.backDateTime,this.format))){
        return true;
      }
    }

    if(this.disableFutureDateTime){

      if(mode == 'year'){
        if(Number(m.format('YYYY')) > Number(moment(this.futureDateTime,this.format).format('YYYY'))){
          return true;
        }
      }else if(m.isAfter(moment(this.futureDateTime,this.format))){
        return true;
      }
    }
    return false;
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
