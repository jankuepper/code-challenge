import { useAuth } from "@/components/authProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const updateOptions = (options: any) => {
  const update = { ...options };
  const { token } = useAuth();
  if (token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return update;
};
export function fetchWithAuth(url: string, options: any) {
  return fetch(url, updateOptions(options));
}
