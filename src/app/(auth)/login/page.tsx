"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("youssef@acmecloud.com");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md">
            <Zap className="h-6 w-6 text-emerald-400 fill-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Sign in to BusinessOS
          </h1>
          <p className="text-xs text-neutral-500">
            Isolated Enterprise Tenant Portal &bull; Acme Cloud Technologies
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 text-left shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Work Email Address:
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Password:
                </label>
                <a href="#" className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="button" onClick={() => router.push('/')} className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" size="lg">
              <span>Explore Live Demo Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button type="submit" variant="outline" className="w-full gap-2" size="sm">
              <span>Sign In to Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6 text-center text-xs">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <span className="relative bg-white px-2 text-neutral-400 dark:bg-neutral-900">
              or continue with SSO
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Workspace Login</span>
          </Button>
        </Card>

        <p className="text-xs text-neutral-400">
          Built by Youssef Manssouri &bull; BusinessOS Enterprise v1.0.0
        </p>
      </div>
    </div>
  );
}
