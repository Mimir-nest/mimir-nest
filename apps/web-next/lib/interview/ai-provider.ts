/**
 * Mimir Interview AI Provider Abstraction
 *
 * Provides a decoupled interface for voice, speech recognition,
 * reasoning, question generation, and text-to-speech synthesis.
 *
 * Future implementations can plug in Sarvam for Indian language
 * ASR/TTS, OpenAI / Anthropic for code reasoning, etc.
 */

export interface ProjectContext {
  repoUrl: string;
  projectName: string;
  techStack: string[];
  architectureSummary?: string;
  filesInspected?: string[];
  keyEndpoints?: string[];
}

export interface ConversationTurn {
  role: "interviewer" | "candidate";
  text: string;
  timestamp: number;
  durationSeconds?: number;
  audioBlobUrl?: string;
}

export interface AnswerEvaluation {
  depthScore: number; // 1-10
  tradeoffsRecognized: boolean;
  failureModesAddressed: boolean;
  clarity: "sharp" | "vague" | "evasive" | "insightful";
  feedbackNote: string;
}

export interface AIProvider {
  /**
   * Transcribes incoming audio stream to text (supports English, Hindi, Hinglish)
   */
  speechToText(audioStream: MediaStream | Blob): Promise<string>;

  /**
   * Generates the initial project-aware interview question based on GitHub context
   */
  generateQuestion(
    context: ProjectContext,
    history: ConversationTurn[]
  ): Promise<string>;

  /**
   * Evaluates the candidate's answer against codebase claims
   */
  evaluateAnswer(
    answer: string,
    context: ProjectContext,
    history: ConversationTurn[]
  ): Promise<AnswerEvaluation>;

  /**
   * Formulates the adaptive follow-up question or probe
   */
  generateResponse(
    evaluation: AnswerEvaluation,
    history: ConversationTurn[],
    context: ProjectContext
  ): Promise<string>;

  /**
   * Synthesizes natural spoken audio response from text
   */
  textToSpeech(
    text: string,
    options?: { language?: "en-IN" | "hi-IN" | "hinglish"; voice?: string }
  ): Promise<ArrayBuffer | Blob>;
}
