import localFont from "next/font/local";
import {
  Inter,
  Forum,
  Island_Moments,
  Homemade_Apple,
  Caveat,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AuthProvider } from "@/app/Providers";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  //display: "swap",
  //👇 Add variable to our object
  variable: "--font-forum",
});

const islandMoments = Caveat({
  subsets: ["latin"],
  weight: "400",
  //display: "swap",
  //👇 Add variable to our object
  variable: "--font-islandMoments",
});

const MightyRiver = localFont({
  src: "./../public/fonts/Mighty-River.ttf",
  variable: "--font-mighty-river",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <body
        className={`${forum.variable} ${GeistSans.variable} ${islandMoments.variable}`}
      >
        <AuthProvider>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
