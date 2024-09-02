const bunId = "643d69a5c3f7b9001cfa093c";
const bunName = "Краторная булка N-200i";
const mainIngredientId = "643d69a5c3f7b9001cfa0941";
const mainIngredientName = "Биокотлета из марсианской Магнолии";
const sauceName = "Соус Spicy-X";
const newBunName = "Флюоресцентная булка R2-D3";

const userLoginField = '[name="email"]';
const userPassField = '[name="password"]';
const userLoginButton = '[data-cy="login-button"]';
const userEmail = "Badabumka@Badabumka.ru";
const userPass = "Badabumka";

const modalClass = '[class^="modal_modal"]';
const modalOverlay = '[class^="modal-overlay_overlay"]';
const closeModal = '[data-cy^="close-modal"]';

const ingredientItemClass = "ingredient";
const orderNumber = '[data-cy^="order-number"]';
const burgerConstructor = '[data-cy="constructor"]';

describe("Application", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("/");
  });

  it("Авторизация", () => {
    cy.visit("/login");
    cy.get(userLoginField).type(userEmail);
    cy.get(userPassField).type(userPass);
    cy.get(userLoginButton).click();
  });

  it("Модальное окно ингредиента открывается и в нем содержится информация именно о выбранном ингредиенте", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${bunId}"]`).click();
    cy.get(modalClass).should("be.visible");
    cy.get('[data-cy^="ingredient-title"]').contains(bunName);
  });

  it("Модальное окно закрывается по кнопке Закрыть (крестик)", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.get(modalClass).should("be.visible");
    cy.get(closeModal).each(() => {
      cy.get(closeModal).first().click({ force: true });
    });
    cy.get(modalClass).should("not.exist");
  });

  it("Модальное окно закрывается при клике на подложку (любую часть экрана, не включающую зону модального окна)", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.get(modalClass).should("be.visible");
    cy.get(modalOverlay).each(() => {
      cy.get(modalOverlay).first().click({ force: true });
    });
    cy.get(modalClass).should("not.exist");
  });

  it("Модальное окно закрывается по нажатию клавиши Escape", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.get(modalClass).should("be.visible");
    cy.get("body").type("{esc}");
    cy.get(modalClass).should("not.exist");
  });

  it("Проверка добавления ингредиентов в конструктор", () => {
	cy.get(burgerConstructor).as('constructor');
    cy.get(`[alt="${bunName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get(`[alt="${mainIngredientName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get(`[alt="${sauceName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
  });

  it("Перетаскивание новой булки в конструктор должно успешно заменять старую булку", () => {
	cy.get(burgerConstructor).as('constructor');
    cy.get(`[alt="${bunName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get(`[alt="${newBunName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
  });

  it("Заказ бургера, проверка наличия модального окна с номером заказа", () => {
	cy.get(burgerConstructor).as('constructor');
    cy.visit("/login");
    cy.get(userLoginField).type(userEmail);
    cy.get(userPassField).type(userPass);
    cy.get(userLoginButton).click();
    cy.get(`[alt="${bunName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get(`[alt="${mainIngredientName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get(`[alt="${sauceName}"]`).trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get('[data-cy="order-button"]').click();
    cy.get(modalClass).should("be.visible");
    cy.get(orderNumber)
      .invoke("text")
      .should("match", /^[0-9]*$/);
    cy.get(closeModal).each(() => {
      cy.get(closeModal).first().click({ force: true });
    });
  });
});