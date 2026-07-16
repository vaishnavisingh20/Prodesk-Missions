export function redirectByRole(
  role: "admin" | "client"
) {
  switch (role) {
    case "admin":
      return "/admin/dashboard";

    case "client":
      return "/client/dashboard";

    default:
      return "/login";
  }
}