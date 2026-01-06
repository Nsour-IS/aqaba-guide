'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import styles from "@/app/page.module.css"; // We'll reuse the existing styles

export default function Navigation() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        // Check active session
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        getUser();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className={styles.nav}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🌊</span>
                    <span>Aqaba Guide</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/explore">Explore</Link>
                    <Link href="/recommend">AI Planner</Link>

                    {user ? (
                        <>
                            <span className={styles.userGreeting}>
                                Hi, {user.email?.split('@')[0]}
                            </span>
                            <button onClick={handleSignOut} className={styles.signOutBtn}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login">Sign In</Link>
                    )}

                    <Link href="/explore" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
