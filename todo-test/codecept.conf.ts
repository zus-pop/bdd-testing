import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
import "dotenv/config";
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
    tests: "./features/*.feature",
    output: "./output",
    helpers: {
        WebDriver: {
            url: "http://localhost:5173",
            browser: "chrome",
        },
    },
    include: {
        I: "./steps_file.ts",
    },
    gherkin: {
        features: "./features/*.feature",
        steps: "./step_definitions/step.ts",
    },
    name: "todo-test",
};
