
import type { User } from './types';

export const USERS: Record<string, User> = {
  new: {
    id: 'new',
    name: 'Alex Doe',
    avatarUrl: 'https://placehold.co/100x100.png',
    currentTier: 'PT',
    currentEarnings: 75.5,
    lifetimeEarnings: 75.5,
    eventsAdded: 3,
    upcomingPayout: 0,
    referralCode: 'ALEXDOE10',
  },
  experienced: {
    id: 'experienced',
    name: 'Jessica Wang',
    avatarUrl: 'https://placehold.co/100x100.png',
    currentTier: 'DPCA',
    currentEarnings: 1850.75,
    lifetimeEarnings: 7540.25,
    eventsAdded: 42,
    upcomingPayout: 1250.00,
    referralCode: 'JESSWANG25',
  },
};

// This function would in a real app fetch the user from a database.
// For now, we'll use a simple toggle or URL parameter.
export function getCurrentUser(): User {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('user') as keyof typeof USERS;
        if (userId && USERS[userId]) {
            return USERS[userId];
        }
    }
    // Default to the experienced user.
    return USERS.experienced;
}
