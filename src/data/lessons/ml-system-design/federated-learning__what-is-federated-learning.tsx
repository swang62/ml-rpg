import type { Component } from "solid-js";

const LessonFederatedLearningWhatIsFederatedLearning: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Federated Learning?
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
              <strong>Federated Learning</strong> is a machine learning approach
              where models are trained across multiple decentralized devices
              holding local data, without exchanging the raw data itself.
              Instead of collecting data centrally, the algorithm travels to the
              data.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Core Problem
          </p>
          <p style="margin-top: 0">
            Traditional ML requires centralizing all training data. For keyboard
            prediction, this means uploading every keystroke from millions of
            users. For healthcare models, hospitals must share patient records.
            Both face insurmountable barriers: users refuse to share typing
            patterns, and regulations prohibit transferring patient data. The
            data exists, but cannot be accessed conventionally.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            How It Works
          </p>
          <p style="margin-top: 0">
            Instead of bringing data to the model, federated learning brings the
            model to the data. A central server sends the current model to
            participating devices (clients). Each client trains locally for
            several iterations, producing updated weights. Clients send only
            weight updates back. The server aggregates updates from all clients
            into an improved model by averaging weights. This cycle repeats
            until convergence. A single round might involve 10,000 devices
            training locally for 5 epochs, with aggregation every 10-30 minutes.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Simple Alternatives Fail
          </p>
          <p style="margin-top: 0">
            Why not anonymize data and centralize it? Anonymization is fragile:
            87% of Americans can be uniquely identified from zip code, birth
            date, and gender. Even aggregate statistics leak information.
            Federated learning ensures raw data never leaves the device. The
            server sees only model updates, which are mathematically difficult
            to reverse-engineer into original training examples.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Federated learning enables training
            on data that physically cannot be centralized, such as real-time
            sensor readings from IoT devices or behavioral data locked inside
            applications.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Coordinator</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Distributes Global Model v1
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Client 1</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Local Training
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Client 2</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Local Training
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Client N</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Local Training
                  </div>
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↑</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Send Updates Only</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  0.1 to 2 MB per client
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Models travel to data instead of data traveling to models,
                enabling training on sensitive data without exposure
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Each round involves local training then sending only weight
                updates to a central server for aggregation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Anonymization fails because 87% of people can be re-identified
                from minimal demographic data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Enables training on data that cannot be physically moved, not
                just data that should not be moved
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Communication happens in rounds lasting 10-30 minutes with
                thousands of devices per round
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
                Explain the round-based pattern: distribute model, local
                training, send weight updates, aggregate, repeat
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention federated learning solves both regulatory constraints
                and physical impossibility of centralizing data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonFederatedLearningWhatIsFederatedLearning;
