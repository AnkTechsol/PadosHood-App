DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'ang_members'::regclass
      AND conname = 'ang_members_role_check'
      AND pg_get_constraintdef(oid) LIKE '%SuperAdmin%'
  ) THEN
    ALTER TABLE ang_members DROP CONSTRAINT IF EXISTS ang_members_role_check;
    ALTER TABLE ang_members
      ADD CONSTRAINT ang_members_role_check
      CHECK (role IN ('Resident', 'Admin', 'SuperAdmin'));
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS ang_members_single_super_admin_idx
  ON ang_members ((role))
  WHERE role = 'SuperAdmin';

-- Manual downgrade only: first transfer/remove the Super Admin role, then
-- drop this index, restore the legacy role check, and drop the replacement
-- check. Do not downgrade while any member still has role = 'SuperAdmin'.