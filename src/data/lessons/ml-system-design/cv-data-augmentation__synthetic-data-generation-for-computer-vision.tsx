import type { Component } from "solid-js";

const LessonCvDataAugmentationSyntheticDataGenerationForComputerVision: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Synthetic Data Generation for Computer Vision
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE SYNTHETIC DATA
            </p>
            <p style="margin-top: 0">
              Synthetic data is particularly valuable for: (1) Rare scenarios
              that are hard to capture naturally (emergency vehicles, unusual
              weather). (2) Safety critical applications where failure cases
              must be tested. (3) Domains where real data is expensive or
              requires privacy protection (medical imaging, autonomous driving).
              (4) Generating ground truth labels automatically (exact bounding
              boxes, depth maps).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GENERATION APPROACHES
            </p>
            <p style="margin-top: 0">
              <strong>Game engine simulation:</strong> Render 3D scenes with
              physics engines. Throughput: 100,000+ high-resolution images per
              hour on 8 GPUs. Includes free labels (depth, segmentation,
              bounding boxes).
              <br />
              <strong>Generative models:</strong> GANs or diffusion models
              synthesize realistic images. Higher quality but slower and harder
              to control.
              <br />
              <strong>Domain randomization:</strong> Vary textures, lighting,
              and object positions aggressively. The real world becomes "just
              another variation" the model must handle.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE DOMAIN GAP PROBLEM
            </p>
            <p style="margin-top: 0">
              Synthetic images differ from real images in subtle ways: perfect
              lighting, missing sensor noise, unrealistic textures. Models
              trained heavily on synthetic data can lose 2-10 percentage points
              accuracy on real validation. Mitigations: include sensor-accurate
              noise models (rolling shutter, motion blur, lens distortion), mix
              synthetic and real data (70-30 split), and anneal synthetic ratio
              during training.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Synthetic data provides perfect
              labels and unlimited rare scenarios, but domain gap requires
              careful mitigation or you hurt real-world performance.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MIXING STRATEGY
            </p>
            <p style="margin-top: 0">
              Start with 30% synthetic data early in training when the model
              needs diverse patterns. Anneal to 10% late in training to
              fine-tune on real data distribution. Monitor validation accuracy
              on real data throughout.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Simulation Engine</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Domain randomization: Lighting, materials, occlusions,
                    sensor noise
                  </div>
                  <div style="font-size: 12px">
                    Render: 100K images/hour on 8 GPUs
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Data Lake</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Synthetic: 30M images with labels and metadata
                  </div>
                  <div style="font-size: 12px">
                    Real: 70M images from deployment
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Training Sampler</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Mixing ratio: 70% real + 30% synthetic early
                  </div>
                  <div style="font-size: 12px">
                    Anneal to 90% real + 10% synthetic late
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Rare class recall: +5 to 20% relative
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
                  Synthetic data is valuable for rare scenarios, safety testing,
                  and automatic ground truth labeling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rendering throughput: 100,000+ images per hour on 8 GPUs with
                  free labels (depth, segmentation, boxes)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain gap: models trained heavily on synthetic data lose 2-10
                  percentage points on real validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixing strategy: start with 30% synthetic, anneal to 10% late
                  in training; include sensor-accurate noise models
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
                  Explain when synthetic data helps: rare scenarios, safety
                  testing, automatic labels, privacy protection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe domain gap mitigation: sensor noise modeling, domain
                  randomization, mixed training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the annealing strategy: more synthetic early for
                  diversity, less late for real distribution tuning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationSyntheticDataGenerationForComputerVision;
