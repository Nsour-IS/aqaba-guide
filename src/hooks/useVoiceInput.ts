'use client';

import { useState, useEffect, useCallback } from 'react';

export function useVoiceInput() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            // @ts-ignore
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognition.onresult = (event: any) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                setTranscript(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setError(event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognition);
        } else {
            setError('Speech recognition not supported in this browser.');
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error(e);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        resetTranscript
    };
}
