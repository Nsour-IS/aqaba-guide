'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import Navigation from '@/components/Navigation';
import styles from './genie.module.css';

import ChatActivityCard from '@/components/chat/ChatActivityCard';
import ChatWeatherCard from '@/components/chat/ChatWeatherCard';

export default function GeniePage() {
    const { messages, append, isLoading } = useChat({
        api: '/api/chat',
    } as any) as any;

    const [inputValue, setInputValue] = useState('');
    const [itinerary, setItinerary] = useState<string[]>([]);

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript
    } = useVoiceInput();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Simple logic to update itinerary based on messages
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant') {
            if (lastMessage.content.includes('Cedar Pride')) {
                setItinerary(prev => Array.from(new Set([...prev, '🚢 Cedar Pride Wreck'])));
            }
            if (lastMessage.content.includes('Japanese Garden')) {
                setItinerary(prev => Array.from(new Set([...prev, '🐢 Japanese Garden'])));
            }
            if (lastMessage.content.includes('3-day')) {
                setItinerary(prev => Array.from(new Set([...prev, '📅 3-Day Plan'])));
            }
        }
    }, [messages]);

    const handleVoiceClick = () => {
        if (isListening) {
            stopListening();
        } else {
            resetTranscript();
            startListening();
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        const userMessage = inputValue;
        setInputValue('');
        await append({ role: 'user', content: userMessage });
    };

    const renderMessageContent = (content: string) => {
        // Check for special component triggers in the text
        if (content.includes('COMPONENT:ACTIVITY:CEDAR_PRIDE')) {
            return (
                <>
                    <p>I've found the perfect dive for you!</p>
                    <ChatActivityCard
                        id="cedar-pride"
                        name="Cedar Pride Wreck"
                        price={65}
                        rating={4.9}
                        category="Diving"
                    />
                </>
            );
        }
        if (content.includes('COMPONENT:ACTIVITY:JAPANESE_GARDEN')) {
            return (
                <>
                    <p>This is great for snorkeling:</p>
                    <ChatActivityCard
                        id="japanese-garden"
                        name="Japanese Garden"
                        price={45}
                        rating={4.8}
                        category="Snorkeling"
                    />
                </>
            );
        }
        if (content.includes('COMPONENT:WEATHER')) {
            return (
                <>
                    <p>Here is the current report:</p>
                    <ChatWeatherCard temp={24} condition="Sunny & Calm" icon="☀️" />
                </>
            );
        }
        return content;
    };

    return (
        <div className={styles.page}>
            <Navigation />

            <div className={styles.mainLayout}>
                {/* Left Sidebar: Itinerary */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h3>📍 Live Itinerary</h3>
                    </div>
                    <div className={styles.itineraryList}>
                        {itinerary.length === 0 ? (
                            <p className={styles.emptyItinerary}>Your plan will appear here as we talk...</p>
                        ) : (
                            itinerary.map((item, i) => (
                                <div key={i} className={styles.itineraryItem}>
                                    {item}
                                </div>
                            ))
                        )}
                    </div>
                    {itinerary.length > 0 && (
                        <button className={styles.saveBtn}>Save to My Trips</button>
                    )}
                </aside>

                {/* Main Chat Area */}
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.avatar}>🧞‍♂️</div>
                        <div>
                            <h1>Aqaba Genie</h1>
                            <p>Your AI Guide to the Red Sea</p>
                        </div>
                    </div>

                    <div className={styles.chatWindow}>
                        {messages.length === 0 && (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>✨</span>
                                <h2>How can I help you today?</h2>
                                <p>Ask me about dive sites, weather, or plan a full trip!</p>
                                <div className={styles.suggestions}>
                                    <button onClick={() => setInputValue("Plan a 3-day diving trip for beginners")}>
                                        📅 Plan a 3-day trip
                                    </button>
                                    <button onClick={() => setInputValue("What's the best wreck dive here?")}>
                                        ⚓ Best wreck dive?
                                    </button>
                                    <button onClick={() => setInputValue("Is it safe to snorkel today?")}>
                                        🌊 Snorkeling conditions
                                    </button>
                                </div>
                            </div>
                        )}

                        {messages.map((m: any) => (
                            <div
                                key={m.id}
                                className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                            >
                                <div className={styles.messageContent}>
                                    {renderMessageContent(m.content)}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className={`${styles.message} ${styles.aiMessage}`}>
                                <div className={styles.typingIndicator}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className={styles.inputArea}>
                        <button
                            type="button"
                            className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
                            onClick={handleVoiceClick}
                        >
                            {isListening ? (
                                <span className={styles.waveform}>
                                    <span className={styles.bar}></span>
                                    <span className={styles.bar}></span>
                                    <span className={styles.bar}></span>
                                </span>
                            ) : '🎤'}
                        </button>
                        <input
                            className={styles.input}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Type or speak your question..."}
                        />
                        <button
                            type="submit"
                            className={styles.sendButton}
                            disabled={!inputValue.trim() || isLoading}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

