import type { Component } from "solid-js";

const LessonServingInfrastructureChoosingBetweenTensorflowServingTorchserveAndTritonForProductionDeployment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Between TensorFlow Serving, TorchServe, and Triton for
            Production Deployment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TensorFlow Serving
            </p>
            <p style="margin-top: 0">
              The right choice for TensorFlow centric organizations that value
              simplicity and native integration. It provides SavedModel
              signatures for input/output contracts, built in A/B testing
              through model version traffic splitting, and straightforward
              configuration. The tradeoff is lock in: switching to PyTorch
              models later requires running parallel infrastructure.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TorchServe
            </p>
            <p style="margin-top: 0">
              Fills the same role for PyTorch, offering custom handlers for
              preprocessing, simple packaging through model archives (.mar
              files), and CPU or GPU deployment with minimal configuration
              overhead. Best for PyTorch shops that want fast time to
              production.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Triton
            </p>
            <p style="margin-top: 0">
              Triton becomes compelling when you need multi framework support,
              hardware portability, or advanced scheduling features.
              Organizations running both TensorFlow legacy systems and PyTorch
              research models benefit from unified control: one serving plane,
              one metrics system, one rollout process. The hardware portability
              is particularly valuable for cost optimization: deploy the same
              model to NVIDIA GPUs with TensorRT backend for high QPS services
              and Intel Xeon CPUs with OpenVINO BF16 backend for moderate QPS
              services, using identical deployment configurations.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Decision Matrix
            </p>
            <p style="margin-top: 0">
              Choose framework specific servers when you have under 10 models in
              a single framework, need fast time to production (days not weeks),
              and do not anticipate framework or hardware diversity. Choose
              Triton when you have 10 plus models across multiple frameworks,
              need model ensembles that chain multiple models, require hardware
              flexibility for cost optimization, or need advanced features like
              dynamic batching with per model tuning and concurrent execution
              with instance groups.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Learning Curve Reality
            </p>
            <p style="margin-top: 0">
              Teams report 2 to 4 week learning curves for Triton versus days
              for framework specific servers, but the investment pays off at
              scale when managing dozens of models across heterogeneous
              hardware. Custom thin servers only make sense for extreme scale
              (100 plus models with custom scheduling logic) or highly
              specialized requirements.
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
                  TensorFlow Serving best for homogeneous TensorFlow
                  environments: SavedModel signatures, native A/B testing,
                  straightforward config, used across Google Search and Ads for
                  thousands of models with minimal operational overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TorchServe fills same role for PyTorch: custom handlers, model
                  archive packaging, simple CPU or GPU deployment, ideal for
                  PyTorch centric teams wanting fast production deployment in
                  days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Triton justifies 2 to 4 week learning curve when managing 10
                  plus models across multiple frameworks, needing hardware
                  portability (GPU plus CPU backends with same configs), or
                  requiring model ensembles and advanced batching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware portability value: deploy same model to NVIDIA GPU
                  with TensorRT for high QPS services (1,000 plus requests per
                  second) and Intel Xeon CPU with OpenVINO BF16 for moderate QPS
                  (under 500 requests per second), cutting costs 40% to 60% on
                  lower volume tiers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model ensembles in Triton enable chaining preprocessing in
                  Open Neural Network Exchange (ONNX) backend followed by
                  inference in TensorRT backend in single request, keeping
                  intermediate results in GPU memory and reducing latency versus
                  separate service calls
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Custom thin servers only justified at extreme scale (100 plus
                  models) or highly specialized requirements not supported by
                  existing infrastructure, requires building scheduling,
                  observability, and rollout safety from scratch
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
                  Google Search ranking uses TensorFlow Serving for over 500
                  TensorFlow models with traffic splitting A/B tests, accepting
                  framework lock in for operational simplicity and tight
                  TensorFlow integration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta transitioned from separate TensorFlow Serving and
                  TorchServe stacks to unified Triton deployment serving 300
                  plus models across both frameworks, reducing operational
                  overhead and enabling cross framework ensembles for newsfeed
                  ranking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial fraud detection service runs high risk transactions
                  (20% of volume at 5,000 QPS) on AWS P4 instances with Triton
                  TensorRT backend and low risk transactions (80% at 500 QPS) on
                  Intel Xeon with OpenVINO backend, same deployment configs,
                  reducing monthly GPU spend from $100,000 to $40,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructureChoosingBetweenTensorflowServingTorchserveAndTritonForProductionDeployment;
