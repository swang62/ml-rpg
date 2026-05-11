import type { Component } from "solid-js";

const LessonKnowledgeDistillationProductionDeploymentFromTrainingCostToServingSavings: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Deployment: From Training Cost to Serving Savings
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAINING COST VS SERVING SAVINGS
            </p>
            <p style="margin-top: 0">
              Distillation has upfront cost: running the teacher on training
              data, training the student for many epochs. A typical distillation
              run might cost $1,000 to $10,000 in compute. But serving savings
              accumulate: if the student saves $0.01 per 1,000 requests and you
              serve 10 million requests per day, you save $100 per day. The
              break even point might be 10 to 100 days. Calculate this before
              starting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY IMPROVEMENTS
            </p>
            <p style="margin-top: 0">
              Beyond cost, smaller models are faster. A 10x smaller model
              typically has 3 to 5x lower latency (not 10x because memory
              bandwidth and overhead dominate at small sizes). For real time
              applications with 50ms latency budgets, distillation might be the
              difference between feasibility and impossibility. Measure actual
              latency, not just parameter count.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DEPLOYMENT ARCHITECTURE
            </p>
            <p style="margin-top: 0">
              After distillation, the teacher is discarded for serving. Only the
              student is deployed. This simplifies infrastructure: no need for
              large GPU instances, easier to scale horizontally, simpler failure
              handling. Some systems keep the teacher for occasional quality
              checks or for retraining the student when data distributions
              change.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Best Practice:</strong> Monitor student quality in
              production. If degradation exceeds 2 to 3 percent, investigate
              whether data drift requires re-distillation with updated teacher
              predictions.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ITERATIVE DISTILLATION
            </p>
            <p style="margin-top: 0">
              For extreme compression (100x smaller), distill in stages. First
              distill from 1B to 300M parameters. Then distill from 300M to
              100M. Then from 100M to 30M. Each stage preserves more knowledge
              than trying to jump directly from 1B to 30M. The intermediate
              students act as curriculum, providing easier targets than the
              original teacher.
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
                  Distillation upfront cost $1K-$10K; savings $0.01/1K requests;
                  break-even in 10-100 days at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  10x smaller model = 3-5x lower latency (not 10x due to memory
                  bandwidth overhead)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Teacher discarded after training; only student deployed,
                  simplifying infrastructure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor student quality: &gt;2-3% degradation suggests
                  re-distillation needed for data drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iterative distillation: 1B to 300M to 100M to 30M preserves
                  more than direct 1B to 30M
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
                  Calculate break-even: $5K training, $0.01/1K savings, 10M
                  daily requests = $100/day = 50 day payback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss latency: 10x smaller but only 4x faster due to
                  overhead - measure, do not assume
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain staged distillation: each step is easier, intermediate
                  models act as curriculum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationProductionDeploymentFromTrainingCostToServingSavings;
