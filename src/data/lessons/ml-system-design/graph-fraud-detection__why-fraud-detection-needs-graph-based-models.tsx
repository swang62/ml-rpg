import type { Component } from "solid-js";

const LessonGraphFraudDetectionWhyFraudDetectionNeedsGraphBasedModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Why Fraud Detection Needs Graph Based Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Core Insight:</strong> Graph-based fraud detection models
              relationships between entities (users, accounts, devices,
              transactions) rather than analyzing each transaction in isolation.
              Fraudsters operate in networks—shared devices, fund transfers,
              similar behavior patterns—that only become visible when you
              examine connections across the entire graph.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Traditional Models Fall Short
            </p>
            <p>
              Point-wise models (logistic regression, random forests, even deep
              neural networks) process each transaction independently. They see
              features like transaction amount, time of day, merchant category.
              What they cannot see: the user just created three accounts using
              the same device, received funds from five flagged accounts, and
              shares a shipping address with known fraudsters.
            </p>
            <p>
              These relational signals are often the strongest fraud indicators.
              A transaction that looks perfectly normal in isolation becomes
              obviously suspicious when you see the user received money from ten
              accounts that were all created yesterday.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Graph Models Enable
            </p>
            <p>
              Graph Neural Networks (GNNs) propagate information across
              connected nodes. When evaluating a transaction, the model
              considers not just the transaction features but also: the user
              history, connected account behaviors, device sharing patterns, and
              multi-hop relationships (friends-of-friends patterns). This
              neighborhood aggregation captures fraud rings that operate across
              multiple accounts.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Fraud rings deliberately distribute
              activity across accounts to evade per-account thresholds. Graph
              models defeat this by aggregating signals across the entire ring,
              making coordinated behavior visible even when individual accounts
              stay below detection thresholds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Graph Structure
            </p>
            <p>
              A fraud detection graph typically contains: user nodes (profiles,
              history), transaction edges (sender to receiver), device nodes
              (shared identifiers), account nodes (linked by common
              information). Edge weights encode relationship strength. The graph
              evolves in real-time as new transactions create edges and new
              users create nodes.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 8px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User A</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Age: 2 days
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Device X</strong>
                    <div style="font-size: 11px; margin-top: 4px">Shared</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Merchant M</strong>
                    <div style="font-size: 11px; margin-top: 4px">$500 txn</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User B</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Age: 1 day
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Device X</strong>
                    <div style="font-size: 11px; margin-top: 4px">Shared</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Merchant M</strong>
                    <div style="font-size: 11px; margin-top: 4px">$450 txn</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User C</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Age: 3 days
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Device X</strong>
                    <div style="font-size: 11px; margin-top: 4px">Shared</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Merchant M</strong>
                    <div style="font-size: 11px; margin-top: 4px">$520 txn</div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border-radius: 6px; border: 2px solid; text-align: center">
                  <strong style="font-size: 12px">
                    Pattern: 3 new users, same device, same merchant, 6 hours
                  </strong>
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
                  Graph models detect fraud rings by analyzing relationships
                  between entities, not just individual transaction features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Traditional point-wise models cannot see multi-account
                  coordination, device sharing, or fund transfer patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Neighborhood aggregation in GNNs defeats fraud tactics that
                  distribute activity across accounts to evade per-account
                  thresholds
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
                  When asked why fraud detection needs graphs, explain that
                  fraudsters operate in networks—the individual transaction
                  looks normal but the connected accounts reveal the scheme
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that graph models catch signals like shared devices
                  across accounts, fund transfers from flagged accounts, and
                  similar behavioral patterns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGraphFraudDetectionWhyFraudDetectionNeedsGraphBasedModels;
