import type { Component } from "solid-js";

const LessonImagePreprocessingDomainSpecificPreprocessingConstraints: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Domain Specific Preprocessing Constraints
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Medical Imaging Constraints
            </p>
            <p style="margin-top: 0">
              Medical images have strict preprocessing requirements. DICOM
              format contains metadata critical for interpretation. Window/level
              settings control how pixel values map to display. Wrong
              preprocessing leads to missed diagnoses.
            </p>
            <p>
              <strong>Key constraints:</strong> Preserve original pixel values
              for regulatory compliance. Document all transformations applied.
              Avoid lossy augmentations that could mask pathology. Maintain
              aspect ratios that clinicians expect.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Satellite and Aerial Imagery
            </p>
            <p style="margin-top: 0">
              Satellite images have 12-16 bits per channel versus 8 bits for
              consumer photos. Spectral bands beyond visible RGB provide crucial
              information. Standard preprocessing designed for 8-bit RGB
              destroys this data.
            </p>
            <p>
              <strong>Key constraints:</strong> Preserve full bit depth during
              preprocessing. Handle multiple spectral bands (not just RGB).
              Account for varying sun angles and atmospheric conditions across
              images. Geospatial metadata must survive preprocessing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Document and Text Images
            </p>
            <p style="margin-top: 0">
              Text recognition requires different preprocessing than object
              classification. Orientation matters - upside-down text must be
              detected and corrected before OCR. Horizontal flipping is
              forbidden because it creates invalid characters.
            </p>
            <p>
              <strong>Key constraints:</strong> Deskewing aligns rotated
              documents. Binarization separates text from background. Noise
              removal helps but aggressive filtering destroys thin strokes.
              Preserve aspect ratio - stretching distorts character shapes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Domain-Appropriate Preprocessing
            </p>
            <p style="margin-top: 0">
              Start with domain expert consultation. Ask what transformations
              are acceptable for the specific use case. Test preprocessing on
              edge cases before training. Monitor for cases where preprocessing
              destroys critical information.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Key Insight:</strong> Generic preprocessing pipelines
              optimized for consumer photos often destroy critical information
              in specialized domains. Always validate with domain experts.
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
                  Medical imaging requires preserved pixel values, documented
                  transformations, and regulatory compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Satellite imagery uses 12-16 bit depth and multiple spectral
                  bands - 8-bit RGB preprocessing destroys this data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Document/text images forbid horizontal flipping and require
                  orientation detection, deskewing, and careful binarization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Generic preprocessing pipelines optimized for consumer photos
                  often destroy critical domain-specific information
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
                  Interview Tip: Ask about the domain before proposing
                  preprocessing - satellite vs medical vs documents have
                  opposite requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention regulatory constraints for medical
                  imaging - transformations must be documented and reversible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImagePreprocessingDomainSpecificPreprocessingConstraints;
