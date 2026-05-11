import type { Component } from "solid-js";

const LessonObjectDetectionTwoStageDetectorsRCnnFamilyEvolutionAndPerformance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Two Stage Detectors: R-CNN Family Evolution and Performance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Stage Detection Approach
            </p>
            <p style="margin-top: 0">
              Two stage detectors separate localization and classification into
              distinct steps. First, propose regions that might contain objects.
              Second, classify each proposal and refine its bounding box. This
              separation allows each stage to specialize.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stage 1: Region Proposal
            </p>
            <p style="margin-top: 0">
              The Region Proposal Network (RPN) scans the image and outputs
              1,000-2,000 candidate boxes likely to contain objects. It does not
              classify objects yet, only determines objectness: is there
              something here worth examining closely?
            </p>
            <p>
              <strong>How it works:</strong> A small network slides over feature
              maps from the backbone. At each location, it predicts whether each
              anchor box contains an object and adjusts anchor coordinates.
              Non-maximum suppression reduces overlapping proposals to a
              manageable set.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stage 2: Classification and Refinement
            </p>
            <p style="margin-top: 0">
              For each proposal, extract features using RoI pooling (crop and
              resize the feature map region). Feed these features through
              classification and regression heads. The classification head
              predicts object class. The regression head refines bounding box
              coordinates for tighter fit.
            </p>
            <p>
              <strong>Per-proposal processing:</strong> Each of 1,000+ proposals
              requires a forward pass through the second stage heads. This is
              where two stage detectors spend most of their compute, making them
              slower than single stage alternatives.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Performance Characteristics
            </p>
            <p style="margin-top: 0">
              <strong>Accuracy:</strong> Two stage detectors typically achieve
              2-5% higher mAP than single stage models, especially on small
              objects and crowded scenes.
            </p>
            <p>
              <strong>Speed:</strong> 50-200ms per image on modern GPUs. The
              per-proposal processing creates a speed ceiling that limits
              real-time applications.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Input Image</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    600×800 pixels
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Stage 1: Region Proposal Network
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Generates ~300 proposals
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Stage 2: ROI Head</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Classify + refine each proposal
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Final Detections</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5–10 FPS, high mAP
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
                  Two stages: RPN proposes 1000-2000 candidate regions, then
                  heads classify and refine each proposal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RPN determines objectness (is something here?) without
                  classifying what it is
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-proposal processing through second stage heads is the
                  computational bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two stage detectors achieve 2-5% higher mAP than single stage
                  but run at 50-200ms per image
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
                  Interview Tip: Explain the two stage design as
                  accuracy-optimized - each proposal gets individual attention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention RoI pooling as the key technique that
                  enables per-proposal feature extraction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionTwoStageDetectorsRCnnFamilyEvolutionAndPerformance;
