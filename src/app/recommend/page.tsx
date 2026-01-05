'use client';

import { useState } from 'react';
import { diveSites, activities } from '@/data/mockData';
import styles from './recommend.module.css';

interface Answers {
    visitDate: string;
    groupType: string;
    experience: string;
    interests: string[];
    duration: string;
}

const questions = [
    {
        id: 'visitDate',
        question: 'When are you visiting Aqaba?',
        options: [
            { value: 'today', label: 'Today', icon: '📅' },
            { value: 'this-week', label: 'This Week', icon: '🗓️' },
            { value: 'next-week', label: 'Next Week', icon: '📆' },
            { value: 'planning', label: 'Just Planning', icon: '💭' },
        ],
    },
    {
        id: 'groupType',
        question: "Who's joining you?",
        options: [
            { value: 'solo', label: 'Just Me', icon: '🧑' },
            { value: 'couple', label: 'With Partner', icon: '💑' },
            { value: 'family', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦' },
            { value: 'friends', label: 'Group of Friends', icon: '👥' },
        ],
    },
    {
        id: 'experience',
        question: 'What\'s your water experience level?',
        options: [
            { value: 'none', label: 'Complete Beginner', icon: '🌱' },
            { value: 'snorkeled', label: 'I\'ve Snorkeled Before', icon: '🏊' },
            { value: 'certified', label: 'Certified Diver', icon: '🤿' },
            { value: 'advanced', label: 'Advanced Diver', icon: '🦈' },
        ],
    },
    {
        id: 'interests',
        question: 'What excites you most? (Pick up to 3)',
        multi: true,
        options: [
            { value: 'turtles', label: 'Sea Turtles', icon: '🐢' },
            { value: 'wrecks', label: 'Shipwrecks', icon: '🚢' },
            { value: 'coral', label: 'Coral Gardens', icon: '🪸' },
            { value: 'photography', label: 'Underwater Photos', icon: '📸' },
            { value: 'relaxation', label: 'Relaxation', icon: '😌' },
            { value: 'adventure', label: 'Adventure & Thrills', icon: '🎢' },
        ],
    },
    {
        id: 'duration',
        question: 'How much time do you have?',
        options: [
            { value: 'half-day', label: '2-3 Hours', icon: '⏱️' },
            { value: 'full-day', label: 'Full Day', icon: '☀️' },
            { value: 'multi-day', label: 'Multiple Days', icon: '🏖️' },
        ],
    },
];

export default function RecommendPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({
        visitDate: '',
        groupType: '',
        experience: '',
        interests: [],
        duration: '',
    });
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleAnswer = (value: string) => {
        if (currentQuestion.multi) {
            const currentInterests = answers.interests;
            if (currentInterests.includes(value)) {
                setAnswers({
                    ...answers,
                    interests: currentInterests.filter((i) => i !== value),
                });
            } else if (currentInterests.length < 3) {
                setAnswers({
                    ...answers,
                    interests: [...currentInterests, value],
                });
            }
        } else {
            setAnswers({ ...answers, [currentQuestion.id]: value });

            // Auto-advance after selection (with small delay for feedback)
            setTimeout(() => {
                if (currentStep < questions.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setShowResults(true);
                }
            }, 300);
        }
    };

    const handleMultiNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    const getRecommendations = () => {
        // Simple recommendation logic based on answers
        let recommended = [];

        if (answers.experience === 'none' || answers.experience === 'snorkeled') {
            // Beginners get snorkeling and intro dive
            recommended.push(activities.find(a => a.id === 'snorkel-tour'));
            recommended.push(activities.find(a => a.id === 'intro-dive'));
            recommended.push(diveSites.find(s => s.id === 'japanese-garden'));
        } else if (answers.experience === 'certified') {
            // Certified divers
            recommended.push(diveSites.find(s => s.id === 'cedar-pride'));
            recommended.push(diveSites.find(s => s.id === 'seven-sisters'));
            recommended.push(diveSites.find(s => s.id === 'rainbow-reef'));
        } else {
            // Advanced divers
            recommended.push(diveSites.find(s => s.id === 'gorgonian'));
            recommended.push(diveSites.find(s => s.id === 'cedar-pride'));
            recommended.push(diveSites.find(s => s.id === 'seven-sisters'));
        }

        // Add family-friendly options if with kids
        if (answers.groupType === 'family') {
            recommended = [
                activities.find(a => a.id === 'glass-boat'),
                activities.find(a => a.id === 'snorkel-tour'),
                diveSites.find(s => s.id === 'tank-wreck'),
            ];
        }

        // Add romantic options for couples
        if (answers.groupType === 'couple') {
            recommended.unshift(activities.find(a => a.id === 'sunset-cruise'));
        }

        return recommended.filter(Boolean).slice(0, 3);
    };

    if (showResults) {
        const recommendations = getRecommendations();

        return (
            <div className={styles.page}>
                <div className={styles.resultsContainer}>
                    <div className={styles.resultsHeader}>
                        <span className={styles.resultsEmoji}>✨</span>
                        <h1>Perfect Matches for You!</h1>
                        <p>Based on your preferences, here are our top recommendations</p>
                    </div>

                    <div className={styles.recommendations}>
                        {recommendations.map((item, index) => (
                            <div key={item?.id} className={styles.recCard}>
                                <div className={styles.recNumber}>{index + 1}</div>
                                <div className={styles.recImage}>
                                    <div className={styles.recPlaceholder}>
                                        {'depth' in (item || {}) ? '🤿' : '🌊'}
                                    </div>
                                </div>
                                <div className={styles.recContent}>
                                    <h3>{item?.name}</h3>
                                    <p>{item?.description}</p>
                                    <div className={styles.recMeta}>
                                        <span>⭐ {item?.rating}</span>
                                        <span>⏱️ {item?.duration}</span>
                                        <span className={styles.recPrice}>{item?.price} JOD</span>
                                    </div>
                                    <a href={`/book/${item?.id}`} className="btn btn-primary">
                                        Book This
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setShowResults(false);
                                setCurrentStep(0);
                                setAnswers({
                                    visitDate: '',
                                    groupType: '',
                                    experience: '',
                                    interests: [],
                                    duration: '',
                                });
                            }}
                        >
                            Start Over
                        </button>
                        <a href="/explore" className="btn btn-primary">
                            See All Activities
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.questionContainer}>
                <div className={styles.stepIndicator}>
                    Question {currentStep + 1} of {questions.length}
                </div>

                <h1 className={styles.question}>{currentQuestion.question}</h1>

                <div className={styles.options}>
                    {currentQuestion.options.map((option) => {
                        const isSelected = currentQuestion.multi
                            ? answers.interests.includes(option.value)
                            : answers[currentQuestion.id as keyof Answers] === option.value;

                        return (
                            <button
                                key={option.value}
                                className={`${styles.optionBtn} ${isSelected ? styles.selected : ''}`}
                                onClick={() => handleAnswer(option.value)}
                            >
                                <span className={styles.optionIcon}>{option.icon}</span>
                                <span className={styles.optionLabel}>{option.label}</span>
                                {isSelected && <span className={styles.checkmark}>✓</span>}
                            </button>
                        );
                    })}
                </div>

                {currentQuestion.multi && (
                    <div className={styles.multiActions}>
                        <p className={styles.multiHint}>
                            Selected: {answers.interests.length}/3
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={handleMultiNext}
                            disabled={answers.interests.length === 0}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {currentStep > 0 && (
                    <button
                        className={styles.backBtn}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    >
                        ← Back
                    </button>
                )}
            </div>
        </div>
    );
}
