import type { Component } from "solid-js";

const LessonLlmFineTuningFailureModesAndEdgeCasesInPeftSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in PEFT Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Underfitting from Insufficient Capacity:</strong> The most
            common failure mode in LoRA is setting rank too low or targeting too
            few layers. When you constrain the adapter to rank 4 and only apply
            it to key and value projections in attention, you might have only 10
            to 20 million trainable parameters for a 7B base model. This can be
            insufficient for complex tasks. Symptom: training loss plateaus
            early, validation metrics stall at mediocre levels even with more
            data or longer training. A production team might see their customer
            support model stuck at 70% intent classification accuracy when full
            fine tuning achieves 85%. Solution: first, increase rank from 4 to
            16 or 32. Second, expand target modules to include all linear
            layers: query, key, value, output projections in attention, plus up,
            gate, and down projections in feed forward blocks. This can increase
            trainable parameters from 20M to 100M, often unlocking 10 to 15
            percentage point improvements. If metrics still don't improve, the
            task may require full fine tuning or the base model may be
            fundamentally mismatched.<p></p>
            <div style="margin: 20px 0 20px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  1
                </div>
                <div style="flex: 1">
                  <strong>Identify plateau:</strong> Validation loss stops
                  improving after epoch 2 of 10, accuracy stuck at 70%
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  2
                </div>
                <div style="flex: 1">
                  <strong>Increase capacity:</strong> Change rank from 4 to 16,
                  expand from attention only to all linear layers
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  3
                </div>
                <div style="flex: 1">
                  <strong>Retrain and measure:</strong> New config reaches 82%
                  accuracy, close to full fine tuning's 85%
                </div>
              </div>
            </div>
            <strong>Extreme Domain Shift:</strong> PEFT assumes the pre trained
            model already has strong representations and you're making small
            adjustments. If the domain gap is too large, small adapters fail
            catastrophically. Example: adapting an English centric model like
            LLaMA to a low resource language with different script (Thai,
            Amharic) or grammar structure. You might see the model produce
            gibberish or fall back to English even after fine tuning. The frozen
            base embeddings and early layers are tuned for Latin script and
            English syntax. A 50M parameter LoRA adapter can't overcome this
            fundamental mismatch. In such cases, either pre train a model on the
            target language from scratch, or use a multilingual base model that
            already has some capacity for that language.
            <strong>QLoRA Quantization Brittleness:</strong> QLoRA's 4 bit
            quantization can introduce gradient spikes and training divergence
            on certain models and tasks. This happens when the weight
            distribution doesn't match the NormalFloat 4 assumptions, or when
            task loss landscapes are steep and sensitive to small parameter
            changes. Real example: a team fine tuning a 30B model for SQL
            generation with QLoRA sees loss suddenly spike to infinity at step
            500, gradients explode, and training crashes. Switching to 8 bit
            quantization or 16 bit LoRA resolves it, at the cost of requiring a
            larger GPU or reducing batch size. Monitoring: always track gradient
            norms during training. If you see norm values suddenly jump from 1.0
            to 10.0 or higher, that's a warning sign. Implement gradient
            clipping (max norm 1.0 to 2.0) as a safety measure.
            <p></p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Code generation and mathematical
              reasoning tasks are especially sensitive to quantization noise. If
              QLoRA performance drops more than 5%, switch to 8 bit or full
              precision adapters even if it means smaller batch size or longer
              training.
            </div>
            <strong>Multi Adapter System Failures:</strong> In production
            systems serving thousands of adapters, operational complexity
            creates new failure modes. Adapter routing mistakes can send the
            wrong specialization to users: imagine a customer support request
            hitting the sales adapter, producing completely irrelevant
            responses. Cache thrashing becomes a problem when adapter access
            patterns are unpredictable. If you have 10 GB of GPU memory for
            adapter cache and 1000 adapters of 50 MB each, you can only keep 200
            hot. If traffic patterns cause frequent cache evictions, you spend
            more time loading adapters from disk (20 to 50 ms per load) than
            running inference, degrading p99 latency from 300 ms to over 1
            second. Version management is tricky: updating an adapter during
            live traffic can cause race conditions where some requests use
            version N and others use version N+1, leading to inconsistent user
            experience. Teams usually implement blue green deployment at the
            adapter level, routing a percentage of traffic to the new version
            before full cutover.
            <strong>Overfitting on Tiny Datasets:</strong> Because adapters are
            small and fast to train (hours instead of days), teams sometimes
            fine tune on datasets with only 100 to 1000 examples. This leads to
            severe overfitting: training accuracy 98%, but validation accuracy
            60%. The model memorizes training examples but doesn't generalize.
            Mitigation: use strong regularization (weight decay 0.01 to 0.1),
            aggressive dropout (0.1 to 0.3 on adapter layers), and early
            stopping based on validation loss. If your dataset is under 1000
            examples, consider data augmentation, synthetic data generation, or
            few shot prompting instead of fine tuning.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Underfitting occurs when rank is too low (4) or too few layers
                  targeted; solution is increasing rank to 16 to 32 and
                  expanding from attention only to all linear layers, often
                  gaining 10 to 15 percentage points
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Extreme domain shift (English model to low resource language
                  with different script) causes PEFT to fail; frozen embeddings
                  can't adapt, requiring multilingual base model or full pre
                  training instead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  QLoRA quantization can cause gradient spikes and training
                  divergence; monitor gradient norms (watch for jumps from 1.0
                  to 10.0), implement gradient clipping (max norm 1.0 to 2.0),
                  switch to 8 bit if code or math tasks degrade over 5%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi adapter systems face cache thrashing (200 hot adapters
                  in 10 GB cache serving 1000 adapters causes frequent 20 to 50
                  ms disk loads), routing mistakes, and version management race
                  conditions requiring blue green deployment
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
                  Intent classification stuck at 70% accuracy with rank 4
                  attention only adapters; expanding to rank 16 all linear
                  layers reaches 82%, close to full fine tuning's 85%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SQL generation task with QLoRA: loss spikes to infinity at
                  step 500, gradient norm jumps from 1.2 to 47.5, training
                  crashes; switching to 8 bit quantization resolves issue
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Platform with 1000 adapters (50 MB each) and 10 GB cache:
                  unpredictable traffic causes 80% cache miss rate, p99 latency
                  degrades from 300 ms to 1.2 seconds due to disk I/O
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmFineTuningFailureModesAndEdgeCasesInPeftSystems;
