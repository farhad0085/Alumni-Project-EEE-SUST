import { toast } from "sonner";

export const showSuccessMessage = (message?: string) => {
  toast.success(message || "Success!", {
    position: "bottom-right",
    duration: 10000,
  });
};

export const showErrorMessage = (message?: string) => {
  toast.error(message || "Something went wrong, please try again later!", {
    position: "bottom-right",
    duration: 10000,
  });
};
