# Architecture

## System Architecture
React single-page application (SPA) using Vite for build tooling.

## Major Components
- **State Management**: React Context (`SocietyContext.jsx`) handling notices, forums, and complaints state.
- **Communication Module**: `NoticeBoard`, `CommunityForum` and corresponding sub-components (`NoticeCard`, `ForumPost`).
- **Complaint Management Module**: `ComplaintForm` (Resident), `ComplaintStepper` (Resident Tracking), `AdminDashboard` (Committee Kanban/Table view).

## Frontend Architecture
Component-driven UI based on React. Styling via pure CSS (`index.css`) with custom variables for theme consistency.

## Backend Architecture
Currently mocked via React Context. Future integration with REST/GraphQL APIs.

## Data flows
- Resident forms dispatch events to `SocietyContext`.
- Admin dashboards read from and update `SocietyContext`.

## Security constraints
- RBAC (Role-Based Access Control) to differentiate Resident vs. Committee Member views.
