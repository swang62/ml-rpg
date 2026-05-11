import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringFeatureGroupsAndTheirRoleInRankingSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Groups and Their Role in Ranking Systems
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
                <strong>Feature groups</strong> in ranking systems organize
                features by their source and update frequency: query features,
                user features, item features, context features, and cross
                features. Each group has different latency constraints, storage
                patterns, and staleness tolerances.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Query Features: What The User Wants Now
            </p>
            <p style="margin-top: 0">
              Query features capture the current request: parsed query terms,
              detected intent (navigational, informational, transactional),
              query length, language, and query embeddings from a language
              model. These are computed at request time with strict latency
              budgets (typically &lt;10ms). Since queries are unpredictable, you
              cannot pre-compute them. Query features are the foundation: they
              define what "relevant" means for this specific request.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User Features: Who Is Asking
            </p>
            <p style="margin-top: 0">
              User features capture historical behavior: click history, purchase
              history, category preferences, engagement patterns, demographic
              signals. These are pre-computed in batch (updated hourly to daily)
              and stored for fast lookup. User features enable personalization:
              two users with the same query get different rankings based on
              their history. Storage: user embeddings (256-512 dimensions),
              aggregated counts, preference vectors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Item Features: What Is Being Ranked
            </p>
            <p style="margin-top: 0">
              Item features describe the candidates: titles, categories, prices,
              quality scores, popularity metrics, item embeddings. Static
              attributes (category, title) change rarely. Dynamic attributes
              (click rate, stock level) need frequent updates. Item features are
              pre-indexed: when a query arrives, you already know everything
              about each item. The challenge is keeping millions of item feature
              vectors fresh while serving at p99 &lt;5ms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Context and Cross Features
            </p>
            <p style="margin-top: 0">
              <strong>Context features:</strong> Time of day, device type,
              location, session length, referring source. Available at request
              time. Enable situational ranking (mobile users prefer shorter
              content; evening users browse more).{" "}
              <strong>Cross features:</strong> User-item interactions (has user
              clicked this item before?), query-item match signals (BM25 score,
              embedding similarity). Cross features often provide the strongest
              ranking signal but require combining user and item data at serving
              time.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Relevance Features</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Query text match: 0.85
                    <br />
                    Semantic similarity: 0.73
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Engagement Features</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    CTR 7d: 0.12 | CTR 1d: 0.18
                    <br />
                    Conversion rate: 0.034
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Personalization Features
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    User item affinity: 0.67
                    <br />
                    Category preference: 0.81
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Business Constraints</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    In stock: true | Prime: true
                    <br />
                    Ships within: 2 days
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
                  Five feature groups: query (computed at request), user
                  (pre-computed hourly/daily), item (pre-indexed), context
                  (request time), cross (combined at serving)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query features define relevance for this request; computed in
                  &lt;10ms since queries are unpredictable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User features enable personalization: same query yields
                  different rankings based on history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item features must stay fresh across millions of items while
                  serving at p99 &lt;5ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross features (user-item, query-item interactions) often
                  provide strongest signal but require runtime combination
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
                  When asked about feature engineering for ranking, start by
                  categorizing features into groups based on source and update
                  frequency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the latency constraints: query features &lt;10ms
                  (computed live), item features &lt;5ms (pre-indexed lookup)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that cross features combine user and item data at
                  serving time, making them powerful but compute-expensive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringFeatureGroupsAndTheirRoleInRankingSystems;
