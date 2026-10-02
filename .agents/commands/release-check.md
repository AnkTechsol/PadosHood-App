# Release Check Command

**Action:** Final verification before production release.

**Usage:** Run this command to generate a release evidence report.

## Steps:
1. Agent runs the `release-readiness` skill.
2. Agent verifies that tests and quality commands in the repository were actually executed.
3. Agent produces a Release Evidence Report.
4. Agent outputs one of: READY FOR RELEASE, READY WITH DOCUMENTED RISK, or NOT READY FOR RELEASE.
