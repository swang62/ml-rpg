import type { Component } from "solid-js";

const LessonQueryUnderstandingIntentClassificationAndRoutingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Intent Classification and Routing Strategies
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
                <strong>Intent classification</strong> categorizes queries by
                what the user wants to accomplish. The classic taxonomy:
                navigational (find a specific site), informational (learn
                something), transactional (complete an action like buying or
                booking).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Intent Matters for Routing
            </p>
            <p style="margin-top: 0">
              Different intents need different retrieval strategies.
              Navigational queries ("facebook login") should return one
              authoritative result fast. Informational queries ("how does
              photosynthesis work") need diverse, comprehensive results.
              Transactional queries ("buy iphone 15") should prioritize product
              pages with prices. Routing to the wrong backend wastes compute and
              frustrates users. A product search query hitting a general web
              index returns blog posts instead of purchasable items.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Classification Approaches
            </p>
            <p style="margin-top: 0">
              <strong>Rule-based:</strong> Pattern matching on keywords ("buy",
              "price", "how to"). Fast, interpretable, but brittle.{" "}
              <strong>Traditional ML:</strong> Logistic regression or SVM on
              n-gram features. Requires labeled data, handles more patterns.{" "}
              <strong>Neural:</strong> Fine-tuned BERT or distilled models. Best
              accuracy (90-95%), but higher latency (10-50ms). Production often
              uses cascades: fast rules filter obvious cases, ML handles
              ambiguous ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Intent Queries
            </p>
            <p style="margin-top: 0">
              "Best restaurants near me with outdoor seating" has both
              informational (what restaurants exist) and transactional (I want
              to book) aspects. Handle with: multi-label classification (predict
              all applicable intents), hierarchical intents (primary +
              secondary), or intent scores (probability per intent). The UI can
              then blend results from multiple backends based on intent weights.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Query: "best coffee maker reviews"
                  </strong>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Navigational</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Confidence: 0.15
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Informational</strong>
                    <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                      Confidence: 0.72
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Transactional</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Confidence: 0.35
                    </div>
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      Route: Reviews Index
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Primary (0.72)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      Route: Product Catalog
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Secondary (0.35)
                    </div>
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
                  Classic taxonomy: navigational (specific site), informational
                  (learn), transactional (buy/book)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Different intents need different retrieval: navigational wants
                  one result, informational wants diversity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Approaches: rules (fast, brittle), traditional ML (labeled
                  data), neural (90-95% accuracy, 10-50ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production cascades: fast rules for obvious cases, ML for
                  ambiguous ones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-intent queries need multi-label classification or intent
                  scores to blend backend results
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
                  Explain the navigational/informational/transactional taxonomy
                  with examples for each
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe cascade architecture (rules then ML) for production
                  systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention multi-intent handling when discussing complex queries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingIntentClassificationAndRoutingStrategies;
