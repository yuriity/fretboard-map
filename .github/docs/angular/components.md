# Angular Components Guide

> **See also:** [Signals Guide](signals-guide.md) | [Testing Guide](testing.md)

## ⚛ Angular Component Best Practices

### ✅ Component Structure and Organization

1. **Always use standalone components (don't use explicit `standalone: true` as it's implied by default).**
2. **Keep components focused on a single responsibility.**
3. **Use signals for component state management.**
4. **Use `input()` and `output()` functions instead of decorators.**
5. **Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator.**
6. **Follow a consistent order for class members.**

```ts
// ✅ GOOD: Clean, focused component with signals and modern Angular 20 patterns
import { Component, signal, input, output, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'qc-resource-card',
  imports: [CommonModule], // NO standalone: true - it's implicit in Angular 20
  templateUrl: './resource-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent {
  // 1. Input signals
  resourceName = input.required<string>();
  resourceAmount = input<number>(0);

  // 2. Output signals
  amountChanged = output<number>();

  // 3. Protected signals (component state)
  protected internalAmount = signal(0);

  // 4. Computed signals
  protected displayAmount = computed(() =>
    `${this.internalAmount()} ${this.resourceName()}`
  );

  // 5. Dependency injection
  private resourceService = inject(ResourceService);

  // 6. Methods
  incrementAmount(): void {
    this.internalAmount.update(current => current + 1);
    this.amountChanged.emit(this.internalAmount());
  }
}
```

### ✅ Class Member Organization

Organize class members in this consistent order to improve readability:

1. **Input Signals and Inputs**
2. **Output Signals**
3. **Protected/Public Signals** (component state)
4. **Computed Signals** (derived state)
5. **Dependency Injections** (grouped logically)
6. **Private Properties**
7. **Lifecycle Methods**
8. **Public Methods** (exposed API)
9. **Protected Methods** (used in template or subclasses)
10. **Private Methods** (internal implementation details)

### ✅ Component Templates

1. **Keep templates clean and readable.**
2. **Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.**
3. **Handle null/undefined values gracefully.**
4. **Do NOT use `ngClass`, use `class` bindings instead.**
5. **DO NOT use `ngStyle`, use `style` bindings instead.**
6. **Never use `[disabled]` attribute on form inputs - manage form state programmatically.**

```html
<!-- ✅ GOOD: Clean template with null checks and modern control flow -->
@if (resource()) {
  <div class="card">
    <div class="card-header">{{ resource()?.name }}</div>
    <div class="card-body">
      <p>{{ resource()?.description || 'No description available' }}</p>
      <!-- Angular Material classes -->
      <button mat-raised-button color="primary" (click)="incrementAmount()">
        Add Resource
      </button>
    </div>
  </div>
}

<!-- ❌ BAD: Using deprecated template syntax -->
<div *ngIf="resource()" [ngClass]="'card'">
  <span *ngIf="loading(); else contentTemplate">Loading...</span>
  <ng-template #contentTemplate>Content</ng-template>
</div>

<!-- ✅ GOOD: Using modern control flow -->
@if (resource()) {
  <div [class]="'card'">
    @if (loading()) {
      <span>Loading...</span>
    } @else {
      <span>Content</span>
    }
  </div>
}
```

### ⚠️ Common Anti-Patterns to Avoid

```ts
// ❌ BAD: Explicit standalone declaration (redundant in Angular 20)
@Component({
  selector: 'qc-example',
  standalone: true, // ← Remove this!
  imports: [CommonModule],
})

// ✅ GOOD: Implicit standalone (Angular 20 default)
@Component({
  selector: 'qc-example',
  imports: [CommonModule],
})
```

```html
<!-- ❌ BAD: Deprecated template syntax -->
<div *ngIf="user" [ngClass]="userClass">
  <span *ngFor="let item of items">{{ item }}</span>
</div>

<!-- ✅ GOOD: Modern control flow -->
@if (user()) {
  <div [class]="userClass()">
    @for (item of items(); track item.id) {
      <span>{{ item }}</span>
    }
  </div>
}

<!-- ❌ BAD: Disabled attribute on reactive form input -->
<input matInput formControlName="email" [disabled]="isSubmitting()">

<!-- ✅ GOOD: Programmatic form state management -->
<input matInput formControlName="email">
<!-- Form disabled state managed via form.disable()/enable() in component -->
```
  <div class="card">
    <div class="card-header">{{ resource()?.name }}</div>
    <div class="card-body">
      <p>{{ resource()?.description || 'No description available' }}</p>
      <!-- Angular Material classes -->
      <button mat-raised-button color="primary" (click)="incrementAmount()">
        Add Resource
      </button>
    </div>
  </div>
}
```

### 📌 Component Rules

- **Keep components small and focused.**
- **Prefer signals over subjects for reactive state.**
- **Use OnPush change detection strategy.**
- **Use strict type checking.**
- **Prefer type inference when the type is obvious.**
- **Avoid the `any` type; use `unknown` when type is uncertain.**
- **Use `NgOptimizedImage` for all static images.**
- **Prefer Reactive forms instead of Template-driven ones.**

### 🔄 Reactive Forms Best Practices

**DO NOT use `[disabled]` attribute on form inputs.** Instead, manage form state programmatically:

```ts
// ✅ GOOD: Manage form disabled state with signals and effects
import { Component, signal, effect, FormBuilder, Validators } from '@angular/core';

@Component({
  selector: 'qc-form-example',
  template: `
    <form [formGroup]="form">
      <!-- NO [disabled] attribute -->
      <input matInput formControlName="email" type="email">
      <button type="submit" [disabled]="isSubmitting()">Submit</button>
    </form>
  `
})
export class FormExampleComponent {
  protected isSubmitting = signal(false);
  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  private fb = inject(FormBuilder);

  constructor() {
    // Use effect to manage form disabled state
    effect(() => {
      if (this.isSubmitting()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }
}
```

**Why this approach is better:**
- Avoids Angular warnings about disabled attributes in reactive forms
- Provides centralized form state management
- Works seamlessly with signals and effects
- Prevents "changed after checked" errors

---

**Related guides:** [Signals & Reactivity](signals-guide.md) | [Testing Components](testing.md) | [Development Workflow](development-workflow.md)
