'use client';

import { useState } from 'react';
import { diveSites, activities, categories, DiveSite, Activity } from '@/data/mockData';
import styles from './explore.module.css';

type CategoryFilter = 'all' | 'diving' | 'snorkeling' | 'boat-tour' | 'water-sports';

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const allItems = [...diveSites, ...activities];

    const filteredItems = allItems.filter(item => {
        // Category filter
        if (activeCategory !== 'all') {
            const category = 'category' in item
                ? item.category.toLowerCase().replace(' ', '-')
                : 'diving';
            if (category !== activeCategory) return false;
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);
        }

        return true;
    });

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
                    {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} found
                </p>

                <div className={styles.grid}>
                    {filteredItems.map((item) => (
                        <ActivityCard key={item.id} item={item} />
                    ))}
                </div>
            </main>
        </div>
    );
}

function ActivityCard({ item }: { item: DiveSite | Activity }) {
    const isDiveSite = 'depth' in item;

    return (
        <article className={styles.card}>
            <div className={styles.cardImage}>
                {/* Placeholder gradient for now */}
                <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderIcon}>
                        {isDiveSite ? '🤿' : ('category' in item ? getCategoryIcon(item.category) : '🌊')}
                    </span>
                </div>
                {'difficulty' in item && (
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
                        <span className={styles.reviewCount}>({item.reviewCount})</span>
                    </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.meta}>
                    {isDiveSite && (
                        <>
                            <span className={styles.metaItem}>🌊 {item.depth}</span>
                            <span className={styles.metaItem}>⏱️ {item.duration}</span>
                        </>
                    )}
                    {'category' in item && (
                        <span className={styles.metaItem}>⏱️ {item.duration}</span>
                    )}
                </div>

                {isDiveSite && (
                    <div className={styles.marineLife}>
                        {item.marineLife.slice(0, 3).map((life) => (
                            <span key={life} className={styles.marineTag}>{life}</span>
                        ))}
                        {item.marineLife.length > 3 && (
                            <span className={styles.marineTag}>+{item.marineLife.length - 3}</span>
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
