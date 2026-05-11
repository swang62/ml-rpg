import type { Component } from "solid-js";

const LessonAdversarialRobustnessFailureModesWhenAdversarialDefensesBreakInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Adversarial Defenses Break in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Overfitting to Training Attacks
            </p>
            <p>
              Adversarial training defends against the specific attack types
              used during training. Attackers who discover your training
              methodology can craft novel attacks outside your robustness
              envelope. A model robust to gradient-based perturbations may be
              vulnerable to decision-based or transfer attacks. Defense requires
              diversity—train against multiple attack types.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Never assume your adversarial training
              covers all possible attacks. Attackers are creative. Maintain red
              team exercises that try novel attack strategies against production
              systems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Perturbation Bound Mismatch
            </p>
            <p>
              If training perturbation bounds do not match real attacker
              capabilities, defenses fail. Bounds too tight: model is not robust
              to realistic attacks. Bounds too loose: model sacrifices too much
              accuracy defending against unrealistic attacks. Analyze actual
              attack data to calibrate perturbation bounds—do not guess.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gradient Masking
            </p>
            <p>
              Some defenses make gradients useless for attack generation without
              actually improving robustness. The model appears robust because
              gradient-based attacks fail, but decision-based or transfer
              attacks still succeed. Test robustness with multiple attack
              methods, not just gradient-based ones.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Detection Strategy:</strong> Compare performance of
              gradient-based attacks (FGSM, PGD) versus decision-based attacks
              (boundary attack). If decision-based attacks succeed where
              gradient attacks fail, you have gradient masking, not true
              robustness.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computational Arms Race
            </p>
            <p>
              Attackers can invest more compute than defenders. Ensemble
              defenses are expensive; attackers can probe until they find
              transferable attacks that fool all ensemble members. Defense depth
              matters: do not rely on a single robust model, layer multiple
              independent detection mechanisms.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial training defends only against trained attack
                  types—attackers craft novel attacks outside your robustness
                  envelope
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient masking makes attacks appear to fail while
                  decision-based attacks still succeed—not true robustness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Layer multiple independent detection mechanisms—do not rely on
                  a single robust model
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
                  Test with multiple attack methods: if decision-based attacks
                  succeed where gradient attacks fail, you have gradient masking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analyze actual attack data to calibrate perturbation bounds—do
                  not guess what attackers can realistically do
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAdversarialRobustnessFailureModesWhenAdversarialDefensesBreakInProduction;
