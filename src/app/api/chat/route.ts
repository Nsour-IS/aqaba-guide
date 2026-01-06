import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // Check if we have an API key
    if (process.env.OPENAI_API_KEY) {
        const result = await streamText({
            model: openai('gpt-4o'),
            messages,
            system: `You are the "Aqaba Genie", an expert AI travel guide for Aqaba, Jordan.
      Your goal is to help tourists plan their perfect Red Sea adventure.
      You are enthusiastic, knowledgeable, and helpful.
      You know everything about diving, snorkeling, and local culture.
      Keep responses concise and engaging.`,
        });

        return result.toTextStreamResponse();
    }

    // MOCK MODE (For Demo without API Key)
    // This simulates a real AI response based on keywords

    let responseText = "I'm the Aqaba Genie! I can help you plan your trip. Ask me about diving, snorkeling, or the weather.";

    if (lastMessage.includes('plan') || lastMessage.includes('trip')) {
        responseText = "I'd love to help you plan! For a 3-day trip, I recommend:\n\n**Day 1:** Start with a check-dive at *Seven Sisters* to get comfortable.\n**Day 2:** Explore the famous *Cedar Pride Wreck* in the morning.\n**Day 3:** Relax with a sunset cruise and snorkeling at the *Japanese Garden*.\n\nWould you like me to book any of these for you?";
    } else if (lastMessage.includes('wreck') || lastMessage.includes('cedar')) {
        responseText = "The **Cedar Pride** is Aqaba's most famous wreck! It's a Lebanese freighter sunk in 1985 by King Abdullah II. It lies at 25m depth and is covered in beautiful soft corals. It's perfect for intermediate divers. \n\nI can book a guided dive there for 65 JOD. Interested?";
    } else if (lastMessage.includes('snorkel') || lastMessage.includes('family')) {
        responseText = "For snorkeling, especially with family, I highly recommend the **Japanese Garden**. It's shallow (2-6m), has calm water, and is teeming with colorful fish and turtles! \n\nAnother great option is a Glass Bottom Boat tour if you prefer to stay dry.";
    } else if (lastMessage.includes('weather') || lastMessage.includes('safe')) {
        responseText = "The weather in Aqaba is currently sunny with a gentle breeze (10 knots). \n\n🌊 **Sea Conditions:** Calm\n🌡️ **Water Temp:** 24°C\n\nIt's a perfect day for being in the water!";
    }

    // Simulate streaming delay for realism
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            const tokens = responseText.split(' ');
            for (const token of tokens) {
                controller.enqueue(encoder.encode(token + ' '));
                await new Promise(r => setTimeout(r, 50 + Math.random() * 50)); // Random typing delay
            }
            controller.close();
        },
    });

    return new Response(stream);
}
