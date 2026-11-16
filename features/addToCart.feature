@cart @smoke
Feature: Add product to shopping cart
  As a registered customer of the Product Store
  I want to add a product to my shopping cart
  So that I can review the selected item before checkout

  Background:
    Given the Product Store application is launched
    And the customer is logged in with valid credentials

  @addToCart @regression
  Scenario: Logged-in customer adds a product from the catalog to the cart
    When the customer selects the "Phones" category
    And the customer opens the product details for "Samsung galaxy s6"
    Then the product details page should display "Samsung galaxy s6"
    When the customer adds the current product to the shopping cart
    Then the system should confirm that the product was added
    When the customer navigates to the shopping cart
    Then the shopping cart should contain "Samsung galaxy s6"

  @addToCart @regression
  Scenario: Logged-in customer adds products from two categories to the cart
    When the customer selects the "Phones" category
    And the customer opens the product details for "Samsung galaxy s6"
    Then the product details page should display "Samsung galaxy s6"
    When the customer adds the current product to the shopping cart
    Then the system should confirm that the product was added
    When the customer returns to the product catalog
    And the customer selects the "Laptops" category
    And the customer opens the product details for "Sony vaio i5"
    Then the product details page should display "Sony vaio i5"
    When the customer adds the current product to the shopping cart
    Then the system should confirm that the product was added
    When the customer navigates to the shopping cart
    Then the shopping cart should contain "Samsung galaxy s6"
    And the shopping cart should contain "Sony vaio i5"
