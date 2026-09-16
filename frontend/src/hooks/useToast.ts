"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ToastType = "info" | "success" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const EMPTY: Toast[] = [];

let toasts: Toast[] = EMPTY;
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function dismissToast(id: number) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

export function showToast(message: string, type: ToastType = "info") {
  const toast: Toast = { id: nextId++, message, type };
  toasts = [...toasts, toast];
  emit();
  window.setTimeout(() => dismissToast(toast.id), 3200);
}

export function useToasts(): Toast[] {
  const subscribe = useCallback((listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return useSyncExternalStore(subscribe, () => toasts, () => EMPTY);
}