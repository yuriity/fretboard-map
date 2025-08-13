# Signals & ZonelessChangeDetection Guide

> **See also:** [Components Guide](components.md) | [Testing Guide](testing.md)

## 🔄 ZonelessChangeDetection Best Practices

### ✅ Setting Up ZonelessChangeDetection

```ts
// app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // Other providers...
  ],
};
```

### ✅ Working with Signals and Effects

```ts
// ✅ GOOD: Using signals for reactive state
import { Component, signal, computed, effect } from "@angular/core";

@Component({
  // Component metadata
})
export class ResourceManagerComponent {
  private resources = signal<Resource[]>([]);
  protected filteredResources = computed(() => this.resources().filter((r) => r.available));

  constructor() {
    // Effect runs whenever dependencies change
    effect(() => {
      console.log("Filtered resources updated:", this.filteredResources());
    });
  }
}
```

### 📌 Signals Rules

- **Use signals for component state.**
- **Use computed() for derived state.**
- **Use effect() for side effects.**
- **Remember to manually trigger change detection after async operations.**
- **Use effects to manage reactive form disabled state instead of template attributes.**

## 📊 State Management Best Practices

### ✅ Using Angular Signals

```ts
// services/resources.service.ts
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Resource } from "../models/resource";

@Injectable({
  providedIn: "root",
})
export class ResourcesService {
  private resourcesSignal = signal<Resource[]>([]);

  // Expose a read-only signal
  public resources = this.resourcesSignal.asReadonly();

  private http = inject(HttpClient);

  constructor() {
    this.loadResources();
  }

  private loadResources(): void {
    this.http.get<Resource[]>("/api/resources").subscribe((data) => this.resourcesSignal.set(data));
  }
}
```

### 📌 State Management Rules

- **Use services for shared state.**
- **Keep state management simple.**
- **Use signals for reactive state.**
- **Expose read-only signals when possible.**
- **Design services around a single responsibility.**
- **Use the `providedIn: 'root'` option for singleton services.**
- **Use the `inject()` function instead of constructor injection.**

## 🛠 Angular Service Patterns

Services should follow signals-first approach with proper RxJS usage:

```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Private signals for internal state
  private readonly _data = signal<Data[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly data = this._data.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly hasData = computed(() => this._data().length > 0);

  // Dependency injection
  private readonly http = inject(HttpClient);

  // Methods with proper RxJS patterns
  async loadData(): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      // ✅ Use firstValueFrom for HTTP requests
      const result = await firstValueFrom(this.http.get<Data[]>('/api/data'));
      this._data.set(result);
    } catch (error) {
      this._error.set('Failed to load data');
    } finally {
      this._isLoading.set(false);
    }
  }
}
```

## 🔄 Managing Form State with Signals and Effects

For reactive forms, use effects to manage form disabled state instead of template attributes:

```typescript
import { Component, signal, effect, inject, FormBuilder, Validators } from '@angular/core';

@Component({
  selector: 'qc-form-component',
  template: `
    <form [formGroup]="form">
      <!-- ✅ NO [disabled] attribute -->
      <input matInput formControlName="email" type="email">
      <input matInput formControlName="password" type="password">
      <button type="submit" [disabled]="isSubmitting()">Submit</button>
    </form>
  `
})
export class FormComponent {
  // Signals for form state
  protected isSubmitting = signal(false);
  protected isLoading = signal(false);

  // Reactive form
  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });

  private fb = inject(FormBuilder);

  constructor() {
    // ✅ Use effect to manage form disabled state
    effect(() => {
      if (this.isSubmitting() || this.isLoading()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    try {
      // Submit logic here
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
```

**Benefits of this approach:**
- No Angular warnings about disabled attributes
- Centralized form state management via signals
- Automatic form state synchronization via effects
- Better integration with ZonelessChangeDetection

---

**Related guides:** [Components Guide](components.md) | [Testing Guide](testing.md) | [Development Workflow](development-workflow.md)
