import type { Component } from "solid-js";

const LessonRealtimePersonalizationWhatIsRealTimePersonalization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Real-time Personalization?
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
                <strong>Real-time Personalization</strong> adapts
                recommendations within seconds based on what a user does during
                their current session, rather than waiting for batch model
                updates that take hours or days.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE CORE PROBLEM
            </p>
            <p style="margin-top: 0">
              Traditional recommendation systems train models on historical data
              and serve predictions from static user profiles. When a user
              starts searching for running shoes, the system keeps recommending
              office supplies based on past purchases. The next batch training
              cycle might be 6 to 24 hours away. By then, the user has left.
              Real-time personalization captures and acts on intent within the
              same session.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TWO MAIN APPROACHES
            </p>
            <p style="margin-top: 0">
              <strong>Session-based models:</strong> Track user actions within a
              visit and predict what they want next. A user viewing hiking
              boots, then socks, is likely interested in hiking poles. The model
              learns these sequential patterns.{" "}
              <strong>Contextual bandits:</strong> Balance showing items the
              system knows work well (exploitation) versus trying new items to
              learn preferences (exploration). Both adapt within seconds rather
              than waiting for batch retraining.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY IT MATTERS
            </p>
            <p style="margin-top: 0">
              Users often arrive with intent that differs from their historical
              profile. A parent buying toys looks nothing like their typical
              purchases. Capturing session intent increases conversion by 15 to
              30% compared to relying only on history. The tradeoff is
              infrastructure complexity: real-time systems need streaming
              feature pipelines and sub-100ms response times.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Real-time personalization is not
              about faster models. It is about incorporating signals that only
              exist during the current session.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Context x:</strong> User
                  features, session signals, device, time
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Policy chooses action a with probability p
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Exploration: ε=0.05 or Thompson Sampling
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Observe reward r for action a only
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Log: (x, a, p, r) for learning
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Update policy online (seconds to minutes)
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
                  Adapts recommendations within seconds based on current
                  session, not batch updates taking 6-24 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session-based models predict from action sequences; contextual
                  bandits balance exploitation and exploration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Captures intent that differs from historical profile, like a
                  parent buying toys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Increases conversion by 15-30% compared to history-only
                  recommendations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Requires streaming feature pipelines and sub-100ms response
                  times
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
                  Explain the lag problem: user searches running shoes but sees
                  office supply recommendations for hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe session sequence: hiking boots → socks → poles shows
                  clear intent progression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss the 15-30% conversion lift and when it justifies the
                  infrastructure investment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimePersonalizationWhatIsRealTimePersonalization;
