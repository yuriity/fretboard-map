# Development Workflow Guide

> **See also:** [Components Guide](components.md) | [Signals Guide](signals-guide.md)

## 🛠 Development Workflow Best Practices

### ✅ Angular CLI Commands

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

### ✅ Code Organization and Style

- Use ESLint and Prettier for consistent formatting.
- Organize imports logically:

```ts
// Angular imports first
import { Component, signal, inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

// Third-party imports
import { Chart } from "chart.js";

// Application imports
import { Resource } from "../../models/resource";
import { ResourcesService } from "../../services/resources.service";
```

## 💉 Dependency Injection Best Practices

### ✅ Using inject() Function

```ts
// ✅ GOOD: Using inject() function for dependency injection
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ResourcesService } from '../../services/resources.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'qc-resource-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceManagerComponent {
  // Dependency injection with inject() - place after signals
  protected resourcesService = inject(ResourcesService);
  private logService = inject(LogService);

  // Component logic...
}
```

### 📌 Dependency Injection Rules

- **Always use inject() function instead of constructor injection.**
- **Place injected dependencies after signals in class organization.**
- **Use appropriate access modifiers (protected/private) for injected services.**
- **Keep functional dependencies (services used together) grouped together.**

## 🔄 RxJS Best Practices

Use modern RxJS patterns and avoid deprecated methods:

```typescript
import { firstValueFrom, lastValueFrom, take } from 'rxjs';

// ✅ CORRECT: Use firstValueFrom() for single values
async someMethod(): Promise<void> {
  const result = await firstValueFrom(this.http.get<Data>('/api/data'));
  this.processResult(result);
}

// ❌ DEPRECATED: Don't use toPromise()
async someMethod(): Promise<void> {
  const result = await this.http.get<Data>('/api/data').toPromise(); // DEPRECATED
}

// ✅ CORRECT: Use lastValueFrom() for streams that complete
async getLastValue(): Promise<Data> {
  return await lastValueFrom(this.dataStream$);
}

// ✅ CORRECT: Use take(1) with firstValueFrom for safety
async getSingleValue(): Promise<Data> {
  return await firstValueFrom(this.infiniteStream$.pipe(take(1)));
}
```

### 🚫 Angular Anti-Patterns to Avoid

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

**Critical Issues to Watch For:**
```typescript
// ❌ BAD: Will cause Angular warnings and compliance issues
@Component({
  selector: 'qc-example',
  standalone: true, // Remove this in Angular 20
  template: `
    <!-- Deprecated syntax -->
    <div *ngIf="condition" [ngClass]="className">
      <input formControlName="field" [disabled]="loading"> <!-- Will cause warnings -->
    </div>
  `
})
```

```typescript
// ✅ GOOD: Compliant Angular 20 patterns
@Component({
  selector: 'qc-example',
  template: `
    <!-- Modern control flow -->
    @if (condition()) {
      <div [class]="className()">
        <input formControlName="field"> <!-- State managed via form.disable() -->
      </div>
    }
  `
})
```

---

**Related guides:** [Components Guide](components.md) | [Signals Guide](signals-guide.md) | [Testing Guide](testing.md)
