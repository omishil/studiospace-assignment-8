"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWishlist } from "@/components/wishlist-provider";

export default function WishlistButton({
  studioId,
  className = "",
  onToggle,
}) {
  const router = useRouter();
  const { email, isSaved, isPendingFor, toggle } = useWishlist();

  const saved = isSaved(studioId);
  const pending = isPendingFor(studioId);

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!email) {
      toast("Please log in to save studios.", {
        description: "Your wishlist is private to your account.",
        action: {
          label: "Sign in",
          onClick: () =>
            router.push(
              `/Login?callbackUrl=${encodeURIComponent("/wishlist")}`
            ),
        },
      });
      return;
    }

    const nowSaved = await toggle(studioId);
    if (nowSaved !== null) onToggle?.(studioId, nowSaved);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      title={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-pink-100 bg-white/90 text-pink-600 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-pink-50 disabled:cursor-wait disabled:opacity-60 dark:border-pink-900/60 dark:bg-[#241820]/90 dark:text-pink-300 dark:hover:bg-pink-950/60 ${className}`}
    >
      {saved ? (
        <BookmarkCheck className="size-4 fill-pink-600 text-pink-600 dark:fill-pink-300 dark:text-pink-300" />
      ) : (
        <Bookmark className="size-4" />
      )}
    </button>
  );
}
