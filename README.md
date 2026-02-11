# Role-Based Multi-Stage Registration Dashboard

## Project Overview

This project is a role-based multi-stage registration system built using
React.\
It demonstrates nested routing, centralized state management, validation
strategies, hook usage, class vs functional components, and stage
locking logic.

------------------------------------------------------------------------

# 1. Routing Structure

The application uses React Router v6 with nested routing.

## Route Configuration

-   `/` → Home Page\
-   `/register` → Parent Layout (DashboardLayout)\
-   `/register/stage-1` → Role Selection\
-   `/register/stage-2` → Role-Based Details\
-   `/register/stage-3` → Email & Agreement\
-   `/register/success` → Summary Page

DashboardLayout renders child routes using `<Outlet />` and shares state
using `useOutletContext()`.

------------------------------------------------------------------------

# 2. State Flow

All major state is centralized inside **DashboardLayout**:

-   selectedRole\
-   progress\
-   stageStatus\
-   formData

## Flow

DashboardLayout (State Owner)\
→ Stage1 updates role + stage1 status\
→ Stage2 updates role-based data + stage2 status\
→ Stage3 updates email + agreement + stage3 status\
→ Success reads final formData

This ensures a single source of truth and avoids prop drilling.

------------------------------------------------------------------------

# 3. Validation Strategy

## Stage 1

-   Role must be selected\
-   Uses useRef to focus invalid field\
-   Displays inline error using reusable FormError component

## Stage 2 (Role-Based Validation)

Student: - School required\
- Grade required

Teacher: - Subject required\
- Experience must be 0 or more

Professor: - Department required\
- Research area required

Uses error object pattern and focuses first invalid input.

## Stage 3 (Class Component)

-   Email validated using regex\
-   Agreement checkbox required\
-   Uses createRef for focus\
-   Prevents submission if invalid

------------------------------------------------------------------------

# 4. Hook Usage Reasoning

## useState

Used to manage: - Form data\
- Progress\
- Stage completion\
- Errors\
- Selected role

## useEffect

Used for: - Stage locking\
- Navigation protection\
- Success page protection

## useRef

Used to: - Focus invalid inputs\
- Access DOM elements without re-rendering

## useNavigate

Used for: - Programmatic navigation\
- Redirect protection\
- Resetting flow

------------------------------------------------------------------------

# 5. Functional vs Class Components

## Functional Components

Used in: - Stage1\
- Stage2\
- DashboardLayout\
- Success

Features: - Use Hooks\
- Cleaner syntax\
- No `this` keyword\
- Modern React approach

## Class Component

Used in: - Stage3

Features: - Uses this.state\
- Uses createRef\
- Requires wrapper (Stage3Wrapper) to inject navigate and outlet context

Hooks cannot be used inside class components, which is why Stage3Wrapper
is implemented.

------------------------------------------------------------------------

# 6. Stage Locking Logic

Implemented inside DashboardLayout.

Rules: - Cannot access Stage 2 without completing Stage 1\
- Cannot access Stage 3 without completing Stage 2\
- Cannot access Success without completing Stage 3

Also: - Prevents direct URL manipulation\
- Prevents back navigation after success

------------------------------------------------------------------------

# Conclusion

This project demonstrates:

-   Nested Routing\
-   Centralized State Management\
-   Role-Based Dynamic Forms\
-   Controlled Inputs & Validation\
-   Proper Hook Usage\
-   Class vs Functional Component Understanding\
-   Route Protection & Stage Locking\
-   Clean Component Modularization

It mirrors a real-world onboarding flow and follows modern React best
practices.
>>>>>>> 0293d0a (first commit)
=======
>>>>>>> 1ca3f3ae45ba30529c7015f9c583b9ce54358d00
