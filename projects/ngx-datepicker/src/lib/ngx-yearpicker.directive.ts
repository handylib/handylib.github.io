import { AfterViewInit, Directive, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgxDatepickerService } from './ngx-datepicker.service';

@Directive({
  selector: '[yearpicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxYearpickerDirective),
      multi: true
    }]
})
export class NgxYearpickerDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  constructor(
    private cRef: ViewContainerRef,
    private eRef: ElementRef,
    private Service: NgxDatepickerService
  ) { }


  component: any;
  initiated: boolean = false;

  ngOnDestroy(): void {

  }



  ngAfterViewInit(): void {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "year";
    inst.component.instance.config.view = "yearpicker";
    inst.component.instance.onApply = function (value: string) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    }
    inst.component.changeDetectorRef.detectChanges();
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

  @Input("format") format: string = "YYYY";

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
