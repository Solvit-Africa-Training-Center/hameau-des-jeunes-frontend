# Project Refactoring Documentation

## Overview

This document outlines the comprehensive refactoring of the Hameau des Jeunes Frontend project. The refactoring focused on three main areas to improve project structure, maintainability, and scalability.

## Changes Implemented

### 1. Centralized API Configuration ✅

**Location:** `src/store/api/apiEntry.ts`

**Purpose:** Eliminate duplication of base URL and authentication headers across all API files.

**Key Features:**

- Single source of truth for `API_CONFIG.BASE_URL`
- Centralized `preparaAuthHeaders` function for token management
- Easy to switch between development and production environments

**Usage:**

```typescript
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

baseQuery: fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: preparaAuthHeaders,
});
```

**Updated Files:**

- `authApi.ts`
- `caretakersApi.ts`
- `childrenApi.ts`
- `educationApi.ts`
- `enrollmentApi.ts`
- `healthRecordsApi.ts`

---

### 2. Centralized Types & Interfaces ✅

**Location:** `src/types/`

**Purpose:** Organize all types and interfaces in a dedicated, structured folder for better reusability and maintainability.

**Structure:**

```
src/types/
├── index.ts                 # Main export file for all types
├── api.types.ts             # API and domain model types
├── admin.types.ts           # Admin and manager types
└── components.types.ts      # Component-specific types
```

**Key Features:**

#### `api.types.ts` - API & Domain Models

- Authentication types
- Children management types
- Caretakers management types
- Health records types
- Education & institutions types
- Enrollment types
- Pagination types

#### `admin.types.ts` - Admin & Manager Types

- Admin roles (Residential Care, Ifashe Tugufashe, Internship, Health Post)
- Manager roles (SYSTEM_ADMIN, RESIDENTIAL_MANAGER, INTERNSHIPS_MANAGER, IFASHE_MANAGER)
- Admin status types
- Activity types
- Settings types

#### `components.types.ts` - Component-Specific Types

- Family & sponsorship types
- Stories & testimonials types
- Donation & support types
- Navigation types
- Dashboard types

**Usage:**

```typescript
// Import individual types
import { Child, AdminRole, Family } from "@/types";

// Or import specific types
import type { Child, UpdateChildPayload } from "@/types/api.types";
```

**Backward Compatibility:**

- All types are re-exported from API files for backward compatibility
- Existing imports still work while providing path to centralized types

**Example:**

```typescript
// Old way (still works)
import { Child } from "@/store/api/childrenApi";

// New recommended way
import { Child } from "@/types";
```

---

### 3. Modular Route Structure ✅

**Location:** `src/routes/modules/`

**Purpose:** Organize routes by role and functionality for cleaner, more maintainable route management.

**Structure:**

```
src/routes/
├── AppRoutes.tsx                   # Main routes component
├── ProtectedRoute.tsx              # Route protection
└── modules/
    ├── index.ts                    # Module exports
    ├── publicRoutes.tsx            # Public routes (no auth)
    ├── authRoutes.tsx              # Authentication routes
    ├── systemAdminRoutes.tsx        # System admin routes
    ├── residentialManagerRoutes.tsx # Residential manager routes
    ├── internshipManagerRoutes.tsx  # Internship manager routes
    └── ifasheManagerRoutes.tsx      # Ifashe Tugufashe manager routes
```

**Route Modules:**

#### `publicRoutes.tsx`

- Home, About, Programs
- Residentialcare, Ifashe Tugufashe, Internship information
- Our Impact, Donate, Gallery
- Contacts
- 404 All other routes

#### `authRoutes.tsx`

- Login
- Reset Password
- New Password
- Change Password

#### `systemAdminRoutes.tsx` (SYSTEM_ADMIN Role)

- Manager Registration
- Dashboard
- Analytics
- Programs Management
- Residential Care Management
- Activity Overview
- Users Management
- Feedback
- Financials
- Settings

#### `residentialManagerRoutes.tsx` (RESIDENTIAL_MANAGER Role)

- Dashboard
- Children Management
- Caretakers Management
- Settings
- Education
- Financials
- Reports
- Health Records
- Educational Institutions

#### `internshipManagerRoutes.tsx` (INTERNSHIPS_MANAGER Role)

- Dashboard
- Applications
- Management
- Feedback
- Settings

#### `ifasheManagerRoutes.tsx` (IFASHE_MANAGER Role)

- Dashboard
- Family Management
- Children
- Sponsorship
- School
- Clothes
- Parent Work
- Reports

**Updated AppRoutes.tsx:**

```typescript
export const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes}
      {authRoutes}
      {systemAdminRoutes}
      {residentialManagerRoutes}
      {internshipManagerRoutes}
      {ifasheManagerRoutes}
    </Routes>
  );
};
```

