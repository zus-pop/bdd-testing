Feature: Todo List CRUD Operations
  As a user
  I want to create, update, delete, see and mark as completed the todo item
  So that I can be able to manage my todo list

  Scenario: Add a new todo item
    Given I am on the Todo List page
    When I enter "Buy groceries" in the new todo input
    And I click the "Add Todo" button
    Then "Buy groceries" should be added to the todo list

  Scenario: Mark a todo item as completed
    Given I am on the Todo List page
    And there is a todo item "Buy groceries" in the list
    When I click the checkbox next to "Buy groceries"
    Then "Buy groceries" should be marked as completed

  Scenario: Edit an existing todo item
    Given I am on the Todo List page
    And there is a todo item "Buy groceries" in the list
    When I click the "Edit" button for "Buy groceries"
    And I change the text to "Buy organic groceries"
    And I click the "Update Todo" button
    Then the todo item should be updated to "Buy organic groceries"

  Scenario: Delete a todo item
    Given I am on the Todo List page
    And there is a todo item "Buy groceries" in the list
    And there is a todo item "Go to sleep" in the list
    And there is a todo item "Feed the dog" in the list
    And there is a todo item "Take a shower" in the list
    When I click the "Delete" button for "Buy groceries"
    Then "Buy groceries" should be removed from the todo list

  Scenario: View all todo items
    Given I am on the Todo List page
    And there are multiple todo items in the list
      | item            |
      | Buy groceries   |
      | Clean the house |
      | Walk the dog    |
    Then I should see 3 todo items in the list