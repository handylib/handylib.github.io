import * as i0 from "@angular/core";
import * as i1 from "./datepicker/datepicker.component";
import * as i2 from "@angular/common";
export declare class NgxDatepickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDatepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxDatepickerModule, [typeof i1.DatepickerComponent], [typeof i2.CommonModule], [typeof i1.DatepickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxDatepickerModule>;
}
export declare type Options = {
    mode?: any;
    classes?: {
        container?: any;
        input?: any;
    };
    styles?: {
        container?: {
            width?: any;
        };
    };
    icons?: {
        left?: any;
        right?: any;
        up?: any;
        down?: any;
    };
    formats?: {
        preview?: any;
        input?: any;
        output?: any;
    };
    weeks?: any;
    months?: any;
};
