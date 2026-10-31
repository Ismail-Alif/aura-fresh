"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { trackMetaEvent, FB_PIXEL_ID } from "@/lib/metaPixel";

interface MetaPixelTrackerProps {
  pixelId?: string;
}

export const MetaPixelTracker: React.FC<MetaPixelTrackerProps> = ({
  pixelId = FB_PIXEL_ID,
}) => {
  const pathname = usePathname();
  const initialMounted = useRef(false);

  // 1. Initial Mount: Dual-dispatch PageView with deduplication ID
  useEffect(() => {
    trackMetaEvent({ eventName: "PageView" });
    initialMounted.current = true;
  }, []);

  // 2. Client-side Route Changes: Track subsequent PageViews
  useEffect(() => {
    if (!initialMounted.current) return;
    trackMetaEvent({ eventName: "PageView" });
  }, [pathname]);

  if (!pixelId) return null;

  return (
    <>
      {/* Meta Pixel Standard Base Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};
