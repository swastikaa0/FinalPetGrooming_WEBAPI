
"use client";

import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { handleGenerateContent } from "@/lib/actions/ai/gemini-action";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "🐾 Hi! I'm your Pet Care Assistant.\n\nI can help you with grooming services, pet hygiene, nutrition, vaccinations, pet care tips and booking guidance.",
  },
];

const formatMessage = (value: unknown) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return "Sorry, I couldn't generate a response.";
};

export default function AIChatPage() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] =
    useState<ChatMessage[]>(starterMessages);

  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isSending]);

  const handlePromptChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(e.target.value);
  };

  const sendPrompt = async (message: string) => {
    setIsSending(true);

    setChatHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: message,
      },
    ]);

    try {
      const result = await handleGenerateContent(message);

      const response = formatMessage(
        result.data?.candidates?.[0]?.content?.parts?.[0]?.text
      );

      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: result.success
            ? response
            : result.message || "Something went wrong.",
        },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Unknown error occurred.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmed = prompt.trim();

    if (!trimmed || isSending) return;

    setPrompt("");

    await sendPrompt(trimmed);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const quickQuestions = [
    "How often should I groom my dog?",
    "How do I care for my cat?",
    "What grooming services do you provide?",
    "How often should pets be vaccinated?",
    "How do I book a grooming appointment?",
    "What food is good for puppies?",
  ];

  return (
    <main className="min-h-screen bg-[#F6F1E9] py-10 px-5">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐾</div>

          <h1 className="text-4xl font-bold text-[#4A6741]">
            Pet Care Assistant
          </h1>

          <p className="text-gray-600 mt-3">
            Get instant answers about pet grooming, hygiene,
            nutrition and our salon services.
          </p>
        </div>

        {/* Chat Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Top */}

          <div className="bg-[#4A6741] text-white px-6 py-5 flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-3xl">
              
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Pet Assistant
              </h2>

              <p className="text-green-100 text-sm">
                Always ready to help
              </p>
            </div>

          </div>

          {/* Quick Questions */}

          <div className="border-b p-4 flex flex-wrap gap-3 bg-[#faf8f4]">

            {quickQuestions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (!isSending) {
                    sendPrompt(item);
                  }
                }}
                className="rounded-full border border-[#4A6741] px-4 py-2 text-sm text-[#4A6741] hover:bg-[#4A6741] hover:text-white transition"
              >
                {item}
              </button>
            ))}

          </div>

          {/* Messages */}

          <div className="h-[500px] overflow-y-auto bg-[#F9F8F4] p-6">

            <div className="space-y-5">

              {chatHistory.map((message) => (

                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-4 shadow ${
                      message.role === "user"
                        ? "bg-[#4A6741] text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >

                    <p
                      className={`text-xs mb-2 ${
                        message.role === "user"
                          ? "text-green-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.role === "user"
                        ? "You"
                        : "Pet Assistant"}
                    </p>

                    <p className="whitespace-pre-wrap">
                      {message.content}
                    </p>

                  </div>

                </div>

              ))}

              {isSending && (

                <div className="flex justify-start">

                  <div className="bg-white border rounded-xl px-4 py-3 text-gray-500 shadow">
                    🐾 Pet Assistant is typing...
                  </div>

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>

          </div>

          {/* Input */}

          <div className="border-t bg-white p-5">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <textarea
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                rows={3}
                placeholder="Ask anything about your pet..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A6741]"
              />

              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-500">
                  Press Enter to send • Shift + Enter for new line
                </p>

                <button
                  type="submit"
                  disabled={isSending || !prompt.trim()}
                  className="bg-[#4A6741] hover:bg-[#3d5736] text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  {isSending
                    ? "Sending..."
                    : "Send Message"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </main>
  );
}