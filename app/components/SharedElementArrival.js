"use client";

import { useEffect } from "react";

const TRANSITION_KEY = "atelier-shared-transition";

export default function SharedElementArrival({ slug, targetId }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      sessionStorage.removeItem(TRANSITION_KEY);
      return;
    }

    const raw = sessionStorage.getItem(TRANSITION_KEY);
    if (!raw) {
      return;
    }

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(TRANSITION_KEY);
      return;
    }

    if (!payload || payload.slug !== slug || Date.now() - payload.timestamp > 2500) {
      sessionStorage.removeItem(TRANSITION_KEY);
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      sessionStorage.removeItem(TRANSITION_KEY);
      return;
    }

    const targetRect = target.getBoundingClientRect();
    target.style.opacity = "0";

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = `${payload.rect.top}px`;
    overlay.style.left = `${payload.rect.left}px`;
    overlay.style.width = `${payload.rect.width}px`;
    overlay.style.height = `${payload.rect.height}px`;
    overlay.style.zIndex = "120";
    overlay.style.pointerEvents = "none";
    overlay.style.backgroundImage = payload.backgroundImage || "none";
    overlay.style.backgroundSize = payload.backgroundSize || "cover";
    overlay.style.backgroundPosition = payload.backgroundPosition || "center";
    overlay.style.backgroundColor = "#efede8";
    overlay.style.borderRadius = payload.borderRadius || "2px";
    overlay.style.overflow = "hidden";

    document.body.appendChild(overlay);

    const animation = overlay.animate(
      [
        {
          top: `${payload.rect.top}px`,
          left: `${payload.rect.left}px`,
          width: `${payload.rect.width}px`,
          height: `${payload.rect.height}px`,
          borderRadius: payload.borderRadius || "2px",
        },
        {
          top: `${targetRect.top}px`,
          left: `${targetRect.left}px`,
          width: `${targetRect.width}px`,
          height: `${targetRect.height}px`,
          borderRadius: "0px",
        },
      ],
      {
        duration: 820,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      target.style.opacity = "1";
      overlay.remove();
      sessionStorage.removeItem(TRANSITION_KEY);
    };

    animation.oncancel = () => {
      target.style.opacity = "1";
      overlay.remove();
      sessionStorage.removeItem(TRANSITION_KEY);
    };

    return () => {
      target.style.opacity = "1";
      overlay.remove();
    };
  }, [slug, targetId]);

  return null;
}
