import type { Component } from "solid-js";

const LessonQueryUnderstandingWhatIsQueryUnderstandingInSearchSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Query Understanding in Search Systems?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Query understanding</strong> is the process of
                interpreting what a user actually wants from their search query.
                It transforms raw text into structured signals: intent (what
                type of result?), entities (what specific things?), and
                reformulations (how to improve the query?).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Raw Queries Fail
            </p>
            <p style="margin-top: 0">
              Users type "apple" but mean the company, the fruit, or the record
              label. They type "cheap flights NYC" when they want "inexpensive
              airfare to New York City." They misspell, use abbreviations, and
              omit context obvious to them but invisible to the system. Without
              query understanding, search returns literal keyword matches that
              miss 30-50% of relevant results and include 20-30% irrelevant
              ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three Core Tasks
            </p>
            <p style="margin-top: 0">
              <strong>Intent classification:</strong> Determine the query type
              (navigational, informational, transactional) to route to
              appropriate backends. <strong>Entity extraction:</strong> Identify
              and link mentions to known entities ("NYC" → New York City,
              population 8.3M, coordinates 40.7°N).{" "}
              <strong>Query rewriting:</strong> Expand, correct, or reformulate
              queries to improve recall ("ML" → "machine learning") or precision
              (adding implicit filters).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Impact on Search Quality
            </p>
            <p style="margin-top: 0">
              Good query understanding improves relevance metrics by 15-30%. It
              reduces zero-result queries by 40-60% through spell correction and
              synonym expansion. It enables personalization by connecting
              queries to user context. Without it, even perfect ranking
              algorithms fail because they rank the wrong candidate set.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Raw Query</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    "levi black jeans men under 50"
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Intent Classification</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Category: Clothing, Type: Jeans
                  </div>
                  <div style="font-size: 10px; margin-top: 2px">2 to 5ms</div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Parsing &amp; Entity Linking
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Brand: Levi's, Color: black, Gender: men
                  </div>
                  <div style="font-size: 10px; margin-top: 2px">3 to 8ms</div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Rewriting &amp; Routing
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    price_max: 50, route: catalog index
                  </div>
                  <div style="font-size: 10px; margin-top: 2px">2 to 5ms</div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Structured Output</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    To Retrieval &amp; Ranking
                  </div>
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
                  Query understanding transforms raw text into structured
                  signals: intent, entities, reformulations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Raw keyword matching misses 30-50% relevant results and
                  includes 20-30% irrelevant ones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three core tasks: intent classification, entity extraction,
                  query rewriting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Good query understanding improves relevance 15-30% and reduces
                  zero-result queries 40-60%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Even perfect ranking fails without query understanding - you
                  rank the wrong candidate set
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
                  Explain the three core tasks (intent, entities, rewriting) as
                  a structured framework
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite specific impact numbers (15-30% relevance improvement,
                  40-60% zero-result reduction)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use the "apple" ambiguity example to illustrate why raw
                  queries fail
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingWhatIsQueryUnderstandingInSearchSystems;
