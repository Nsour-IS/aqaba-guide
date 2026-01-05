// Mock data for dive sites and activities
export interface DiveSite {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    depth: 'Shallow' | 'Medium' | 'Deep';
    marineLife: string[];
    rating: number;
    reviewCount: number;
    price: number;
    duration: string;
    bestTime: string;
}

export interface Activity {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: 'Diving' | 'Snorkeling' | 'Boat Tour' | 'Water Sports';
    price: number;
    duration: string;
    rating: number;
    reviewCount: number;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const diveSites: DiveSite[] = [
    {
        id: 'cedar-pride',
        name: 'Cedar Pride Wreck',
        description: 'A legendary 74-meter Lebanese freighter resting on its side at 25 meters. Home to lionfish, groupers, and stunning soft corals.',
        imageUrl: '/images/cedar-pride.jpg',
        difficulty: 'Intermediate',
        depth: 'Medium',
        marineLife: ['Lionfish', 'Groupers', 'Soft Corals', 'Barracuda'],
        rating: 4.9,
        reviewCount: 245,
        price: 65,
        duration: '2-3 hours',
        bestTime: 'Morning',
    },
    {
        id: 'japanese-garden',
        name: 'Japanese Garden',
        description: 'Beautiful coral formations resembling a manicured garden. Perfect for beginners with shallow depths and calm waters.',
        imageUrl: '/images/japanese-garden.jpg',
        difficulty: 'Beginner',
        depth: 'Shallow',
        marineLife: ['Sea Turtles', 'Clownfish', 'Hard Corals', 'Moray Eels'],
        rating: 4.8,
        reviewCount: 312,
        price: 45,
        duration: '2 hours',
        bestTime: 'Any time',
    },
    {
        id: 'rainbow-reef',
        name: 'Rainbow Reef',
        description: 'Vibrant coral reef teeming with colorful fish. Named for the spectrum of colors you\'ll encounter.',
        imageUrl: '/images/rainbow-reef.jpg',
        difficulty: 'Beginner',
        depth: 'Shallow',
        marineLife: ['Anthias', 'Butterflyfish', 'Parrotfish', 'Sea Stars'],
        rating: 4.7,
        reviewCount: 189,
        price: 40,
        duration: '1.5 hours',
        bestTime: 'Afternoon',
    },
    {
        id: 'seven-sisters',
        name: 'Seven Sisters',
        description: 'Seven coral pinnacles rising from the sandy bottom, each hosting unique marine communities.',
        imageUrl: '/images/seven-sisters.jpg',
        difficulty: 'Intermediate',
        depth: 'Medium',
        marineLife: ['Rays', 'Nudibranchs', 'Octopus', 'Scorpionfish'],
        rating: 4.8,
        reviewCount: 156,
        price: 55,
        duration: '2 hours',
        bestTime: 'Morning',
    },
    {
        id: 'tank-wreck',
        name: 'The Tank (Military Museum)',
        description: 'Unique underwater military museum featuring a sunken tank and armored vehicles. An unforgettable experience.',
        imageUrl: '/images/tank-wreck.jpg',
        difficulty: 'Beginner',
        depth: 'Shallow',
        marineLife: ['Anemones', 'Damselfish', 'Cardinalfish'],
        rating: 4.6,
        reviewCount: 278,
        price: 50,
        duration: '1.5 hours',
        bestTime: 'Any time',
    },
    {
        id: 'gorgonian',
        name: 'Gorgonian I & II',
        description: 'Famous for spectacular gorgonian sea fans and black coral. Advanced dive with stronger currents.',
        imageUrl: '/images/gorgonian.jpg',
        difficulty: 'Advanced',
        depth: 'Deep',
        marineLife: ['Gorgonian Fans', 'Black Coral', 'Sharks', 'Eagle Rays'],
        rating: 4.9,
        reviewCount: 98,
        price: 85,
        duration: '3 hours',
        bestTime: 'Early morning',
    },
];

export const activities: Activity[] = [
    {
        id: 'intro-dive',
        name: 'Discover Scuba Diving',
        description: 'Your first breath underwater! No experience needed. Includes full instruction and equipment.',
        imageUrl: '/images/intro-dive.jpg',
        category: 'Diving',
        price: 75,
        duration: '3 hours',
        rating: 4.9,
        reviewCount: 423,
        difficulty: 'Beginner',
    },
    {
        id: 'snorkel-tour',
        name: 'Snorkeling Adventure',
        description: 'Explore multiple snorkeling spots with a guide. See turtles, colorful fish, and pristine reefs.',
        imageUrl: '/images/snorkel-tour.jpg',
        category: 'Snorkeling',
        price: 35,
        duration: '2 hours',
        rating: 4.7,
        reviewCount: 567,
    },
    {
        id: 'glass-boat',
        name: 'Glass Bottom Boat Tour',
        description: 'Perfect for non-swimmers! See the underwater world through the boat\'s glass floor.',
        imageUrl: '/images/glass-boat.jpg',
        category: 'Boat Tour',
        price: 25,
        duration: '1.5 hours',
        rating: 4.5,
        reviewCount: 312,
    },
    {
        id: 'sunset-cruise',
        name: 'Sunset Yacht Cruise',
        description: 'Romantic sunset cruise with refreshments. Watch the sun set over the Red Sea mountains.',
        imageUrl: '/images/sunset-cruise.jpg',
        category: 'Boat Tour',
        price: 55,
        duration: '2.5 hours',
        rating: 4.8,
        reviewCount: 234,
    },
    {
        id: 'jet-ski',
        name: 'Jet Ski Adventure',
        description: 'Feel the adrenaline! Explore Aqaba\'s coastline on a powerful jet ski with safety briefing included.',
        imageUrl: '/images/jet-ski.jpg',
        category: 'Water Sports',
        price: 45,
        duration: '30 mins',
        rating: 4.6,
        reviewCount: 189,
    },
    {
        id: 'parasailing',
        name: 'Parasailing Experience',
        description: 'Soar above the Red Sea and enjoy breathtaking views of Aqaba, Eilat, and Saudi Arabia.',
        imageUrl: '/images/parasailing.jpg',
        category: 'Water Sports',
        price: 60,
        duration: '15 mins flight',
        rating: 4.7,
        reviewCount: 145,
    },
];

export const categories = [
    { id: 'all', name: 'All Activities', icon: '✨' },
    { id: 'diving', name: 'Diving', icon: '🤿' },
    { id: 'snorkeling', name: 'Snorkeling', icon: '🏊' },
    { id: 'boat-tour', name: 'Boat Tours', icon: '🚤' },
    { id: 'water-sports', name: 'Water Sports', icon: '🏄' },
];
