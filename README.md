This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

📁 Folder Structure

hrms/
├── src/
│   ├── app/                          # App Router - Pages & Routing only
│   │   ├── (auth)/                   # Route group for public pages
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Route group for protected pages
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── employees/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── attendance/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── mark/page.tsx
│   │   │   │   └── reports/page.tsx
│   │   │   ├── leave/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── apply/page.tsx
│   │   │   │   ├── approvals/page.tsx
│   │   │   │   └── history/page.tsx
│   │   │   ├── payroll/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── salary-slip/page.tsx
│   │   │   │   └── process/page.tsx
│   │   │   ├── recruitment/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   └── candidates/page.tsx
│   │   │   ├── performance/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── reviews/page.tsx
│   │   │   │   └── goals/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   └── company/page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/                   # All reusable components
│   │   ├── ui/                       # Atomic UI components
│   │   │   ├── button/Button.tsx
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── table/
│   │   │   ├── card/
│   │   │   ├── toast/
│   │   │   └── datepicker/
│   │   ├── layout/                   # Layout components
│   │   │   ├── sidebar/Sidebar.tsx
│   │   │   ├── navbar/Navbar.tsx
│   │   │   └── breadcrumb/
│   │   ├── features/                 # Feature-specific
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeTable.tsx
│   │   │   │   ├── EmployeeForm.tsx
│   │   │   │   └── EmployeeCard.tsx
│   │   │   ├── leave/LeaveRequestForm.tsx
│   │   │   ├── attendance/
│   │   │   └── dashboard/
│   │   └── shared/                   # Common components
│   ├── lib/                          # Utilities
│   │   ├── api/client.ts
│   │   ├── api/endpoints.ts
│   │   ├── validations/
│   │   └── utils/cn.ts
│   ├── hooks/                        # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useEmployees.ts
│   │   └── useToast.ts
│   ├── store/                        # Zustand stores
│   ├── services/                     # API services
│   ├── types/                        # TypeScript types
│   └── providers/                    # React providers
├── public/
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
└── package.json
