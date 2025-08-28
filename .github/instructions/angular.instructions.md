---
description: 'Angular-specific coding standards and best practices'
applyTo: '**/*.ts, **/*.html, **/*.scss, **/*.css'
---

# Angular Development Instructions

Instructions for generating high-quality Angular applications with TypeScript, using Angular Signals for state management, adhering to Angular best practices as outlined at https://angular.dev.

## Project Context
- Latest Angular version (use standalone components by default)
- TypeScript for type safety
- Angular CLI for project setup and scaffolding
- Follow Angular Style Guide (https://angular.dev/style-guide)
- Use Angular Material for consistent styling

## Development Standards

### Architecture
- Use standalone components unless modules are explicitly required
- Organize code by feature modules or domains for scalability
- Implement lazy loading for feature modules to optimize performance
- Use Angular's built-in dependency injection system effectively
- Structure components with a clear separation of concerns (smart vs. presentational components)

### TypeScript
- Enable strict mode in `tsconfig.json` for type safety
- Define clear interfaces and types for components, services, and models
- Use type guards and union types for robust type checking
- Implement proper error handling with RxJS operators (e.g., `catchError`)
- Use typed forms (e.g., `FormGroup`, `FormControl`) for reactive forms

### Component Design
- Follow Angular's component lifecycle hooks best practices
- When using Angular >= 19, use `input()`, `output()`, `viewChild()`, `viewChildren()`, `contentChild()` and `contentChildren()` functions instead of decorators; otherwise use decorators
- Leverage Angular's change detection strategy (default or `OnPush` for performance)
- Keep templates clean and logic in component classes or services
- Use Angular directives and pipes for reusable functionality

### Styling
- Use Angular's component-level CSS encapsulation (default: ViewEncapsulation.Emulated)
- Prefer SCSS for styling with consistent theming
- Implement responsive design using CSS Grid, Flexbox, or Angular CDK Layout utilities
- Follow Angular Material's theming guidelines if used
- Maintain accessibility (a11y) with ARIA attributes and semantic HTML

### State Management
- Use Angular Signals for reactive state management in components and services
- Leverage `signal()`, `computed()`, and `effect()` for reactive state updates
- Use writable signals for mutable state and computed signals for derived state
- Handle loading and error states with signals and proper UI feedback
- Use Angular's `AsyncPipe` to handle observables in templates when combining signals with RxJS

### Data Fetching
- Use Angular's `HttpClient` for API calls with proper typing
- Implement RxJS operators for data transformation and error handling
- Prefer `inject()` for dependency injection in standalone components; avoid constructor injection
- Implement caching strategies (e.g., `shareReplay` for observables)
- Store API response data in signals for reactive updates
- Handle API errors with global interceptors for consistent error handling

### Security
- Sanitize user inputs using Angular's built-in sanitization
- Implement route guards for authentication and authorization
- Use Angular's `HttpInterceptor` for CSRF protection and API authentication headers
- Validate form inputs with Angular's reactive forms and custom validators
- Follow Angular's security best practices (e.g., avoid direct DOM manipulation)

### Performance
- Enable production builds with `ng build --configuration production` (or `ng build --prod` as a shorthand) for optimization
- Use lazy loading for routes to reduce initial bundle size
- Optimize change detection with `OnPush` strategy and signals for fine-grained reactivity
- Use trackBy in `ngFor` loops to improve rendering performance
- Implement server-side rendering (SSR) or static site generation (SSG) with Angular Universal (if specified)

### Testing
- Always include provideZonelessChangeDetection() in test modules
- Remember to call fixture.detectChanges() after signal updates so the DOM reflects state changes
- For InputSignal testing:
  - Use `fixture.componentRef.setInput('myInput', value)` or, if the input is a writable signal instance, update it directly (e.g., `component.myInput.set('value')`)
- For OutputSignal testing:
  - Subscribe a spy to the output and assert calls, e.g. `component.myOutput.subscribe(spy)` and `expect(spy).toHaveBeenCalledWith(...)`
- For signal effects testing:
  - Define effects inside `TestBed.runInInjectionContext(() => { ... })`
  - To advance async/zone work use standard Angular testing utilities — either:
    - fakeAsync + tick():
      ```ts
      import { fakeAsync, tick } from '@angular/core/testing';
      it('works', fakeAsync(() => {
        // change signals / trigger effect
        tick(); // advance timers/microtasks
        fixture.detectChanges();
      }));
      ```
    - or async/waitForAsync with fixture.whenStable():
      ```ts
      it('works', async () => {
        // change signals / trigger effect
        await fixture.whenStable();
        fixture.detectChanges();
      });
      ```
- Follow the AAA pattern (Arrange-Act-Assert) for clean, maintainable tests
- Testing protected properties:
  - Do not expose protected properties just for testing
  - Test through the public API, inputs/outputs, and DOM interactions
  - Verify behavior rather than implementation details
  - Use DOM assertions to confirm UI state instead of checking protected signals directly
- Use withContext for descriptive test failures:
  - Use `withContext()` instead of passing messages directly to assertion methods
  - Example: `expect(element).withContext('Button should be visible').toBeTruthy()`

Example snippets:
- InputSignal + provideZonelessChangeDetection:
```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
});

it('updates input signal', () => {
  const fixture = TestBed.createComponent(MyComponent);
  fixture.detectChanges();

  // preferred: set input via fixture API
  fixture.componentRef.setInput('myInput', 'new value');
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('.label').textContent).toContain('new value');
});
```
- OutputSignal subscribe spy:
```ts
it('emits output', () => {
  const fixture = TestBed.createComponent(MyComponent);
  const comp = fixture.componentInstance;
  const spy = jasmine.createSpy('outSpy');
  comp.myOutput.subscribe(spy);

  comp.triggerAction(); // causes emit
  fixture.detectChanges();

  expect(spy).toHaveBeenCalledWith(expectedValue);
});
```

## Implementation Process
1. Plan project structure and feature modules
2. Define TypeScript interfaces and models
3. Scaffold components, services, and pipes using Angular CLI
4. Implement data services and API integrations with signal-based state
5. Build reusable components with clear inputs and outputs
6. Add reactive forms and validation
7. Apply styling with SCSS and responsive design
8. Implement lazy-loaded routes and guards
9. Add error handling and loading states using signals
10. Write unit and end-to-end tests
11. Optimize performance and bundle size

## Additional Guidelines
- Follow Angular's naming conventions (e.g., `feature.component.ts`, `feature.service.ts`)
- Use Angular CLI commands for generating boilerplate code
- Document components and services with clear JSDoc comments
- Ensure accessibility compliance (WCAG 2.1) where applicable
- Use Angular's built-in i18n for internationalization (if specified)
- Keep code DRY by creating reusable utilities and shared modules
- Use signals consistently for state management to ensure reactive updates

## ✅ Angular CLI Commands

```bash
# Change to Angular workspace directory first
cd src/Qwerty.Client/

# Generate a new component
npx ng generate component components/resource-card --standalone

# Generate a service
npx ng generate service services/inventory

# Build for production (from project root)
npm run build --prefix src/Qwerty.Client/ -- --configuration production

# Run tests (from project root)
npm test --prefix src/Qwerty.Client/

# Run tests without watch mode (from project root)
npm test --prefix src/Qwerty.Client/ -- --watch=false

# Lint code (from project root)
npm run lint --prefix src/Qwerty.Client/
```

## 🚫 Angular Anti-Patterns to Avoid

**Deprecated RxJS Methods:**
- ❌ `.toPromise()` - Use `firstValueFrom()` or `lastValueFrom()` instead
- ❌ `subscribe()` without unsubscription - Use async/await with firstValueFrom() for one-time operations
- ❌ Nested subscriptions - Use proper RxJS operators like `switchMap`, `mergeMap`

**Component Anti-Patterns:**
- ❌ Direct DOM manipulation - Use Angular's declarative approach
- ❌ Constructor logic - Use lifecycle hooks or effects
- ❌ Manual subscription management when not needed - Prefer async pipe or firstValueFrom()

**Template Anti-Patterns:**
- ❌ Using `*ngIf`, `*ngFor`, `*ngSwitch` - Use modern control flow (`@if`, `@for`, `@switch`)
- ❌ Using `ngClass` and `ngStyle` - Use `[class]` and `[style]` bindings instead
- ❌ Using `[disabled]` on reactive form inputs - Manage form state programmatically

**Component Declaration Anti-Patterns:**
- ❌ Explicit `standalone: true` in Angular 20 - Components are standalone by default
- ❌ Constructor injection - Use `inject()` function instead
