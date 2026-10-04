# MyNaksh AI Conversation Experience

An extensible, production-ready AI conversation interface built with **React Native (Expo)** and **TypeScript**. The architecture supports dynamic, polymorphic recommendations (Gemstones, Tarot, Consultations, Articles) and interactive chat capabilities.

---

## 🏗 Project Structure

```text
mynaksh-ai-chat-experience/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatTimeline.tsx         # Virtualized timeline with auto-scroll
│   │   │   ├── MessageComposer.tsx      # Input bar & reply preview
│   │   │   ├── FeedbackRow.tsx          # Thumbs rating & dynamic feedback chips
│   │   │   ├── MessageActionsModal.tsx  # Long-press action sheet (Reply/Copy/Delete)
│   │   │   └── ChatStates.tsx           # Initial Loading, Empty, and Error states
│   │   ├── messages/
│   │   │   └── MessageItem.tsx          # Polymorphic message router (Factory Pattern)
│   │   └── recommendations/
│   │       ├── cards.tsx                # Distinct card components & generic fallback
│   │       └── RecommendationCarousel.tsx # Extensible card registry & horizontal list
│   ├── data/
│   │   └── mockData.ts                  # Prescribed initial conversation payload
│   ├── store/
│   │   └── chatStore.ts                 # Zustand store managing timeline state & actions
│   └── types/
│       └── chat.ts                      # Strict domain interfaces
├── App.tsx                              # Main container with demo state switcher
└── README.md


📱 How to Run the Project:
1. Install Dependencies: npm install
2.Start the Expo Development Server: npx expo start.
3. Run on Device or Simulator:Or scan the terminal QR code using the Expo Go app on your iOS or Android physical device.