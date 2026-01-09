import { openai } from '@ai-sdk/openai';
import { streamText, createTextStreamResponse } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || messages.length === 0) {
            return new Response('No messages provided', { status: 400 });
        }

        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // Check if we have an API key
        if (process.env.OPENAI_API_KEY) {
            const result = await streamText({
                model: openai('gpt-4o'),
                messages,
                system: `You are the "Aqaba Genie", an expert AI travel guide for Aqaba, Jordan.
        Your goal is to help tourists plan their perfect Red Sea adventure.
        You are enthusiastic, knowledgeable, and helpful.
        Keep responses concise and engaging.`,
            });

            return result.toTextStreamResponse();
        }

        // MOCK MODE (For Demo without API Key)
        let responseText = "I'm the Aqaba Genie! I can help you plan your trip. Ask me about diving, snorkeling, or the weather.";

        if (lastMessage.includes('plan') || lastMessage.includes('trip')) {
            responseText = "I'd love to help you plan! For a 3-day trip, I recommend starting with the Cedar Pride Wreck. \n\nCOMPONENT:ACTIVITY:CEDAR_PRIDE \n\nWould you like me to add this to your itinerary?";
        } else if (lastMessage.includes('wreck') || lastMessage.includes('cedar')) {
            responseText = "The **Cedar Pride** is Aqaba's most famous wreck! It's a Lebanese freighter sunk in 1985. \n\nCOMPONENT:ACTIVITY:CEDAR_PRIDE \n\nI can book a guided dive there for 65 JOD. Interested?";
        } else if (lastMessage.includes('snorkel') || lastMessage.includes('garden')) {
            responseText = "For snorkeling, I highly recommend the **Japanese Garden**. It's shallow and teeming with life! \n\nCOMPONENT:ACTIVITY:JAPANESE_GARDEN \n\nWould you like to see more details?";
        } else if (lastMessage.includes('weather') || lastMessage.includes('safe')) {
            responseText = "The weather in Aqaba is perfect today! \n\nCOMPONENT:WEATHER \n\nIt's a great day for being in the water!";
        }

        // Return a proper text stream response for the AI SDK
        return createTextStreamResponse({
            textStream: new ReadableStream({
                start(controller) {
                    controller.enqueue(responseText);
                    controller.close();
                },
            }),
        });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
