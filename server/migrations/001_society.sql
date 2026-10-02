CREATE TABLE IF NOT EXISTS ang_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  block text NOT NULL CHECK (char_length(block) BETWEEN 1 AND 40),
  flat text NOT NULL CHECK (char_length(flat) BETWEEN 1 AND 40),
  resident_type text NOT NULL CHECK (resident_type IN ('Owner', 'Tenant')),
  role text NOT NULL DEFAULT 'Resident' CHECK (role IN ('Resident', 'Admin')),
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Suspended')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_members_status_role_idx ON ang_members(status, role);

CREATE TABLE IF NOT EXISTS ang_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  content text NOT NULL CHECK (char_length(content) BETWEEN 5 AND 5000),
  priority text NOT NULL CHECK (priority IN ('General', 'Urgent')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_notices_created_idx ON ang_notices(created_at DESC);

CREATE TABLE IF NOT EXISTS ang_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES ang_members(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  description text NOT NULL CHECK (char_length(description) BETWEEN 5 AND 5000),
  category text NOT NULL CHECK (category IN ('Plumbing', 'Electrical', 'Cleaning', 'Security', 'Common areas', 'Other')),
  priority text NOT NULL CHECK (priority IN ('Normal', 'High')),
  status text NOT NULL DEFAULT 'Raised' CHECK (status IN ('Raised', 'InProgress', 'Resolved', 'Closed')),
  location text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_complaints_member_created_idx ON ang_complaints(member_id, created_at DESC);

CREATE TABLE IF NOT EXISTS ang_complaint_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid NOT NULL REFERENCES ang_complaints(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('Raised', 'InProgress', 'Resolved', 'Closed')),
  note text NOT NULL DEFAULT '' CHECK (char_length(note) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_complaint_events_complaint_idx ON ang_complaint_events(complaint_id, created_at);

CREATE TABLE IF NOT EXISTS ang_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES ang_members(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 2 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_posts_created_idx ON ang_posts(created_at DESC);

CREATE TABLE IF NOT EXISTS ang_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id text NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ang_audit_created_idx ON ang_audit(created_at DESC);