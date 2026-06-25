"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "sifaet-install-dismissed";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export default function InstallHint() {
  const [visible, setVisible] = useState(false);
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    // Zaten kurulu (standalone) ise gösterme
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone;
    if (standalone) return;

    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    setIsIOS(ios);
    if (ios) {
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    dismiss();
  }

  if (!visible) return null;

  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-sm">
        <span aria-hidden>📲</span>
        {isIOS ? (
          <span className="text-stone-600">
            Şifa et&apos;i telefonuna ekle: <b>Paylaş</b> → <b>Ana Ekrana Ekle</b>
          </span>
        ) : (
          <span className="text-stone-600">
            Şifa et&apos;i telefonuna kısayol olarak ekle.
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {!isIOS && (
            <button
              onClick={install}
              className="rounded-lg bg-brand-red px-3 py-1 text-xs font-bold text-white hover:bg-brand-red-dark"
            >
              Ekle
            </button>
          )}
          <button
            onClick={dismiss}
            className="text-stone-400 hover:text-brand-red"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
