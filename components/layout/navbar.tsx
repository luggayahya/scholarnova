'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase';
import { LogOut, Sparkles } from 'lucide-react';

export default function Navbar() {
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl">
          <Sparkles className="text-violet-600" />
          ScholarNova
        </Link>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}