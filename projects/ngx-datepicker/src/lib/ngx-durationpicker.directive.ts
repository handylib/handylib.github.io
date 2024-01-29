import { AfterViewInit, Directive, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';

@Directive({
  selector: '[durationpicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxDurationpickerDirective),
      multi: true
    }]
})
export class NgxDurationpickerDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  constructor(
    private cRef: ViewContainerRef,
    private eRef: ElementRef,
  ) { }


  component: any;
  initiated: boolean = false;

  ngOnDestroy(): void {

  }



  ngAfterViewInit(): void {
    this.cRef.clear();
    this.component = this.cRef.createComponent(DatepickerComponent);
    this.initiated = true;
    this.component.instance.value = this.value;
    this.component.instance.element = this.eRef;
    this.component.instance.config.mode = "duration";
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
