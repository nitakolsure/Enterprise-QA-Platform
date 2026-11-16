
Feature: Demoblaze add to cart

  @addToCart
  Scenario: Logged in user can add a product to cart
    Given user is logged in successfully
    Then verify user is able to add to cart
