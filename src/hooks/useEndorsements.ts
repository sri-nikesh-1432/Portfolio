import { useCallback, useEffect, useState } from 'react';
import {
  fetchSkillEndorsements,
  type PublicEndorsement,
} from '../lib/endorsementsApi';

export function useEndorsements(skill: string, initialCount = 0) {
  const [count, setCount] = useState(initialCount);
  const [endorsements, setEndorsements] = useState<PublicEndorsement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The page-level counts request may resolve after this row mounts, so sync the
  // initial count whenever it arrives (without clobbering a fresher local value).
  useEffect(() => {
    if (initialCount > 0) {
      setCount((prev) => (prev === 0 ? initialCount : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount]);

  // Load the endorser list lazily: only needed once a skill has endorsements.
  useEffect(() => {
    if (count <= 0) return;
    let cancelled = false;
    setLoading(true);
    fetchSkillEndorsements(skill)
      .then((data) => {
        if (!cancelled) {
          setCount(data.count);
          setEndorsements(data.endorsements);
        }
      })
      .catch(() => {
        /* counts already known; list is optional */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill, count > 0]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSkillEndorsements(skill);
      setCount(data.count);
      setEndorsements(data.endorsements);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load endorsements.');
    } finally {
      setLoading(false);
    }
  }, [skill]);

  return { count, endorsements, loading, error, refresh };
}
