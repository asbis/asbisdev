# HAP
En app for deg som ønsker å slutte med eller redusere ditt cannabisbruk

# Cypress-notater

## Test i Webkit for å unngå å vise scrollbarer
```
npm run test:e2e
```
> Obs: Kjør i fullskjerm på 27" for at Webkit-skjermbildene skal bli korrekte.

## Slette filer (skjermbilder)
```js
before(() => {
  cy.clearLocalStorage();
  cy.exec("rm -R ~/Sites/HAP/tests/e2e/screenshots/", {
    failOnNonZeroExit: false,
  }); // Slett alle eksisterende screenshots
  cy.wait(medium);
  cy.exec("mkdir ~/Sites/HAP/tests/e2e/screenshots/", {
    failOnNonZeroExit: false,
  }); // Gjenopprett mappen
  cy.wait(medium);
});
```

## Sette viewport til iPhone
```js
cy.viewport("iphone-x");
```

## Selectors
### data-test
```js
cy.get('[data-test="verdiFraDataTestAttributeIKode"]')
```

### Item i alert (f.eks. for å velge fra en select alert) 
```js
cy.contains(".alert-button-inner", "Trøndelag").click();
```

## Trigge scroll på riktig måte
```js
cy.get('[data-test="swiper-slide-5"').scrollTo("bottom");
```

## Krysse av ion-radio
```html
<ion-radio slot="end" data-test="radio1"></ion-radio>
```
```js
cy.get(`[data-test="radio1"]`).should((e) => {
  const [dom] = e.get();
  dom.shadowRoot.querySelector('[type="radio"]').click();
});
```

## Scrolle til en posision
Har ikke funnet ut av denne skikkelig, men ved å klikke på et element som befinner seg der man ønsker å scrolle, så scrolles det dit. Eksempel:
```html
<div data-test="triggerDagbokBunn" style="width: 100%; height: 10px;"></div>
```
```js
cy.get('[data-test="triggerDagbokBunn"]').click();
```

## 
```js
```

## 
```js
```

## 
```js
```