import { toast } from "react-toastify";

export async function tryCatch<T>(
  fn: () => Promise<T>,
  errorMessage = "Something went wrong"
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error: any) {
    // console.error("API error:", error);
    toast.error(error?.message || errorMessage);
    return undefined;
  }
}
