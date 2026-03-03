"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const TRANSITION_KEY = "atelier-shared-transition";

export default function TransitionLink({ href, slug, children, className = "" }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
          return;
        }

        const currentTarget = event.currentTarget;
        const cardRoot = currentTarget.closest("[data-product-card]");
        const sourceElement = cardRoot?.querySelector(`[data-shared-image="${slug}"]`);

        if (!sourceElement) {
          return;
        }

        const rect = sourceElement.getBoundingClientRect();
        const sourceStyles = window.getComputedStyle(sourceElement);
        const payload = {
          slug,
          rect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
          backgroundImage: sourceStyles.backgroundImage,
          backgroundSize: sourceStyles.backgroundSize,
          backgroundPosition: sourceStyles.backgroundPosition,
          borderRadius: sourceStyles.borderRadius,
          timestamp: Date.now(),
        };

        sessionStorage.setItem(TRANSITION_KEY, JSON.stringify(payload));
        event.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
}
