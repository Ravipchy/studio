
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { chat, type ChatMessage } from '@/ai/flows/chat-flow';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm Arogya Sathi's assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const scrollToBottom = () => {
     setTimeout(() => {
        const scrollViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollViewport) {
          scrollViewport.scrollTo({ top: scrollViewport.scrollHeight, behavior: 'smooth' });
        }
     }, 100)
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom();

    try {
        const history = newMessages.slice(0, -1);
        const response = await chat(userMessage.content, history, 'guest');
        setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
        console.error("Chatbot error:", error);
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
        setIsLoading(false);
        scrollToBottom();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-[350px] h-[500px] mb-4"
            >
              <Card className="h-full flex flex-col shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Arogya Sathi Support</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleOpen}>
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden p-0">
                  <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                       {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-3 py-2 rounded-2xl bg-muted flex items-center gap-2">
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex w-full items-center gap-2"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
        <Button
          onClick={toggleOpen}
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
        >
            {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
        </Button>
        </motion.div>
      </div>
    </>
  );
}
