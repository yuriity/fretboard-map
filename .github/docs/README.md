
# Documentation Structure

## Zoneless Angular & Signals Migration

This project has been migrated to Zoneless Angular using Signals for change detection. For migration details and best practices, see:

- [Angular Zoneless Change Detection (official)](https://angular.dev/reference/change-detection/zoneless)
- [Angular Signals (official)](https://angular.dev/reference/signals)
- [Context7 MCP Angular Docs](/angular/angular)

All new development should follow the patterns described in the above resources and in this documentation folder. For architecture, signals, and testing, see the guides in `.github/docs/angular/`.

This directory contains development documentation organized by technology stack.

## 📂 Structure

```
.github/docs/
└── angular/                    # Angular-specific development guides
    ├── components.md           # Component architecture and best practices
    ├── signals-guide.md        # Signals and ZonelessChangeDetection
    ├── testing.md              # Testing strategies and patterns
    └── development-workflow.md # RxJS, DI, and anti-patterns
```

## 🔗 Related Files

- **Main Instructions**: [`.github/copilot-instructions.md`](../copilot-instructions.md)
- **Copilot Prompts**: [`.github/prompts/`](../prompts/)
- **Chat Modes**: [`.github/chatmodes/`](../chatmodes/)

## 📖 Quick Navigation

### Angular Development
- **[Components Guide](angular/components.md)** - Component architecture, structure, and templates
- **[Signals Guide](angular/signals-guide.md)** - Signals, ZonelessChangeDetection, and service patterns
- **[Testing Guide](angular/testing.md)** - Component testing with signals and ZonelessChangeDetection
- **[Development Workflow](angular/development-workflow.md)** - RxJS best practices, DI patterns, and anti-patterns

---

**📝 Note**: These are development documentation files, not Copilot prompts. For actual prompts, see [`.github/prompts/`](../prompts/).
