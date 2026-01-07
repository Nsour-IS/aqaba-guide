'use client';

import styles from './chat-components.module.css';

interface WeatherCardProps {
    temp: number;
    condition: string;
    icon: string;
}

export default function ChatWeatherCard({ temp, condition, icon }: WeatherCardProps) {
    return (
        <div className={styles.weatherCard}>
            <div className={styles.weatherIcon}>{icon}</div>
            <div>
                <p className={styles.temp}>{temp}°C</p>
                <p className={styles.condition}>{condition}</p>
            </div>
        </div>
    );
}
