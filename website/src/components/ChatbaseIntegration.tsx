import { useEffect } from "react";

// Extend the Window interface to recognize chatbase
declare global {
  interface Window {
    chatbase?: {
      (arg: string, ...args: unknown[]): unknown;
      q?: unknown[];
    };
  }
}

const ChatbaseIntegration = () => {
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: unknown[]) => {
        if (!window.chatbase!.q) {
          window.chatbase!.q = [];
        }
        window.chatbase!.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop: string | symbol) {
          if (prop === "q") return target.q;
          
          // Ensure prop is a string before using it
          if (typeof prop === "string") {
            return (...args: unknown[]) => target(prop, ...args);
          }

          return undefined; // Return undefined for non-string properties
        },
      });

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "nkn_Yrk8uI7rmhy0tkTYN";
      script.async = true;
      script.onload = () => {
        console.log("Chatbase script loaded.");
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default ChatbaseIntegration;

