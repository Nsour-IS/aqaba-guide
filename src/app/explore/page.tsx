'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './explore.module.css';

// Define types based on our database schema
interface Activity {
    id: string;
    name: string;
    description: string;
    image_url: string;
    category: string;
    price: number;
    duration: string;
    difficulty?: string;
    depth?: string;
    rating: number;
    review_count: number;
    marine_life?: string[];
}

type CategoryFilter = 'all' | 'diving' | 'snorkeling' | 'boat-tour' | 'water-sports';

const categories = [
    { id: 'all', name: 'All Activities', icon: '✨' },
    { id: 'diving', name: 'Diving', icon: '🤿' },
    { id: 'snorkeling', name: 'Snorkeling', icon: '🏊' },
    { id: 'boat-tour', name: 'Boat Tours', icon: '🚤' },
    { id: 'water-sports', name: 'Water Sports', icon: '🏄' },
];

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchActivities() {
            setLoading(true);
            let query = supabase.from('activities').select('*');

            if (activeCategory !== 'all') {
                // Map category IDs to database values
                const categoryMap: Record<string, string> = {
                    'diving': 'Diving',
                    'snorkeling': 'Snorkeling',
                    'boat-tour': 'Boat Tour',
                    'water-sports': 'Water Sports'
                };
                query = query.eq('category', categoryMap[activeCategory]);
            }

            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching activities:', error);
            } else {
                setActivities(data || []);
            }
            setLoading(false);
        }

        // Debounce search
        const timer = setTimeout(() => {
            fetchActivities();
        }, 300);

        return () => clearTimeout(timer);
    }, [activeCategory, searchQuery]);

    return (
        <div className={styles.explorePage}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <h1>Explore Aqaba</h1>
                    <p>Discover diving sites, snorkeling spots, and marine adventures</p>

                    {/* Search Bar */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search activities, dive sites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                </div>
            </header>

            {/* Category Filters */}
            <nav className={styles.categoryNav}>
                <div className="container">
                    <div className={styles.categories}>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                            >
                                <span className={styles.categoryIcon}>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Results */}
            <main className={`container ${styles.results}`}>
                <p className={styles.resultCount}>
                    {loading ? 'Loading...' : `${activities.length} ${activities.length === 1 ? 'result' : 'results'} found`}
                </p>

                {loading ? (
                    <div className={styles.loading}>Loading activities...</div>
                ) : (
                    <div className={styles.grid}>
                        {activities.map((item) => (
                            <ActivityCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function ActivityCard({ item }: { item: Activity }) {
    const isDiveSite = item.category === 'Diving' && item.depth;

    return (
        <article className={styles.card}>
            <div className={styles.cardImage}>
                {/* Placeholder gradient for now */}
                <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderIcon}>
                        {getCategoryIcon(item.category)}
                    </span>
                </div>
                {item.difficulty && (
                    <span className={`${styles.badge} ${styles[item.difficulty.toLowerCase()]}`}>
                        {item.difficulty}
                    </span>
                )}
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3>{item.name}</h3>
                    <div className={styles.rating}>
                        <span className={styles.star}>⭐</span>
                        <span>{item.rating}</span>
                        <span className={styles.reviewCount}>({item.review_count})</span>
                    </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.meta}>
                    {item.depth && <span className={styles.metaItem}>🌊 {item.depth}</span>}
                    <span className={styles.metaItem}>⏱️ {item.duration}</span>
                </div>

                {item.marine_life && item.marine_life.length > 0 && (
                    <div className={styles.marineLife}>
                        {item.marine_life.slice(0, 3).map((life) => (
                            <span key={life} className={styles.marineTag}>{life}</span>
                        ))}
                        {item.marine_life.length > 3 && (
                            <span className={styles.marineTag}>+{item.marine_life.length - 3}</span>
                        )}
                    </div>
                )}

                <div className={styles.cardFooter}>
                    <div className={styles.price}>
                        <span className={styles.priceValue}>{item.price} JOD</span>
                        <span className={styles.priceLabel}>per person</span>
                    </div>
                    <a href={`/book/${item.id}`} className="btn btn-primary">
                        Book Now
                    </a>
                </div>
            </div>
        </article>
    );
}

function getCategoryIcon(category: string): string {
    switch (category) {
        case 'Diving': return '🤿';
        case 'Snorkeling': return '🏊';
        case 'Boat Tour': return '🚤';
        case 'Water Sports': return '🏄';
        default: return '🌊';
    }
}
