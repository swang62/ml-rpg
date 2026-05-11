import type { Component } from "solid-js";

const LessonModelPruningFailureModesAndEdgeCasesInProductionPruning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production Pruning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Accuracy Collapse at High Sparsity
            </p>
            <p style="margin-top: 0">
              Accuracy degrades gracefully until a threshold, then collapses.
              For most networks, this cliff appears at 85-95% sparsity
              (unstructured) or 70-80% channel removal (structured). Symptoms:
              validation loss spikes during fine-tuning and never recovers;
              accuracy on hard examples drops to random while easy examples
              remain correct. Cause: the network loses representational capacity
              for fine-grained distinctions. Fix: back off sparsity by 10-15%,
              use longer fine-tuning, or accept the accuracy-size tradeoff.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Importance Score Miscalibration
            </p>
            <p style="margin-top: 0">
              Magnitude-based importance assumes small weights are unimportant.
              This fails when: weights are small but on a critical path
              (bottleneck layers); batch normalization rescales weights making
              magnitudes misleading; activation functions like ReLU mean some
              weights matter only for specific inputs. Symptoms: pruning removes
              weights that seemed unimportant but accuracy drops more than
              expected. Fix: use gradient-based importance (weight × gradient)
              instead of pure magnitude; it captures actual contribution to
              outputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Inference Slowdown After Unstructured Pruning
            </p>
            <p style="margin-top: 0">
              The model runs slower after pruning, not faster. Root cause:
              sparse matrix formats have storage overhead; conversion between
              sparse and dense formats adds latency; framework sparse operations
              aren"t optimized. A 50% sparse matrix in CSR format uses more
              memory than the original dense matrix for low sparsity. Fix: only
              use unstructured pruning above 80% sparsity where sparse formats
              become efficient, or use structured pruning instead.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Detection:</strong> Always benchmark inference time
              before and after pruning on target hardware. Paper speedups don"t
              reflect real deployment.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    ⚠️ Early Layer Over Pruning
                  </div>
                  <div style="font-size: 13px">
                    <strong>Layer 1 (features):</strong> 50% pruned → 8%
                    accuracy drop
                    <br />
                    <strong>Layer 10 (classifier):</strong> 50% pruned → 0.5%
                    accuracy drop
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    ⚠️ Hidden Hardware Overhead
                  </div>
                  <div style="font-size: 13px">
                    <strong>80% unstructured on CPU:</strong> Dense 10ms, Sparse
                    11ms
                    <br />
                    Indexing overhead exceeds compute savings
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    ⚠️ Distribution Shift
                  </div>
                  <div style="font-size: 13px">
                    <strong>Validation (50 tokens avg):</strong> 98.0% accuracy
                    <br />
                    <strong>Production long docs (500 tokens):</strong> 88.0%
                    accuracy
                    <br />
                    Pruned attention heads needed for long range
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    ⚠️ Graph Shape Mismatch
                  </div>
                  <div style="font-size: 13px">
                    <strong>Main path:</strong> 256 channels → 180 channels
                    (pruned)
                    <br />
                    <strong>Skip path:</strong> Still 256 channels (forgotten)
                    <br />
                    Silent broadcast or runtime error on export
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
                  Accuracy cliff appears at 85-95% sparsity (unstructured) or
                  70-80% channel removal (structured)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Symptoms of over-pruning: loss spikes during fine-tuning, hard
                  examples drop to random accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Magnitude-based importance fails when batch norm rescales
                  weights or weights are on critical paths
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient-based importance (weight × gradient) more reliable
                  than pure magnitude
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparse formats have overhead; only efficient above 80%
                  sparsity
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
                  Describe the accuracy cliff phenomenon with specific
                  thresholds - shows you"ve hit these limits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain gradient-based importance as alternative to magnitude
                  when asked about pruning failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize always benchmarking on target hardware - paper
                  speedups often don"t transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPruningFailureModesAndEdgeCasesInProductionPruning;
