import type { Component } from "solid-js";

const LessonChunkingStrategiesContextWindowManagementAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Context Window Management at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Allocation Problem:</strong>
            Even after chunking documents into retrievable units, you face a
            second challenge: deciding how to spend your limited context window
            tokens across competing needs. A 128k token context window seems
            large until you realize it must hold system instructions, tool
            definitions, retrieved document chunks, conversation history, and
            the user query itself.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Token Budgeting in Practice
            </p>
            <p style="margin-top: 0">
              Production systems explicitly allocate token budgets before making
              LLM calls. A typical breakdown for a 128k context model serving an
              internal assistant might look like this: 4k tokens for system
              prompts and tool schemas, 2k for the current user question and
              clarifications, 80k for retrieved document chunks, and 42k for
              recent conversation history. The math drives architecture
              decisions. If each chunk averages 500 tokens and you have 80k
              tokens available, you can theoretically fit 160 chunks. However,
              most systems cap at 10 to 40 chunks to limit redundancy and reduce
              the reading burden on the model. More chunks does not always mean
              better answers: beyond a threshold, the model struggles to
              synthesize information and may anchor on spurious details buried
              in the mass of context.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                128k Context Budget Example
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">4k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SYSTEM PROMPTS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">80k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RETRIEVED DOCS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">42k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    CONVERSATION
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Truncation and Summarization
            </p>
            <p style="margin-top: 0">
              For long running conversations, naive appending of all messages
              quickly exhausts the history budget. After 50 to 100 turns, you
              might have 60k tokens of conversation alone. Systems use several
              strategies to manage this growth. Rolling truncation drops the
              oldest messages once you exceed the budget, keeping only the most
              recent 30 to 50 turns. This works for short sessions but loses
              important context in multi hour interactions. Selective
              preservation keeps the first few turns (which often contain
              critical setup) and last few turns (the immediate context) while
              removing the middle. Summarization periodically condenses old
              messages: every 10 to 20 turns, use the LLM itself to generate a
              200 to 500 token summary of the conversation so far, then replace
              those turns with the summary.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Tier Memory Architecture
            </p>
            <p style="margin-top: 0">
              For agents or chatbots that span thousands of turns, some
              companies implement separate short term and long term memory.
              Short term memory uses the raw context window with sliding history
              management. Long term memory stores past interactions as chunks in
              a vector index, treated identically to document chunks. When a
              user asks a question, the system retrieves both relevant documents
              and relevant past conversation segments from the long term index.
              This keeps per request context bounded (still 128k tokens) while
              creating the illusion of unlimited memory. The trade off is added
              complexity: you now maintain two retrieval systems and must tune
              how many tokens to allocate to each memory tier.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Large scale deployments measure
              latency budgets in milliseconds. If your total target is 800 ms
              p95 and retrieval takes 50 ms, embedding takes 20 ms, and the LLM
              call takes 600 ms, you have only 130 ms of headroom. Summarizing
              old messages adds 200 to 400 ms per summarization call, so you
              batch summarizations or run them asynchronously between user
              turns.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="font-weight: 700; font-size: 13px; text-align: center; margin-bottom: 6px">
                  Two Tier Memory Architecture
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px">
                    Short Term (Context Window)
                  </div>
                  <div style="font-size: 11px">
                    Last 30 turns + current query
                    <br />
                    ~42k tokens, raw messages
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  +
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px">
                    Long Term (Vector Index)
                  </div>
                  <div style="font-size: 11px">
                    Past 1000s of turns as chunks
                    <br />
                    Retrieved: top 10 relevant segments
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <div style="font-weight: 700; font-size: 12px">
                    Combined Context to LLM
                  </div>
                  <div style="font-size: 11px">128k tokens total</div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explicit token budgets prevent context overflow: allocate
                  tokens to system prompts, documents, and history before making
                  LLM calls rather than appending until failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Practical systems cap retrieved chunks at 10 to 40 even when
                  budget allows 100+ because more context does not always
                  improve answers and increases model confusion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Conversation summarization trades 200 to 400 ms of latency per
                  summary for unbounded conversation length, typically triggered
                  every 10 to 20 turns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two tier memory splits recent turns (in raw context) from
                  historical turns (retrieved from vector index), keeping per
                  request tokens bounded while simulating unlimited memory
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ChatGPT uses rolling summarization to handle conversations
                  spanning dozens of turns without exceeding context limits,
                  periodically condensing old messages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Internal assistants serving 50k engineers might allocate 80k
                  of 128k tokens to retrieved documents, allowing 20 to 40
                  chunks at 500 tokens each for comprehensive coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChunkingStrategiesContextWindowManagementAtScale;
