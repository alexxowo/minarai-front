import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("dashboard", "routes/dashboard.tsx", [
        // Student/User Routes
        index("routes/dashboard/home.tsx"),
        route("documents", "routes/dashboard/documents.tsx"),
        route("documents/:studentId", "routes/dashboard/documents/student-docs.tsx"),
        route("achievements", "routes/dashboard/achievements.tsx"),
        route("achievements/:studentId", "routes/dashboard/achievements/timeline.tsx"),
        route("my-payments", "routes/dashboard/payments/user-list.tsx"),
        route("profile", "routes/dashboard/profile.tsx"),

        // Usuario unicamente entra a esta ruta
        route("students/:studentId", "routes/dashboard/students/profile.tsx"),
        
        // Admin Only Routes
        layout("routes/dashboard/admin-guard.tsx", [
            route("students", "routes/dashboard/students.tsx"),
            route("payments", "routes/dashboard/payments.tsx"),
            route("payments/pending", "routes/dashboard/payments/pending.tsx"),
            route("invoices", "routes/dashboard/invoices/index.tsx"),
            route("invoices/create", "routes/dashboard/invoices/create.tsx"),
            route("treasury/payment-methods", "routes/dashboard/treasury/payment-methods.tsx"),
            route("treasury/accounts", "routes/dashboard/treasury/accounts.tsx"),
            route("users", "routes/dashboard/users/index.tsx"),
            route("users/:userId", "routes/dashboard/users/user-profile.tsx"),
            route("users/create", "routes/dashboard/users/create.tsx"),
            route("admin", "routes/dashboard/admin-panel.tsx"),
            route("system", "routes/dashboard/system.tsx"),
            route("management/bulk-operations", "routes/dashboard/management/bulk-operations.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
