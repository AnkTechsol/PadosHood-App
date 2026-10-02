# Approved Features

## Feature 1: Digital Notice Board
- **User Problem**: Residents need to stay informed about important society announcements.
- **Expected Behavior**: Admins can post rich-text notices with priority flags (General/Urgent) and optional attachments. Urgent notices have distinct UI. Residents can mark them as read.
- **Acceptance Criteria**: Urgent notices stand out visually. Read receipts work.
- **Dependencies**: SocietyContext.
- **Status**: Not Started

## Feature 2: Community Forum
- **User Problem**: Residents need a space for discussions, lost & found, and event planning.
- **Expected Behavior**: Social feed layout where residents can create posts, comment, upvote, and use tags (#Events, #LostAndFound, #General).
- **Acceptance Criteria**: Posts can be tagged, liked, and commented on.
- **Dependencies**: SocietyContext.
- **Status**: Not Started

## Feature 3: Complaint Raising (Resident View)
- **User Problem**: Residents need a specific way to raise society-related issues.
- **Expected Behavior**: Form with fields for Category (Lift, Plumbing, Electrical, etc.), Sub-Category/Location, Priority, Description, Attachments, and Visibility (Private/Public).
- **Acceptance Criteria**: Form captures all details and updates the state.
- **Dependencies**: SocietyContext.
- **Status**: Not Started

## Feature 4: Complaint Tracking (Resident View)
- **User Problem**: Residents need transparency on their complaint status.
- **Expected Behavior**: 4-stage Status Stepper (Raised -> Assigned -> Resolved -> Closed/Feedback with 1-5 star rating).
- **Acceptance Criteria**: Timeline array accurately reflects status changes.
- **Dependencies**: SocietyContext.
- **Status**: Not Started

## Feature 5: Management Dashboard (Committee View)
- **User Problem**: Admins need to track and resolve complaints efficiently.
- **Expected Behavior**: Kanban or table view filtering by Status, Category, Priority. Can update status, add internal notes, assign staff. Highlights SLA violations (>48 hours open).
- **Acceptance Criteria**: SLA indicator works. Status updates reflect in resident view.
- **Dependencies**: SocietyContext.
- **Status**: Not Started
