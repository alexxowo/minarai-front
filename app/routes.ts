import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("dashboard", "routes/dashboard.tsx", [
        index("routes/dashboard/home.tsx"),
        route("documents", "routes/dashboard/documents.tsx"),
        route("achievements", "routes/dashboard/achievements.tsx"),
        route("students", "routes/dashboard/students.tsx"),
        route("payments", "routes/dashboard/payments.tsx"),
        route("invoices", "routes/dashboard/invoices/index.tsx"),
        route("invoices/create", "routes/dashboard/invoices/create.tsx"),
        route("treasury/payment-methods", "routes/dashboard/treasury/payment-methods.tsx"),
        route("treasury/accounts", "routes/dashboard/treasury/accounts.tsx"),
        route("profile", "routes/dashboard/profile.tsx"),
        route("admin", "routes/dashboard/admin-panel.tsx"),
        route("payments/pending", "routes/dashboard/payments/pending.tsx"),
        route("my-payments", "routes/dashboard/payments/user-list.tsx"),
    ]),
] satisfies RouteConfig;
