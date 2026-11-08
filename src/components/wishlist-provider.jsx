"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";

const WishlistContext = createContext(null);

const EMPTY_IDS = [];

export default function WishlistProvider({ children }) {
  const { data: session, isPending } = useSession();
  const email = session?.user?.email || "";

  // Tie the cached IDs to the account they belong to so a previous user's
  // wishlist never leaks into the next session.
  const [savedState, setSavedState] = useState({ email: "", ids: EMPTY_IDS });
  const [pendingIds, setPendingIds] = useState([]);

  const savedIds = savedState.email === email ? savedState.ids : EMPTY_IDS;

  // Load the signed-in user's saved studio IDs once per session.
  useEffect(() => {
    if (isPending || !email) return;

    let active = true;

    const loadWishlist = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wishlist/ids?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Could not load your wishlist");
        }

        const data = await response.json();
        if (active) {
          setSavedState({
            email,
            ids: Array.isArray(data) ? data.map(String) : [],
          });
        }
      } catch {
        if (active) setSavedState({ email, ids: EMPTY_IDS });
      }
    };

    loadWishlist();

    return () => {
      active = false;
    };
  }, [email, isPending]);

  const isSaved = useCallback(
    (studioId) => savedIds.includes(String(studioId)),
    [savedIds]
  );

  const isPendingFor = useCallback(
    (studioId) => pendingIds.includes(String(studioId)),
    [pendingIds]
  );

  const toggle = useCallback(
    async (studioId) => {
      const id = String(studioId);

      if (!email) {
        return null;
      }

      const wasSaved = savedIds.includes(id);

      // Optimistic update so the icon responds instantly.
      setSavedState((previous) => {
        const current = previous.email === email ? previous.ids : EMPTY_IDS;

        return {
          email,
          ids: wasSaved
            ? current.filter((savedId) => savedId !== id)
            : current.includes(id)
              ? current
              : [...current, id],
        };
      });
      setPendingIds((previous) =>
        previous.includes(id) ? previous : [...previous, id]
      );

      try {
        const response = await fetch(
          wasSaved
            ? `${API_URL}/wishlist/${id}?email=${encodeURIComponent(email)}`
            : `${API_URL}/wishlist`,
          {
            method: wasSaved ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: wasSaved
              ? undefined
              : JSON.stringify({ email, studioId: id }),
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Could not update your wishlist");
        }

        toast.success(
          wasSaved
            ? "Removed from your wishlist."
            : "Studio saved to your wishlist!"
        );

        return !wasSaved;
      } catch (error) {
        // Roll the optimistic update back.
        setSavedState((previous) => {
          const current =
            previous.email === email ? previous.ids : EMPTY_IDS;

          return {
            email,
            ids: wasSaved
              ? current.includes(id)
                ? current
                : [...current, id]
              : current.filter((savedId) => savedId !== id),
          };
        });

        toast.error(error.message || "Could not update your wishlist.");
        return null;
      } finally {
        setPendingIds((previous) =>
          previous.filter((pendingId) => pendingId !== id)
        );
      }
    },
    [email, savedIds]
  );

  return (
    <WishlistContext.Provider
      value={{ email, savedIds, isSaved, isPendingFor, toggle }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }

  return context;
}
