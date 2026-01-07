'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import Navigation from '@/components/Navigation';
import styles from './genie.module.css';

export default function GeniePage() {
    // We only use messages, append, and isLoading from useChat
    const { messages, append, isLoading } = useChat({
        api: '/api/chat',
    } as any) as any;

    // Manage input state manually to avoid SDK issues
    const [inputValue, setInputValue] = useState('');

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript
    } = useVoiceInput();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sync voice transcript with input field
    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        setInputValue(''); // Clear input immediately

        // Send to AI
        await append({
            role: 'user',
            content: userMessage,
        });
    };

    const handleSuggestionClick = (text: string) => {
        setInputValue(text);
    };

    return (
        <div className={styles.page}>
            <Navigation />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.avatar}>🧞‍♂️</div>
                    <div>
                        <h1>Aqaba Genie</h1>
                        <p>Your AI Guide to the Red Sea</p>
                    </div>
                </div>

                {/* Chat Area */}
                <div className={styles.chatWindow}>
                    {messages.length === 0 && (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>✨</span>
                            <h2>How can I help you today?</h2>
                            <p>Ask me about dive sites, weather, or plan a full trip!</p>
                            <div className={styles.suggestions}>
                                <button onClick={() => handleSuggestionClick("Plan a 3-day diving trip for beginners")}>
                                    📅 Plan a 3-day trip
                                </button>
                                <button onClick={() => handleSuggestionClick("What's the best wreck dive here?")}>
                                    ⚓ Best wreck dive?
                                </button>
                                <button onClick={() => handleSuggestionClick("Is it safe to snorkel today?")}>
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
                                {m.content}
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

                {/* Input Area */}
                <form onSubmit={handleSend} className={styles.inputArea}>
                    <button
                        type="button"
                        className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
                        onClick={handleVoiceClick}
                        title={isListening ? "Stop listening" : "Start voice input"}
                    >
                        {isListening ? (
                            <span className={styles.waveform}>
                                <span className={styles.bar}></span>
                                <span className={styles.bar}></span>
                                <span className={styles.bar}></span>
                            </span>
                        ) : (
                            '🎤'
                        )}
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
    );
}
