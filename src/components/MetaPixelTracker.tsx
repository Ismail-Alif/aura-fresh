"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { trackMetaEvent } from "@/lib/metaPixel";

interface MetaPixelTrackerProps {
  pixelId?: string;
}

export const MetaPixelTracker: React.FC<MetaPixelTrackerProps> = ({
  pixelId = process.env.NEXT_PUBLIC_AURAFRESH_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID,
}) => {
  useEffect(() => {
    // Fire deduplicated PageView on mount
    trackMetaEvent({ eventName: "PageView" });
  }, []);

  if (!pixelId) return null;

  return (
    <>
      {/* Meta Pixel Code matching VocabJoy format */}
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
