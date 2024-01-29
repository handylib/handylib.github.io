import { AfterViewInit, ComponentRef, Directive, ElementRef, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DittoComponent } from './ditto/ditto.component';
import moment from 'moment';

@Directive({
  selector: '[ditto]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DittoDirective),
      multi: true
    }]
})
export class DittoDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {

  constructor(
    private cRef: ViewContainerRef,
    private eRef: ElementRef,
  ) { }


  @Input("format") format: string = "";
  @Input('picker') picker : 'date' | 'time' | 'datetime' | 'duration' | 'month' | 'year' = 'date';
  @Input('hours') hours : boolean = true;
  @Input('minutes') minutes : boolean = true;
  @Input('seconds') seconds : boolean = true;
  @Input('backDateTime') backDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  @Input('futureDateTime') futureDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  @Input('disableBackDateTime') disableBackDateTime : boolean = false;
  @Input('disableFutureDateTime') disableFutureDateTime : boolean = false;

  component!: ComponentRef<DittoComponent>;
  initiated: boolean = false;

  ngOnDestroy(): void {

  }

  setView(){
    if(this.initiated){
    

      if(this.picker == 'date' || this.picker == 'datetime'){
        this.component.instance.view = 'year';
      }else if(this.picker == 'time'){
        this.component.instance.view = 'hour';
      }


      if(this.picker == 'duration'){
        if(this.hours){
          this.component.instance.view = 'hours';
        }else   if(this.minutes){
          this.component.instance.view = 'minutes';
        }else   if(this.seconds){
          this.component.instance.view = 'seconds';
        }
      }


      if(this.picker == 'year'){
        this.component.instance.view = 'year';
      }


      if(this.picker == 'month'){
        this.component.instance.view = 'month';
      }

   

      this.component.instance.disableBackDateTime = this.disableBackDateTime;
      this.component.instance.disableFutureDateTime = this.disableFutureDateTime;
      this.component.instance.backDateTime = this.backDateTime;
      this.component.instance.futureDateTime  = this.futureDateTime;


    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.initiated){
      this.component.instance.hours = this.hours;
      this.component.instance.minutes = this.minutes;
      this.component.instance.seconds = this.seconds;
      this.setView();
    }
  }

  ngAfterViewInit(): void {

    if(this.format == ""){
      if(this.picker == 'datetime'){
        this.format = 'YYYY-MM-DD HH:mm:ss';
      }else if(this.picker == 'date'){
        this.format = 'YYYY-MM-DD';
      }else if(this.picker == 'time'){
        this.format = 'HH:mm:ss';
      }else if(this.picker == 'month'){
        this.format = 'MMMM';
      }else if(this.picker == 'year'){
        this.format = 'YYYY';
      }else if(this.picker == 'duration'){
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


    this.component.instance.onApply =  (value: string)=>{
      this.value = value;
      this.component.changeDetectorRef.detectChanges();
    }
    this.component.changeDetectorRef.detectChanges();
  }


  ngOnInit(): void {
  }


  _value: string = "";

  get value() {
    return this._value;
  }

  set value(value: string) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }


  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        if(this.picker == 'year' || this.picker == 'datetime' || this.picker == 'date'){
          this.component.instance.config.startYear = Number(moment(this._value,this.format).format('YYYY'));
        }
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }



}
