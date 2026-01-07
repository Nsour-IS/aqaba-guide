'use client';

import styles from './chat-components.module.css';
import Link from 'next/link';

interface ActivityCardProps {
    id: string;
    name: string;
    price: number;
    image?: string;
    rating: number;
    category: string;
}

export default function ChatActivityCard({ id, name, price, rating, category }: ActivityCardProps) {
    return (
        <div className={styles.activityCard}>
            <div className={styles.cardHeader}>
                <span className={styles.categoryBadge}>{category}</span>
                <div className={styles.rating}>⭐ {rating}</div>
            </div>
            <h3>{name}</h3>
            <div className={styles.cardFooter}>
                <div className={styles.price}>
                    <span className={styles.amount}>{price} JOD</span>
                    <span className={styles.label}>/ person</span>
                </div>
                <Link href={`/book/${id}`} className={styles.bookBtn}>
                    Book Now
                </Link>
            </div>
        </div>
    );
}
