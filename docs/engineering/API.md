# Society API contract

All routes use same-origin Clerk session cookies. No client-supplied identity, role or society ID is trusted. JSON mutations require same-origin Origin and `Content-Type: application/json`. Error shape: `{ "error": "safe message" }`. Dates are ISO strings; IDs are UUID strings except Clerk user IDs.

Society is fixed: `{ id: "woodsville-phase-2", name: "Woodsville Phase 2" }`. No resident seed data.

## Types

- Member: `{id, userId, name, block, flat, residentType: "Owner"|"Tenant", role: "Resident"|"Admin", status: "Pending"|"Approved"|"Rejected"|"Suspended", createdAt}`.
- Notice: `{id,title,content,priority:"General"|"Urgent",createdAt,updatedAt}`.
- Complaint: `{id,title,description,category:"Plumbing"|"Electrical"|"Cleaning"|"Security"|"Common areas"|"Other",priority:"Normal"|"High",status:"Raised"|"InProgress"|"Resolved"|"Closed",memberId,residentName,location,createdAt,updatedAt,timeline:[{status,note,createdAt}]}`.
- Post: `{id,content,memberId,authorName,createdAt,updatedAt}`.

Lists: `{items: [...], hasMore: boolean}` using `?limit=20&offset=0` (max limit 50). Apply authorization before pagination.

Administrator bootstrap is an operator-only CLI/startup configuration, not a public endpoint. A designated exact Clerk account ID must already have a joining request. See the runbook; public requests cannot designate an administrator.

## Endpoints

| Endpoint | Body/result | Permission |
|---|---|---|
| GET /api/health | `{ok:true}`; 503 if DB unavailable | Public, no private config |
| GET /api/me | `{society,member:Member|null}` | Signed in |
| POST /api/membership | `{name,block,flat,residentType}` → Member | Signed in; create or reapply Rejected; no role accepted |
| GET /api/members | List Member | Approved admin only |
| PATCH /api/members/:id | `{status?,role?}` → Member | Approved admin; no self-approval; preserve last approved admin |
| GET /api/notices | List Notice | Approved member |
| POST /api/notices | `{title,content,priority}` → Notice | Approved admin |
| PATCH /api/notices/:id | Same notice fields → Notice | Approved admin |
| DELETE /api/notices/:id | 204 | Approved admin |
| GET /api/complaints | List Complaint | Own for resident; all for approved admin |
| POST /api/complaints | `{title,description,category,priority}` → Complaint | Approved member |
| PATCH /api/complaints/:id | Resident fields above OR admin `{status,note}` → Complaint | Owner only while Raised, or approved admin status update |
| DELETE /api/complaints/:id | 204 | Own Raised complaint only |
| GET /api/posts | List Post | Approved member |
| POST /api/posts | `{content}` → Post | Approved member |
| PATCH /api/posts/:id | `{content}` → Post | Approved author only |
| DELETE /api/posts/:id | 204 | Approved author or admin |
| GET /api/account/export | `{society,member,complaints,posts}` | Signed in, own data only |
| DELETE /api/account | 204 | Signed in; deletes membership and own complaints/posts; preserve last admin |

Limits: name 2–100, block/flat 1–40, title 3–160, notice/complaint body 5–5000, discussion 2–3000, timeline note 0–1000. Trim inputs and reject unknown fields. Reject malformed UUIDs. No file uploads. Account deletion removes application records, not the Clerk identity; the operator handles provider-side deletion requests.