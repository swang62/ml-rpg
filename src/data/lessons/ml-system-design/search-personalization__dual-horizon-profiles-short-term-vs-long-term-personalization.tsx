import type { Component } from "solid-js";

const LessonSearchPersonalizationDualHorizonProfilesShortTermVsLongTermPersonalization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dual Horizon Profiles: Short Term vs Long Term Personalization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Dual horizon profiles</strong> maintain two separate
                user representations: a long-term profile capturing stable
                preferences (updated daily/weekly), and a short-term profile
                capturing current session intent (updated with every
                interaction).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Long-Term Profile: Who The User Is
            </p>
            <p style="margin-top: 0">
              The long-term profile captures stable preferences: preferred
              categories, price sensitivity, brand affinities, typical browsing
              times. Built from months of interaction history, updated in batch
              (daily or weekly). Stored as a dense vector (embedding) of 128-512
              dimensions or as explicit feature values (avg_price_clicked: 45,
              top_categories: [electronics, books]). Changes slowly: a user
              who's browsed electronics for 6 months doesn't become a fashion
              shopper after one dress click.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Short-Term Profile: What The User Wants Now
            </p>
            <p style="margin-top: 0">
              The short-term profile captures current session intent: last 5-20
              clicked items, current query history, time spent on recent pages.
              Updated in real-time with sub-second latency. Stored in fast
              key-value stores for immediate retrieval. Volatile: resets at
              session end or decays within hours. A user shopping for a gift
              behaves differently than when shopping for themselves. Short-term
              captures this temporary context that long-term would average away.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Blending Strategy
            </p>
            <p style="margin-top: 0">
              Combine both profiles into a final personalization score:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                score = α × long_term_score + (1-α) × short_term_score
              </code>
              . The blend weight α typically starts at 0.7 (favor long-term) and
              shifts toward short-term as session length increases. After 10+
              interactions, short-term gets more weight (α=0.4) because current
              intent is clearer. Cold-start sessions with no clicks rely
              entirely on long-term (α=1.0).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Single Horizon Fails
            </p>
            <p style="margin-top: 0">
              <strong>Long-term only:</strong> Misses intent shifts. User always
              buys running shoes, today searching for hiking boots. Long-term
              keeps pushing running shoes. <strong>Short-term only:</strong>{" "}
              Loses stable preferences. User clicks one cheap item, suddenly
              sees only budget options despite usually preferring premium. Dual
              horizon balances both: respects long-term while adapting to
              short-term signals.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px; text-align: center">
                    Short Term Profile
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Window:</strong> 15 to 30 min
                    <br />
                    <strong>Features:</strong> Last 5 to 10 clicks, current
                    session category intensity, price range histogram
                    <br />
                    <strong>Update:</strong> Per event or every few seconds
                    <br />
                    <strong>Use case:</strong> Capture intent shift within
                    session
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px; text-align: center">
                    Long Term Profile
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Window:</strong> 30 to 90 days
                    <br />
                    <strong>Features:</strong> Favorite categories, avg booking
                    price, geo affinity, lifecycle state
                    <br />
                    <strong>Update:</strong> Daily batch with decay
                    <br />
                    <strong>Use case:</strong> Stable prefs and cold start
                    anchor
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
                  Long-term profile captures stable preferences from months of
                  history; updated daily/weekly as embeddings or explicit
                  features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Short-term profile captures current session intent from last
                  5-20 interactions; updated in real-time, resets at session end
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blending formula: score = α × long_term + (1-α) × short_term,
                  where α shifts based on session length
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold-start sessions (no clicks yet) use α=1.0 (all long-term);
                  after 10+ interactions, shift to α=0.4
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single horizon fails: long-term misses intent shifts,
                  short-term loses stable preferences
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
                  Give the formula: score = α × long_term + (1-α) × short_term
                  with α shifting from 0.7 to 0.4 as session grows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain failure modes: long-term only keeps pushing running
                  shoes when user wants hiking boots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention profile storage: long-term as 128-512 dim embedding,
                  short-term in fast key-value store
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationDualHorizonProfilesShortTermVsLongTermPersonalization;
