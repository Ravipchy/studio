
'use server';
/**
 * @fileOverview A chatbot flow for Arogya Sathi.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const faqQuestions = {
    "book doctor": "You can book a doctor by navigating to the 'Find Nearby Doctor' page, searching for a specialist, viewing their profile, and then booking an available time slot.",
    "order medicine": "To order medicine, go to the 'Pharmacy' section, search for your required medicines, add them to your cart, and proceed to checkout. You can also upload a prescription.",
    "view reports": "You can view your medical reports in the 'Health Record' section. All your uploaded and lab-generated reports are available there.",
    "telemedicine": "For a telemedicine consultation, visit the 'Telemedicine' page, choose a doctor, and book a video consultation slot. You can then join the call from your dashboard at the scheduled time."
};

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  message: z.string(),
  history: z.array(ChatMessageSchema),
  role: z.string().optional(),
});

export async function chat(message: string, history: ChatMessage[], role?: string) {
  return await chatFlow({ message, history, role });
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    // Simple FAQ check
    const lowerCaseMessage = input.message.toLowerCase();
    for (const keyword in faqQuestions) {
        if (lowerCaseMessage.includes(keyword)) {
            return faqQuestions[keyword as keyof typeof faqQuestions];
        }
    }

    const { output } = await ai.generate({
      prompt: `You are Arogya Sathi's friendly and helpful AI assistant. Your goal is to assist users with their questions about the platform's services.
      
      Keep your answers concise, helpful, and friendly.
      
      User's role: ${input.role || 'guest'}

      Services offered: Find Nearby Doctor, Book Ambulance, View Medical Report, Telemedicine, Pharmacy, Home Care, Lab Tests, Mental Health.

      If the user asks about something outside of Arogya Sathi's services, politely decline to answer.
      
      Here is the conversation history:
      ${input.history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      New user message:
      user: ${input.message}
      model:`,
      history: input.history,
      config: {
        maxOutputTokens: 150,
      }
    });
    return output?.text ?? "I'm sorry, I'm not sure how to respond to that.";
  }
);
