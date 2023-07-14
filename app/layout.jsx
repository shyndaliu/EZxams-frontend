import "./globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import { outfit, roboto } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";



export const metadata = {
  title: "EZxams",
  description:
    "Hack your exams.",
  themeColor: "#FFF",
};

// iOS Safari viewport unit correction
const IOS_SAFARI_VIEWPORT_UNIT_CORRECTION = `
var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
  var prevClientHeight;
  var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
  function handleResize() {
    var clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight(){
      doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
      prevClientHeight = clientHeight;
    });
  }
  handleResize();
  return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));
`;

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <Script id="safari-viewport-fix">{IOS_SAFARI_VIEWPORT_UNIT_CORRECTION}</Script>

      <body className={outfit.className + " " + roboto.className}>
        <div className="fixed h-screen w-full bg-back-white" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center relative">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
