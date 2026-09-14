import { useEffect, useState } from "react";

/**
 * Håller reda på vilken sektion som just nu syns överst, så menyn kan
 * markera var besökaren befinner sig. Tar id:n i samma ordning som de
 * ligger på sidan.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Den första i dokumentordning som syns vinner, så markeringen
        // inte hoppar fram och tillbaka när två sektioner överlappar.
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      // Övre kanten dras ner förbi den klistrade headern, nedre kanten upp
      // så att en sektion räknas först när den tagit över skärmen.
      { rootMargin: "-88px 0px -55% 0px", threshold: 0 }
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
