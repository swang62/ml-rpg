import type { Component } from "solid-js";

const LessonLlmFineTuningWhatIsParameterEfficientFineTuningPeft: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Parameter Efficient Fine Tuning (PEFT)?
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
                <strong>Parameter Efficient Fine Tuning (PEFT)</strong> adapts
                large foundation models to specific tasks by training only a
                tiny subset of new parameters (typically under 1% of model size)
                while keeping the base model frozen, dramatically reducing
                memory, compute, and storage costs.
              </div>
            </div>
            <strong>The Core Problem:</strong> Modern Large Language Models
            (LLMs) are massive. A 7 billion parameter model in 16 bit precision
            requires about 14 GB just to store weights. A 65 billion parameter
            model needs roughly 130 GB. When you fully fine tune such models,
            you must store gradients, optimizer states like momentum and
            variance, and intermediate activations. This easily pushes memory
            requirements to 4 to 6 times the raw weight size, exceeding what
            even an 80 GB GPU can handle. Full fine tuning also creates an
            operational nightmare at scale. Imagine you're building an LLM
            platform serving 100 different products: code generation, ad
            copywriting, customer support across verticals, internal knowledge
            assistants. If each specialization requires its own fully trained
            70B model, you'd need to store and deploy 140 GB of weights per
            variant in 16 bit format. For 100 variants, that's 14 terabytes of
            model storage.
            <strong>How PEFT Solves This:</strong> Instead of updating all
            billions of parameters, PEFT methods freeze the base model entirely
            and introduce a small set of trainable parameters per task. These
            additional parameters are typically well under 1% of the original
            model size. For instance, adapting a 3 billion parameter model might
            introduce only 13 million trainable parameters.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Memory Efficiency Gains
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    FULL FINE TUNE
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;1%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    PEFT ADAPTER
                  </div>
                </div>
              </div>
            </div>
            Because you only update this tiny parameter set, optimizer states
            shrink from gigabytes to mere megabytes. Training time drops
            significantly. Storage per task becomes manageable: a single adapter
            might be 50 to 200 megabytes instead of 140 gigabytes. You can now
            maintain one shared base model and thousands of lightweight task
            specific adapters.
            <strong>Real World Impact:</strong> This architectural shift enables
            multi tenancy at scale. A platform can load one 70B base model per
            GPU and dynamically swap in different adapters based on the incoming
            request's tenant or task identifier. This is how systems support
            user created custom GPTs or specialized skills without duplicating
            the entire foundation model.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PEFT trains only a tiny fraction of parameters (under 1%
                  typically) while freezing the base model, reducing memory by
                  100x or more compared to full fine tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 70B parameter full model might need 400 to 600 GB for
                  training (weights plus optimizer states), but PEFT adapters
                  need only 50 to 200 MB per task
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enables multi tenancy: one shared base model serves thousands
                  of specialized tasks by loading small adapters dynamically
                  based on request context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training becomes accessible: teams can adapt large models on
                  single GPUs instead of requiring expensive multi GPU clusters
                  for every specialization
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
                  A 3B parameter base model with PEFT adapters introduces only
                  13M trainable parameters (0.43% of model size) when targeting
                  attention layers with rank 8
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serving 100 product variants: Full fine tuning needs 14 TB of
                  storage (140 GB × 100), PEFT needs 140 GB base plus 10 GB
                  adapters (100 × 100 MB)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production platforms like those at Meta or Google use PEFT to
                  serve hundreds of internal teams from a single shared
                  foundation model with per tenant adapters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmFineTuningWhatIsParameterEfficientFineTuningPeft;
