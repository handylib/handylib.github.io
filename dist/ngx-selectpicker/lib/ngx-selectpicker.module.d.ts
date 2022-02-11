import * as i0 from "@angular/core";
import * as i1 from "./selectpicker/selectpicker.component";
import * as i2 from "@angular/common";
export declare class NgxSelectpickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSelectpickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxSelectpickerModule, [typeof i1.SelectpickerComponent], [typeof i2.CommonModule], [typeof i1.SelectpickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxSelectpickerModule>;
}
export declare type Options = {
    classes?: {
        input?: {
            focus?: string;
            blur?: string;
            common?: string;
        };
        container?: {
            common?: string;
        };
        searchInput?: {
            focus?: string;
            blur?: string;
            common?: string;
        };
    };
    styles?: {
        container?: {
            padding?: any;
            width?: any;
            maxWidth?: any;
        };
    };
    search?: boolean;
    searchThreshold?: number;
    searching?: boolean;
    searchPlaceholder?: string;
    searchDisableInput?: boolean;
};
export declare type SelectPickerItems = Array<{
    id?: any;
    label?: string;
    selected?: boolean;
    data?: any;
}>;
