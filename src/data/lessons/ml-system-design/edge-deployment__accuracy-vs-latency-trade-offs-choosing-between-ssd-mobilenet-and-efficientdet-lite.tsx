import type { Component } from "solid-js";

const LessonEdgeDeploymentAccuracyVsLatencyTradeOffsChoosingBetweenSsdMobilenetAndEfficientdetLite: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Accuracy vs Latency Trade-offs: Choosing Between SSD MobileNet and
            EfficientDet Lite
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PARETO FRONTIER
            </p>
            <p style="margin-top: 0">
              Every edge model sits on an accuracy-latency trade-off curve.
              MobileNetV2 at 5ms achieves 72% ImageNet accuracy.
              EfficientNet-Lite4 at 30ms achieves 80%. There is no model that is
              simultaneously fastest and most accurate. Your job is to find the
              point on this curve that meets your application requirements.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DETECTION MODEL COMPARISON
            </p>
            <p style="margin-top: 0">
              <strong>SSD MobileNetV2:</strong> 15-25ms inference, 22% COCO mAP.
              Good for real-time when accuracy is less critical (presence
              detection, counting).
              <br />
              <strong>EfficientDet-Lite0:</strong> 30-40ms, 26% mAP. Better
              accuracy, still real-time capable.
              <br />
              <strong>EfficientDet-Lite2:</strong> 60-80ms, 32% mAP. Near-cloud
              accuracy but sacrifices real-time.
              <br />
              <strong>YOLOv5n:</strong> 20-30ms, 28% mAP. Good balance for many
              applications.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DECISION FRAMEWORK
            </p>
            <p style="margin-top: 0">
              Start with your latency budget, then find the best accuracy within
              it. For 30fps video, budget 33ms. Subtract preprocessing (3ms) and
              postprocessing (5ms). You have 25ms for inference.
              EfficientDet-Lite0 or SSD-MobileNet fits; EfficientDet-Lite2 does
              not.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Do not optimize for benchmark
              accuracy. Optimize for task accuracy within your latency budget. A
              model that is 5% more accurate but misses frames is worse than a
              faster model that processes every frame.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO SACRIFICE ACCURACY
            </p>
            <p style="margin-top: 0">
              Prefer lower accuracy when: (1) task tolerates errors (suggestions
              vs safety-critical). (2) downstream processing can correct
              mistakes. (3) real-time response is essential. Prefer higher
              accuracy when: (1) errors are costly. (2) batch processing is
              acceptable. (3) thermal headroom exists.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 15px">
                Model Selection Matrix: Raspberry Pi + TPU
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      SSD MobileNet V1
                    </strong>
                    <div style="font-size: 12px">
                      Latency: <strong>10 to 12ms</strong>
                    </div>
                    <div style="font-size: 12px">
                      Energy: <strong>0.10 mWh</strong>
                    </div>
                    <div style="font-size: 12px">
                      mAP: <strong>~19</strong>
                    </div>
                    <div style="font-size: 12px; margin-top: 4px">
                      ✓ Real time 30 fps
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      EfficientDet Lite2
                    </strong>
                    <div style="font-size: 12px">
                      Latency: <strong>139 to 188ms</strong>
                    </div>
                    <div style="font-size: 12px">Energy: Higher</div>
                    <div style="font-size: 12px">
                      mAP: <strong>~33</strong>
                    </div>
                    <div style="font-size: 12px; margin-top: 4px">
                      ✗ Only 5 to 7 fps
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Trade-off Decision</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Real time interactions need SSD MobileNet; high accuracy
                    offline tasks can use EfficientDet
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
                  Pareto frontier: no model is fastest AND most accurate; find
                  the point meeting your requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detection comparison: SSD-MobileNet (25ms, 22% mAP),
                  EfficientDet-Lite0 (35ms, 26%), YOLO5n (25ms, 28%)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: start with latency budget, subtract
                  pre/post processing, find best accuracy in remaining time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Task accuracy matters: 5% more accurate but missing frames is
                  worse than faster with every frame
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
                  Walk through the decision framework: 33ms budget - 3ms
                  preprocess - 5ms postprocess = 25ms for inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare detection models with latency and mAP numbers for
                  different use cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize task accuracy vs benchmark accuracy: processing
                  every frame may beat higher accuracy with drops
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentAccuracyVsLatencyTradeOffsChoosingBetweenSsdMobilenetAndEfficientdetLite;
