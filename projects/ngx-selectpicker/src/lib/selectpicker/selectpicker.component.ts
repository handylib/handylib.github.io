import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Options, SelectPickerItems } from '../ngx-selectpicker.module';


@Component({
  selector: 'selectpicker',
  templateUrl: './selectpicker.component.html',
  styleUrls: ['./selectpicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectpickerComponent),
      multi: true
    }
  ]
})
export class SelectpickerComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {

  constructor(
    private eRef: ElementRef
  ) { }


  show: boolean = false;
  focused: boolean = false;
  searchFocused: boolean = false;
  innerValue: any;
  innerData: any;

  defaultOptions: Options = {
    classes: {
      input: {
        focus: "border-2 border-primary",
        blur: "",
        common: "form-control"
      },
      searchInput: {
        focus: "",
        blur: "",
        common: "form-control"
      },
      container: {
        common: "card"
      }
    },
    styles: {
      container: {
        width: "100%",
        maxWidth: "300px"
      }
    },
    search: false,
    searchPlaceholder: "Search..",
    searchThreshold: 0,
    searching: false
  };





  getOptions() {
    return Object.assign({}, this.defaultOptions, this.options);
  }


  getItems() {
    return this.innerData;
  }


  get value() {
    return this.innerValue;
  }

  set value(value: any) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouched(value);
  }

  @Input("placeholder") placeholder: string = "Select an option";
  @Input("data") data: SelectPickerItems = [];
  @Input("options") options: Options = {};
  @ViewChild("container") container!: ElementRef;
  @ViewChild("input") input!: ElementRef;
  @Output("search") search = new EventEmitter<string>();


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.show = true;
      this.focused = true;
      this.searchFocused = true;
    } else {
      this.show = false;
      this.focused = false;
      this.searchFocused = false;
    }
  }


  setOutputValue(value: any, index: number) {
    var inst = this;
    this.value = value;
    setTimeout(function () {
      inst.show = false;
    }, 50);
  }

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
    this.onTouched = fn
  }


  handleSearch(event: any) {
    var options = this.getOptions();
    if (event.target.value.length == 0) {
      this.innerData = this.data;
    }
    if (options.search == true) {
      if (typeof options.searchThreshold !== "undefined") {
        if (event.target.value.length >= options.searchThreshold) {
          if (this.search.observed) {
            this.search.emit(event.target.value);
          } else {
            this.innerData = this.data.filter(function (item) {
              if (item?.label) {
                return item.label.indexOf(event.target.value) >= 0;
              }
              return false;
            });
          }
        }
      }
    }
  }


  getValueTitle() {
    for (var item of this.innerData) {
      if (item.id == this.value) {
        return item.label;
      }
    }
    return this.placeholder;
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var inst = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("data" in changes) {
      this.innerData = changes["data"].currentValue;
    }
  }


}