---

## Benefits of Refactoring

### 1. **Maintainability**

- Clear separation of concerns
- Each module has a single responsibility
- Easy to locate and update specific functionality

### 2. **Scalability**

- Simple to add new roles: create a new route module file
- Adding new types: organize them in appropriate type file
- Minimal changes to central AppRoutes

### 3. **Reusability**

- Types centralized and easily importable from anywhere
- API configuration consistent across all API files
- Route modules can be easily referenced and extended

### 4. **Code Quality**

- Reduced code duplication
- Better type safety with organized interfaces
- Cleaner imports and dependencies

### 5. **Developer Experience**

- New developers can quickly understand structure
- Route organization mirrors organizational hierarchy
- Clear naming conventions

---

## Migration Guide

### For Existing Code

#### 1. Update Type Imports

```typescript
// Before
import { Child, UpdateChildPayload } from "@/store/api/childrenApi";

// After (Recommended)
import type { Child, UpdateChildPayload } from "@/types";
```

#### 2. Update API Configuration References

```typescript
// Before
const BASE_URL = "https://tricky-cyb-matabar-576778bf.koyeb.app/api";

// After
import { API_CONFIG } from "@/store/api/apiEntry";
const baseUrl = API_CONFIG.BASE_URL;
```

#### 3. Import Routes

```typescript
// All routes are now organized and importable from modules
import { publicRoutes, systemAdminRoutes } from "@/routes/modules";
```

---

## Adding New Features

### Adding a New Route

1. Identify the role responsible for the route
2. Add the route to the appropriate module file in `src/routes/modules/`
3. No changes needed to AppRoutes.tsx

### Adding New Types

1. Determine the category (API, Admin, or Component-specific)
2. Add type to appropriate file in `src/types/`
3. Re-export from `index.ts` if needed

### Changing API Base URL

1. Update only `src/store/api/apiEntry.ts`
2. All API files automatically use the new configuration

---

## Best Practices

1. **Keep Route Modules Focused**
   - Each module should contain routes for a specific role
   - Don't mix unrelated routes in the same module

2. **Organize Types Logically**
   - API types in `api.types.ts`
   - Admin types in `admin.types.ts`
   - Component props in `components.types.ts`

3. **Use Centralized Configuration**
   - Always import from `apiEntry.ts`
   - Never hardcode API URLs or auth headers

4. **Type Imports**
   - Import from `@/types` for consistency
   - Use `import type` for type-only imports

5. **Route Organization**
   - Public routes first (accessible to everyone)
   - Then auth routes
   - Then role-based routes in order of hierarchy

---

## File Structure Summary

```
src/
├── routes/
│   ├── AppRoutes.tsx                 # Main routes component (40 lines)
│   ├── ProtectedRoute.tsx
│   └── modules/
│       ├── index.ts
│       ├── publicRoutes.tsx
│       ├── authRoutes.tsx
│       ├── systemAdminRoutes.tsx      # ~70 lines
│       ├── residentialManagerRoutes.tsx # ~80 lines
│       ├── internshipManagerRoutes.tsx  # ~60 lines
│       └── ifasheManagerRoutes.tsx      # ~80 lines
│
├── types/
│   ├── index.ts                       # Main export
│   ├── api.types.ts                   # ~200 lines
│   ├── admin.types.ts                 # ~80 lines
│   └── components.types.ts            # ~100 lines
│
└── store/
    └── api/
        ├── apiEntry.ts                # NEW: Centralized config
        ├── authApi.ts                 # Updated
        ├── caretakersApi.ts           # Updated
        ├── childrenApi.ts             # Updated
        ├── educationApi.ts            # Updated
        ├── enrollmentApi.ts           # Updated
        └── healthRecordsApi.ts        # Updated
```

---

## Verification Checklist

- ✅ API configuration centralized in `apiEntry.ts`
- ✅ All API files use centralized config
- ✅ Types organized in dedicated folder with subcategories
- ✅ Routes organized by role in separate modules
- ✅ AppRoutes.tsx significantly simplified (357 → 40 lines)
- ✅ No compilation errors
- ✅ Backward compatibility maintained
- ✅ All imports properly configured

---

## Next Steps (Optional Enhancements)

1. **Environment Configuration**: Create separate configs for dev/prod URLs in `apiEntry.ts`
2. **Route Constants**: Consider creating path constants for hardcoded route paths
3. **Dynamic Route Registration**: For future extensibility with plugin-like architecture
4. **Types Documentation**: Add JSDoc comments to organize complex types
5. **Error Boundary by Role**: Implement role-specific error handling in route modules

---

## Contact & Questions

For questions about the refactoring structure or implementation details, refer to:

- Route modules for understanding role-based access
- Types folder for type definitions and their organization
- apiEntry.ts for API configuration details
