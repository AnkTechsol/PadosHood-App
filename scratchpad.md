# Retired implementation notes

The earlier notes proposed mock role switching and fake attachments; those ideas are not valid for the selected society service. Production identity must come from Clerk, roles from PostgreSQL membership, and permissions from the server.

No resident demo data, fake authentication, attachment uploads, or health/contact data should be added to active production paths. For launch requirements and open owner decisions see [docs/product/SOCIETY_LAUNCH.md](docs/product/SOCIETY_LAUNCH.md).
