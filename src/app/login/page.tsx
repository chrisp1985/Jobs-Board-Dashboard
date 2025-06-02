'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
  useEffect(() => {
    signIn('keycloak');
  }, []);

  return <p>Redirecting to login...</p>;
}