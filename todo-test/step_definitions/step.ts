const { I } = inject();
const s = 1;

Given("I am on the Todo List page", async () => {
    I.amOnPage("/");
    I.see("Todo List", "h1");
    I.wait(s);
});

When("I enter {string} in the new todo input", async (item: string) => {
    I.fillField("#new-todo", item);
    I.wait(s);
});

When("I click the {string} button", async (buttonText: string) => {
    I.click(buttonText);
    I.wait(s);
});

Then("{string} should be added to the todo list", async (item: string) => {
    I.see(item, "ul");
    I.wait(s);
});

Given("there is a todo item {string} in the list", async (item: string) => {
    I.fillField("#new-todo", item);
    I.wait(s);
    I.click("Add Todo");
    I.wait(s);
});

When("I click the checkbox next to {string}", async (item: string) => {
    I.click(`//li[contains(., "${item}")]/input[@type="checkbox"]`);
    I.wait(s);
});

Then("{string} should be marked as completed", async (item: string) => {
    I.seeElement(
        `//li[contains(., "${item}") and contains(@class, "line-through")]`
    );
    I.wait(s);
});

When(
    "I click the {string} button for {string}",
    async (action: string, item: string) => {
        I.click(`//li[contains(., "${item}")]//button[text()="${action}"]`);
        I.wait(s);
    }
);

When("I change the text to {string}", async (newText: string) => {
    I.fillField('//*[@id="new-todo"]', newText);
    I.wait(s);
});

Then(
    "the todo item should be updated to {string}",
    async (updatedItem: string) => {
        I.see(updatedItem, "ul");
        I.dontSee("Buy groceries", "ul");
        I.wait(s);
    }
);

Then("{string} should be removed from the todo list", async (item: string) => {
    I.dontSee(item, "ul");
    I.wait(s);
});

Given("there are multiple todo items in the list", async (table: any) => {
    for (const id in table.rows) {
        if (+id < 1) continue;

        const cell = table.rows[id].cells;
        const item = cell[0].value;

        I.fillField("#new-todo", item);
        I.click("Add Todo");
    }
});

Then("I should see {int} todo items in the list", async (count: number) => {
    I.seeElement("ul");
    I.seeNumberOfElements("ul li", count);
    I.wait(s);
});
