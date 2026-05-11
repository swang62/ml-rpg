import type { Component } from "solid-js";

const LessonInterleavingExperimentsWhatIsInterleavingForRankingModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Interleaving for Ranking Models?
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
                <strong>Interleaving</strong> is an online evaluation technique
                that compares two ranking models by blending their outputs into
                a single list shown to users. Instead of splitting traffic
                between control and treatment groups (like A/B testing),
                interleaving shows both models to the same user simultaneously
                and measures which one wins more user engagement.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE CORE PROBLEM
            </p>
            <p style="margin-top: 0">
              Traditional A/B testing for ranking models is painfully slow. You
              need to split traffic, run for 2-4 weeks, and collect tens of
              thousands of samples to detect small ranking improvements. The
              reason: between user variance dominates. User A clicks 10 times
              per session while User B clicks once. This variation drowns out
              the signal from your ranking change.
            </p>
            <p>
              With interleaving, each user serves as their own control. Both
              models contribute to the same result list, so you are comparing
              Model A versus Model B within the same user session. This
              eliminates between user variance entirely, reducing required
              sample size by 50-100x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW IT WORKS AT A HIGH LEVEL
            </p>
            <p style="margin-top: 0">
              For each user query, run both rankers and merge their outputs
              using an algorithm like Team Draft. Each item in the blended list
              is tagged with which model proposed it. When the user clicks or
              engages, credit goes to that model. After collecting enough
              sessions (typically hundreds to a few thousand), test whether one
              model wins significantly more than 50% of competitive engagements.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Interleaving converts comparison
              from two independent samples (A/B) to paired comparison (same
              user, same query), dramatically increasing statistical power.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; gap: 24px; align-items: flex-start; justify-content: center">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Model A</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Item 1<br />
                      Item 3<br />
                      Item 5<br />
                      Item 2
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; align-self: center">
                  →
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Interleaved</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Item 1 (both)
                      <br />
                      Item 3 (A)
                      <br />
                      Item 4 (B)
                      <br />
                      Item 5 (A)
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; align-self: center">
                  ←
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Model B</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Item 1<br />
                      Item 4<br />
                      Item 2<br />
                      Item 6
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
                  Blends outputs from two ranking models into one list per user,
                  eliminating between user variance that slows A/B testing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each user serves as their own control, reducing required
                  sample size by 50-100x compared to traditional A/B tests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Determines relative preference (which model is better) but not
                  absolute impact (how much CTR improves)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typically reaches statistical significance in 2-5 days with
                  hundreds to thousands of sessions instead of weeks
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
                  When asked about ranking model evaluation, explain that
                  interleaving provides 50-100x faster results than A/B by using
                  paired comparison within the same user session
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If discussing sample efficiency, mention that what takes
                  40,000 samples in A/B testing can be detected with 400 samples
                  using interleaving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show depth by explaining that interleaving reveals preference
                  but not magnitude, so you still need A/B testing for absolute
                  metric impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsWhatIsInterleavingForRankingModels;
