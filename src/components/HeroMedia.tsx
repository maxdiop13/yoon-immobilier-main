"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/**
 * Média de fond du hero, « video-ready ».
 * - Pas de source vidéo (HERO_VIDEO_SRC vide) → on affiche le poster (rendu façade).
 * - Source vidéo + mouvement autorisé → <video> autoplay/muted/loop/playsinline.
 * - prefers-reduced-motion → poster fixe, jamais d'autoplay.
 *
 * Le poster est rendu par défaut (SSR + sans JS), la vidéo ne monte qu'après
 * hydratation si les conditions sont réunies : aucun « trou » tant qu'il n'y a pas
 * de vidéo, et aucune refonte le jour où on la branche.
 */
export function HeroMedia({ poster, alt }: { poster: string; alt: string }) {
  const { mp4, webm } = siteConfig.heroVideo;
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!mp4) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setPlayVideo(true);
  }, [mp4]);

  return (
    <div className="absolute inset-0 -z-10 bg-anthracite">
      {playVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full object-cover"
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Overlay léger et directionnel : pas de voile plein écran (la vidéo reste lumineuse).
          Dégradé bas (texte/CTA/citation) + léger dégradé gauche (titre), juste assez
          pour garder le texte lisible sans assombrir l'image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-anthracite/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-anthracite/40 via-transparent to-transparent"
      />
    </div>
  );
}
