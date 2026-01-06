'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import styles from './login.module.css';

export default function LoginPage() {
    const supabase = createClient();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.logo}>🌊</span>
                    <h1>Welcome Back</h1>
                    <p>Sign in to save your trips and manage bookings</p>
                </div>

                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#0077BE',
                                    brandAccent: '#005fa3',
                                    inputBackground: 'white',
                                    inputText: '#1a1a1a',
                                    inputBorder: '#e5e5e5',
                                    inputBorderFocus: '#0077BE',
                                    inputBorderHover: '#0077BE',
                                },
                                radii: {
                                    borderRadiusButton: '0.5rem',
                                    buttonBorderRadius: '0.5rem',
                                    inputBorderRadius: '0.5rem',
                                },
                            },
                        },
                        className: {
                            button: styles.authButton,
                            input: styles.authInput,
                            label: styles.authLabel,
                        }
                    }}
                    providers={['google', 'facebook']}
                    redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
                />
            </div>
        </div>
    );
}
