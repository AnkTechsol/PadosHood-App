export function requireSameOrigin(req, res, next) {
  if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) return next();
  if (req.get('sec-fetch-site') === 'cross-site') {
    return res.status(403).json({ error: 'Same-origin request required' });
  }
  const origin = req.get('origin');
  if (origin) {
    try {
      const forwarded = req.get('x-forwarded-host')?.split(',')[0]?.trim();
      const expectedHost = forwarded || req.get('host');
      const source = new URL(origin);
      if (!['https:', 'http:'].includes(source.protocol) || source.host !== expectedHost) {
        return res.status(403).json({ error: 'Same-origin request required' });
      }
    } catch {
      return res.status(403).json({ error: 'Invalid request origin' });
    }
  }
  return next();
}