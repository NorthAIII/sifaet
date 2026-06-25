"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "sifaet-cart-v1";

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; line: CartLine }
  | { type: "setQty"; productSlug: string; weightLabel: string; quantity: number }
  | { type: "remove"; productSlug: string; weightLabel: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function sameLine(a: CartLine, b: { productSlug: string; weightLabel: string }) {
  return a.productSlug === b.productSlug && a.weightLabel === b.weightLabel;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const existing = state.lines.find((l) => sameLine(l, action.line));
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            sameLine(l, action.line)
              ? { ...l, quantity: l.quantity + action.line.quantity }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "setQty": {
      if (action.quantity <= 0) {
        return {
          lines: state.lines.filter((l) => !sameLine(l, action)),
        };
      }
      return {
        lines: state.lines.map((l) =>
          sameLine(l, action) ? { ...l, quantity: action.quantity } : l,
        ),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => !sameLine(l, action)) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  add: (line: CartLine) => void;
  setQty: (productSlug: string, weightLabel: string, quantity: number) => void;
  remove: (productSlug: string, weightLabel: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  // localStorage'tan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      // sessizce geç
    }
  }, []);

  // localStorage'a kaydet
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // sessizce geç
    }
  }, [state.lines]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((n, l) => n + l.quantity, 0);
    const total = state.lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    return {
      lines: state.lines,
      itemCount,
      total,
      add: (line) => dispatch({ type: "add", line }),
      setQty: (productSlug, weightLabel, quantity) =>
        dispatch({ type: "setQty", productSlug, weightLabel, quantity }),
      remove: (productSlug, weightLabel) =>
        dispatch({ type: "remove", productSlug, weightLabel }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
