/// <reference types='codeceptjs' />
type steps_file = typeof import("./steps_file");

declare namespace CodeceptJS {
    interface SupportObject {
        I: I;
    }
    interface CallbackOrder {
        [0]: CodeceptJS.I;
    }
    interface Methods extends WebDriver {}
    interface I extends ReturnType<steps_file> {}
    namespace Translation {
        interface Actions {}
    }
}
